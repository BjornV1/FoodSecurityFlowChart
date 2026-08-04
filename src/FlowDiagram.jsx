// FlowDiagram.jsx

import React, { useState, useMemo } from 'react'
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
  FormulaTextNode   // ⬅️ ny
} from './nodeTypes.jsx'

// Static objects - må defineres utenfor komponenten (eller memoiseres) for at
// React Flow ikke skal klage på nye objekt-referanser ved hver render.
const nodeTypesStatic = {
  decision: DecisionNode,
  process: ProcessNode,
  validation: ValidationNode,
  flag: FlagNode,
  formula: FormulaNode,
  formulaText: FormulaTextNode   // ⬅️ ny
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

const fitViewOptions = {
  padding: 0.2
}

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
    question: 'Is FAFH collected in an independent module?',
    options: [['yes', 'Yes'], ['no', 'No']]
  },
  {
    key: 'filter4',
    question: 'How are the monetary values reported?',
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

  const setAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  // ⭐ Filtrering
  const visibleNodes = filterNodes(importedNodes, answers)
  const visibleEdges = filterEdges(importedEdges, visibleNodes)

  const defaultViewport = { x: 50, y: 50, zoom: 0.5 } 

  // Memoize nodes/edges
  const memoNodes = useMemo(() => visibleNodes, [visibleNodes])
  const memoEdges = useMemo(() => visibleEdges, [visibleEdges])

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5F5F5' }}>

      {/* SIDEBAR */}
      <div style={{ width: 320, padding: 16, backgroundColor: '#FFFFFF', borderRight: '1px solid #DDD' }}>
        <h3 style={{ color: '#222' }}>Filters</h3>

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
      </div>

      {/* FLOW AREA */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={memoNodes}
          edges={memoEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          defaultViewport={defaultViewport}
          minZoom={0.05}
          maxZoom={2}
//          fitView
//          fitViewOptions={fitViewOptions}
          style={{ width: '100%', height: '100%', backgroundColor: '#FAFAFA' }}
        >
          <Background color="#DDD" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}