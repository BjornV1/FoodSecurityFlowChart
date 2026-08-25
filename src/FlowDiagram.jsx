// FlowDiagram.jsx

import React, { useState, useMemo, useEffect } from 'react'
import ReactFlow, {
  Controls,
  Background,
  MarkerType,
  getNodesBounds,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { toSvg } from 'html-to-image'
import jsPDF from 'jspdf'

import { allNodes, allEdges } from './diagramData.js'
import { filterNodes, filterEdges } from './filterLogic'

import {
  DecisionNode,
  ProcessNode,
  ValidationNode,
  FlagNode,
  FormulaNode,
  FormulaTextNode,
  ChosenNode
} from './nodeTypes.jsx'

// Static objects - må defineres utenfor komponenten (eller memoiseres) for at
// React Flow ikke skal klage på nye objekt-referanser ved hver render.
const nodeTypesStatic = {
  decision: DecisionNode,
  process: ProcessNode,
  validation: ValidationNode,
  flag: FlagNode,
  formula: FormulaNode,
  formulaText: FormulaTextNode,
  chosen: ChosenNode
}

// 'straight' og 'step' er innebygde edge-typer i React Flow - ingen egne
// edge-komponenter trengs for dette diagrammet.
const edgeTypesStatic = {}

// ⭐ Bredde på venstre filter-sidebar og høyre legend-panel - endre kun her
const SIDEBAR_WIDTH = 520
const LEGEND_WIDTH = 280

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
  }
}

const defaultViewport = { x: 50, y: 50, zoom: 0.5 }

// ⭐ Filter-konfigurasjon: legg til/fjern/endre filtre kun her, i stedet for å
// duplisere markup for hvert filter i JSX-en under.
const FILTERS = [
  {
    key: 'filter1',
    question: 'Is a variable on "Total quantity consumed" collected?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter2',
    question: 'Is the data collected as a recall or a diary?',
    options: [['recall', 'Recall'], ['diary', 'Diary']]
  },
  {
    key: 'filter3',
    question: 'Are FAFH collected in an independent module?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter7',
    question: 'Does the survey collect information on visitors?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter4',
    question: 'Are the monetary values only collected for the last purchase?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter5',
    question: 'Are the monetary values for non-purchased food items collected and are they considered reliable?',
    options: [['yes_reliable', 'Collected and considered reliable'], ['yes_not_reliable', 'Collected, but not considered reliable'], ['no', 'Not collected']]
  },
  {
    key: 'filter6',
    question: 'Are all food items measured in standard units (kilo, liter)?',
    options: [['yes', 'Yes'], ['no', 'No']]
  }
]

const initialAnswers = Object.fromEntries(FILTERS.map(f => [f.key, null]))

// ⭐ Tegnforklaring - farger hentet fra nodeTypes.jsx
const LEGEND_ITEMS = [
  { color: '#D6EAF8', border: '#3498DB', label: 'Decision', description: 'A yes/no or multiple-choice question' },
  { color: '#D5F5E3', border: '#27AE60', label: 'Process', description: 'An action or calculation step' },
  { color: '#FCF3CF', border: '#F1C40F', label: 'Start/end', description: 'Marks the start or the end of a step' },
  { color: '#f8c5f4', border: '#ec0dc7', label: 'Flag', description: 'Flagged for review' },
  { color: '#f0ede9', border: '#8d6c10', label: 'Chosen', description: 'Decision affected by filter question' },
]

const SIDEBAR_STORAGE_KEY = 'flowdiagram_sidebar_open'
const LEGEND_STORAGE_KEY = 'flowdiagram_legend_open'

// ⭐ Standard plakatstørrelser i mm, [kortside, langside].
// Selve orienteringen (liggende/stående) avgjøres automatisk ut fra
// diagrammets faktiske form ved eksportøyeblikket.
const POSTER_SIZES = {
  A4: [210, 297],
  A3: [297, 420],
  A2: [420, 594],
  A1: [594, 841],
  A0: [841, 1189],
}

// ⭐ Gjenbrukbar knapp-stil, avhenger av om knappen er "aktiv" (valgt) eller ikke
function getButtonStyle(isActive, variant = 'option') {
  const activeColors = {
    option: { bg: '#3498DB', border: '#2874A6' },
    reset: { bg: '#95A5A6', border: '#7F8C8D' },
  }
  const { bg, border } = activeColors[variant]

  return {
    backgroundColor: isActive ? bg : '#FFFFFF',
    color: isActive ? '#FFFFFF' : '#222',
    border: isActive ? `2px solid ${border}` : '1px solid #CCC',
    borderRadius: 4,
    padding: '6px 12px',
    marginRight: 6,
    marginBottom: 6,
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    fontSize: 13,
  }
}

export default function FlowDiagram() {
  // ⭐ Gir tilgang til React Flow sin faktiske viewport-styring (setViewport m.m.)
  const reactFlowInstance = useReactFlow()

  // ⭐ Bruk manuelle noder/edges fra diagramData.js
  const [importedNodes] = useState(allNodes)
  const [importedEdges] = useState(allEdges)

  // Memoized static objects
  const nodeTypes = useMemo(() => nodeTypesStatic, [])
  const edgeTypes = useMemo(() => edgeTypesStatic, [])

  // ⭐ Filter-state
  const [answers, setAnswers] = useState(initialAnswers)

  // ⭐ Venstre sidebar (filtre), husket i localStorage mellom besøk
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  })

  // ⭐ Høyre panel (tegnforklaring), husket i localStorage mellom besøk
  const [legendOpen, setLegendOpen] = useState(() => {
    const stored = localStorage.getItem(LEGEND_STORAGE_KEY)
    return stored === null ? false : stored === 'true'
  })

  // ⭐ Eksport-status og valgt plakatstørrelse
  const [isExporting, setIsExporting] = useState(false)
  const [posterSize, setPosterSize] = useState('A1')

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen))
  }, [sidebarOpen])

  useEffect(() => {
    localStorage.setItem(LEGEND_STORAGE_KEY, String(legendOpen))
  }, [legendOpen])

  // ⭐ Esc-snarvei for å lukke begge paneler
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
        setLegendOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  // ⭐ Filtrering
  const visibleNodes = filterNodes(importedNodes, answers)
  const visibleEdges = filterEdges(importedEdges, visibleNodes, answers)

  // Memoize nodes/edges
  const memoNodes = useMemo(() => visibleNodes, [visibleNodes])
  const memoEdges = useMemo(() => visibleEdges, [visibleEdges])

  // ⭐ Eksporterer det synlige (filtrerte) diagrammet til en nedlastbar PDF.
  // Bruker React Flow sin ekte setViewport (samme mekanisme som når brukeren
  // selv zoomer/panorerer) for å garantere skarp, korrekt rendering, og
  // tvinger hvit bakgrunn på edge-labels (Yes/No) for å unngå svarte bokser.
async function handleExportToPdf() {
  if (memoNodes.length === 0) return
  setIsExporting(true)

  try {
    const nodesBounds = getNodesBounds(memoNodes)
    const padding = 0.08

    const targetWidth = 3000
    const targetHeight = Math.round(
      targetWidth * ((nodesBounds.height + 100) / (nodesBounds.width + 100))
    )

    const zoomX = targetWidth / (nodesBounds.width + 100)
    const zoomY = targetHeight / (nodesBounds.height + 100)
    const zoom = Math.min(zoomX, zoomY) * (1 - padding)

    const x = -nodesBounds.x * zoom + (targetWidth - nodesBounds.width * zoom) / 2
    const y = -nodesBounds.y * zoom + (targetHeight - nodesBounds.height * zoom) / 2

    reactFlowInstance.setViewport({ x, y, zoom }, { duration: 0 })

    // Vent til React Flow faktisk har re-rendret med ny viewport
    await new Promise(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    )

    // ⭐ Fiks svarte edge-label-bokser (Yes/No) - må skje ETTER setViewport,
    // siden React Flow bytter ut DOM-elementene ved viewport-endring
    document.querySelectorAll('.react-flow__edge-textbg').forEach(el => {
      el.style.fill = '#FFFFFF'
    })

    const viewportEl = document.querySelector('.react-flow__viewport')
    if (!viewportEl) {
      throw new Error('Fant ikke .react-flow__viewport i DOM-en')
    }

    // ⭐ Hent SVG i stedet for PNG direkte - unngår html-to-image sin kjente
    // bug der SVG-markers (pilspisser) rasteriseres som solide, svarte bokser
    const svgDataUrl = await toSvg(viewportEl, {
      backgroundColor: '#FAFAFA',
      width: targetWidth,
      height: targetHeight,
      cacheBust: true,
      style: {
        width: `${targetWidth}px`,
        height: `${targetHeight}px`,
      },
    })

    // ⭐ La nettleseren selv tegne SVG-en inn i et canvas (korrekt marker-støtte),
    // og hent PNG-data derfra
    const img = new Image()
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = svgDataUrl
    })

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FAFAFA'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    const dataUrl = canvas.toDataURL('image/png')

    const imageWidth = targetWidth
    const imageHeight = targetHeight
    const imageAspect = imageWidth / imageHeight
    const isImageLandscape = imageAspect >= 1

    const [shortSideMm, longSideMm] = POSTER_SIZES[posterSize]
    const pageWidthMm = isImageLandscape ? longSideMm : shortSideMm
    const pageHeightMm = isImageLandscape ? shortSideMm : longSideMm

    const marginMm = 10
    const maxContentWidthMm = pageWidthMm - marginMm * 2
    const maxContentHeightMm = pageHeightMm - marginMm * 2
    const pageAspect = maxContentWidthMm / maxContentHeightMm

    let drawWidthMm, drawHeightMm
    if (imageAspect > pageAspect) {
      drawWidthMm = maxContentWidthMm
      drawHeightMm = drawWidthMm / imageAspect
    } else {
      drawHeightMm = maxContentHeightMm
      drawWidthMm = drawHeightMm * imageAspect
    }

    const offsetXMm = (pageWidthMm - drawWidthMm) / 2
    const offsetYMm = (pageHeightMm - drawHeightMm) / 2

    const pdf = new jsPDF({
      orientation: isImageLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pageWidthMm, pageHeightMm],
    })
    pdf.addImage(dataUrl, 'PNG', offsetXMm, offsetYMm, drawWidthMm, drawHeightMm)
    pdf.save(`flowchart_${posterSize}.pdf`)

    reactFlowInstance.fitView({ padding: 0.2, duration: 0 })
  } catch (err) {
    console.error('PDF-eksport feilet:', err)
    alert('Eksport til PDF feilet. Sjekk konsollen for detaljer.')
  } finally {
    document.querySelectorAll('.react-flow__edge-textbg').forEach(el => {
      el.style.fill = ''
    })
    setIsExporting(false)
  }
}
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F5F5', position: 'relative' }}>

      {/* FILTER SIDEBAR (venstre) */}
      <div
        style={{
          width: sidebarOpen ? SIDEBAR_WIDTH : 0,
          minWidth: sidebarOpen ? SIDEBAR_WIDTH : 0,
          padding: sidebarOpen ? 16 : 0,
          backgroundColor: '#FFFFFF',
          borderRight: sidebarOpen ? '1px solid #DDD' : 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          boxSizing: 'border-box',
          transition: 'width 0.2s ease, padding 0.2s ease',
        }}
      >
        {sidebarOpen && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#222', margin: 0 }}>Filters</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#666',
                }}
                title="Close filterpanel (Esc)"
              >
                ✕
              </button>
            </div>


            {FILTERS.map(({ key, question, options }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <p>{question}</p>
                {options.map(([value, label]) => {
                  const isActive = answers[key] === value
                  return (
                    <button
                      key={value}
                      onClick={() => setAnswer(key, value)}
                      style={getButtonStyle(isActive, 'option')}
                    >
                      {label}
                    </button>
                  )
                })}
                <button
                  onClick={() => setAnswer(key, null)}
                  style={getButtonStyle(answers[key] === null, 'reset')}
                >
                  Reset
                </button>
              </div>
            ))}

            {/* ⭐ Velg plakatstørrelse og eksporter til PDF */}
            <div style={{ marginTop: 16, marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#222' }}>
                Size of exported flow diagram
              </label>
              <select
                value={posterSize}
                onChange={(e) => setPosterSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  marginBottom: 8,
                  borderRadius: 4,
                  border: '1px solid #CCC',
                  fontSize: 13,
                }}
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A2">A2</option>
                <option value="A1">A1</option>
                <option value="A0">A0</option>
              </select>

              <button
                onClick={handleExportToPdf}
                disabled={isExporting}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: isExporting ? '#A9DFBF' : '#27AE60',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 4,
                  cursor: isExporting ? 'default' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                {isExporting ? 'Exporting...' : `⬇ Export to ${posterSize}`}
              </button>
            </div>
           
          </>
        )}
      </div>

      {/* Åpne-knapp for filter-sidebar, vises kun når panelet er lukket */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            padding: '8px 12px',
            backgroundColor: '#3498DB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          title="Open filterpanel"
        >
          ☰ Filters
        </button>
      )}

      {/* FLOW AREA */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={memoNodes}
          edges={memoEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          defaultViewport={defaultViewport}
          minZoom={0.05}
          maxZoom={2}
          style={{ width: '100%', height: '100%', backgroundColor: '#FAFAFA' }}
        >
          <Background color="#DDD" gap={16} />
          <Controls />
        </ReactFlow>
      </div>

      {/* LEGEND PANEL (høyre) */}
      <div
        style={{
          width: legendOpen ? LEGEND_WIDTH : 0,
          minWidth: legendOpen ? LEGEND_WIDTH : 0,
          padding: legendOpen ? 16 : 0,
          backgroundColor: '#FFFFFF',
          borderLeft: legendOpen ? '1px solid #DDD' : 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          boxSizing: 'border-box',
          transition: 'width 0.2s ease, padding 0.2s ease',
        }}
      >
        {legendOpen && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#222', margin: 0 }}>Legend</h3>
              <button
                onClick={() => setLegendOpen(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#666',
                }}
                title="Close legend (Esc)"
              >
                ✕
              </button>
            </div>

            {LEGEND_ITEMS.map(({ color, border, label, description }) => (
              <div key={label} style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 32,
                    height: 24,
                    flexShrink: 0,
                    backgroundColor: color,
                    border: `2px solid ${border}`,
                    borderRadius: 4,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 13, color: '#222' }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{description}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Åpne-knapp for legend, vises kun når panelet er lukket */}
      {!legendOpen && (
        <button
          onClick={() => setLegendOpen(true)}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            padding: '8px 12px',
            backgroundColor: '#27AE60',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          title="Open legend"
        >
          ℹ️ Legend
        </button>
      )}
    </div>
  )
}