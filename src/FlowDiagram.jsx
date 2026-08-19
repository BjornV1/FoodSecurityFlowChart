// FlowDiagram.jsx

import React, { useState, useMemo, useEffect } from 'react'
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow'
import 'reactflow/dist/style.css'

import { allNodes, allEdges } from './diagramData.js'
import { filterNodes, filterEdges } from './filterLogic'

import {
  DecisionNode,
  ProcessNode,
  ValidationNode,
  FlagNode,
  FormulaNode,
  FormulaTextNode
} from './nodeTypes.jsx'

// Static objects - må defineres utenfor komponenten (eller memoiseres) for at
// React Flow ikke skal klage på nye objekt-referanser ved hver render.
const nodeTypesStatic = {
  decision: DecisionNode,
  process: ProcessNode,
  validation: ValidationNode,
  flag: FlagNode,
  formula: FormulaNode,
  formulaText: FormulaTextNode
}

// 'straight' og 'step' er innebygde edge-typer i React Flow - ingen egne
// edge-komponenter trengs for dette diagrammet.
const edgeTypesStatic = {}

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
    question: 'Does the survey collects information on visitors?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter4',
    question: 'How are the monetary values for purchases reported?',
    options: [['last', 'For last purchase'], ['all', 'For all purchases']]
  },
  {
    key: 'filter5',
    question: 'Are the monetary values for non-purchased food items reported?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter6',
    question: 'Are all food items measured in standard units (kilo, liter)?',
    options: [['yes', 'Yes'], ['no', 'No']]
  }
]

const initialAnswers = Object.fromEntries(FILTERS.map(f => [f.key, null]))

const SIDEBAR_STORAGE_KEY = 'flowdiagram_sidebar_open'

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
  // ⭐ Bruk manuelle noder/edges fra diagramData.js
  const [importedNodes] = useState(allNodes)
  const [importedEdges] = useState(allEdges)

  // Memoized static objects
  const nodeTypes = useMemo(() => nodeTypesStatic, [])
  const edgeTypes = useMemo(() => edgeTypesStatic, [])

  // ⭐ Filter-state
  const [answers, setAnswers] = useState(initialAnswers)

  // ⭐ Sidebar-state, husket i localStorage mellom besøk
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen))
  }, [sidebarOpen])

  // ⭐ Esc-snarvei for å lukke sidebaren
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
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
  const visibleEdges = filterEdges(importedEdges, visibleNodes)

  // Memoize nodes/edges
  const memoNodes = useMemo(() => visibleNodes, [visibleNodes])
  const memoEdges = useMemo(() => visibleEdges, [visibleEdges])

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F5F5', position: 'relative' }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: sidebarOpen ? 320 : 0,
          minWidth: sidebarOpen ? 320 : 0,
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
                title="Lukk filterpanel (Esc)"
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
          </>
        )}
      </div>

      {/* Åpne-knapp, vises kun når sidebar er lukket */}
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
          title="Åpne filterpanel"
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
    </div>
  )
}