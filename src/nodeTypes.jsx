// nodeTypes.jsx

import React from 'react'
import { Handle, Position } from 'reactflow'

import katex from "katex"
import "katex/dist/katex.min.css"

const baseStyle = {
  borderRadius: 6,
  padding: 10,
  border: '2px solid',
  fontSize: 14,
  fontFamily: 'Arial, sans-serif',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  textAlign: 'center',
  color: '#000000',
}

// Alle handle-posisjoner en boks trenger: midt på hver side (synlig, kan brukes til
// vanlig kobling) + 25 %/75 % langs hver side (usynlige, brukes av edges som f.eks.
// "in-top-75" i diagramData.js for å styre nøyaktig hvor pilen treffer boksen).
const HANDLE_POSITIONS = [
  { id: 'top', side: 'top', offset: '50%' },
  { id: 'top-25', side: 'top', offset: '25%' },
  { id: 'top-75', side: 'top', offset: '75%' },
  { id: 'right', side: 'right', offset: '50%' },
  { id: 'right-25', side: 'right', offset: '25%' },
  { id: 'right-75', side: 'right', offset: '75%' },
  { id: 'bottom', side: 'bottom', offset: '50%' },
  { id: 'bottom-25', side: 'bottom', offset: '25%' },
  { id: 'bottom-75', side: 'bottom', offset: '75%' },
  { id: 'left', side: 'left', offset: '50%' },
  { id: 'left-25', side: 'left', offset: '25%' },
  { id: 'left-75', side: 'left', offset: '75%' },
]

const SIDE_TO_POSITION = {
  top: Position.Top,
  right: Position.Right,
  bottom: Position.Bottom,
  left: Position.Left,
}

// Bygger inline-style for en handle. Midt-handlene (50 %) beholder React Flows
// standard utseende. 25/75-handlene er usynlige "ekstra" tilkoblingspunkter.
function extraHandleStyle(side, offset) {
  const vertical = side === 'top' || side === 'bottom'
  return {
    position: 'absolute',
    [side]: -6,
    [vertical ? 'left' : 'top']: offset,
    transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)',
    width: 8,
    height: 8,
    background: '#333',
    opacity: 0,
  }
}

// Genererer alle source- og target-handles (in-/out-) rundt en boks.
// Erstatter de ~500 linjene med håndskrevne <Handle> i det opprinnelige utkastet.
function AllHandles() {
  return HANDLE_POSITIONS.map(({ id, side, offset }) => {
    const isMain = offset === '50%'
    const style = isMain ? undefined : extraHandleStyle(side, offset)
    const position = isMain ? SIDE_TO_POSITION[side] : null
    return (
      <React.Fragment key={id}>
        <Handle type="source" id={`out-${id}`} position={position} style={style} />
        <Handle type="target" id={`in-${id}`} position={position} style={style} />
      </React.Fragment>
    )
  })
}

// Én generisk firkantet boks - farge/kantfarge styres av props.
// Alle tre node-typene (process, decision, validation) er bare denne med ulik farge.
function BoxNode({ data, background, border }) {
  return (
    <div
      style={{
        ...baseStyle,
        backgroundColor: background,
        borderColor: border,
        width: data.width || 180,
        height: data.height || 80,
      }}
    >
      {data.label}
      <AllHandles />
    </div>
  )
}

export function ProcessNode({ data }) {
  return <BoxNode data={data} background="#D5F5E3" border="#27AE60" />
}

export function DecisionNode({ data }) {
  return <BoxNode data={data} background="#D6EAF8" border="#3498DB" />
}

export function ValidationNode({ data }) {
  return <BoxNode data={data} background="#FCF3CF" border="#F1C40F" />
}

export function FlagNode({ data }) {
  return <BoxNode data={data} background="#f8c5f4" border="#ec0dc7" />
}

export function ChosenNode({ data }) {
  return <BoxNode data={data} background="#f0ede9" border="#8d6c10" />
}


// ⭐ FormulaNode (LaTeX) - beholdt uendret, brukes ikke av de tre boks-typene
export function FormulaNode({ data }) {
  const html = katex.renderToString(data.latex || '', {
    throwOnError: false,
    displayMode: true,
  })

  return (
    <div
      style={{
        backgroundColor: '#D5F5E3',
        border: '2px solid #27AE60',
        borderRadius: 6,
        padding: 10,
        width: data.width || 220,
        minHeight: data.height || 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}

export function FormulaTextNode({ data }) {
  const html = katex.renderToString(data.latex || '', {
    throwOnError: false,
    displayMode: true,
  })

  return (
    <div
      style={{
        backgroundColor: '#D5F5E3',
        border: '2px solid #27AE60',
        borderRadius: 6,
        padding: '16px 20px',
        width: data.width || 380,
        minHeight: data.height || 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 14,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {data.description && (
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>
          {data.description}
        </div>
      )}

      <div
        style={{ fontSize: 15, textAlign: 'center'/*, color: '#FFFFFF' */}}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {data.note && (
        <div style={{ fontSize: 12, fontStyle: 'italic', lineHeight: 1.4 }}>
          {data.note}
        </div>
      )}

      <Handle type="source" id="out-left" position={Position.Left} />
      <Handle type="target" id="in-left" position={Position.Left} />
      <Handle type="source" id="out-right" position={Position.Right} />
      <Handle type="target" id="in-right" position={Position.Right} />
      <Handle type="source" id="out-top" position={Position.Top} />
      <Handle type="target" id="in-top" position={Position.Top} />
      <Handle type="source" id="out-bottom" position={Position.Bottom} />
      <Handle type="target" id="in-bottom" position={Position.Bottom} />
    </div>
  )
}
