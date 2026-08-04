// FormulaNode.jsx

import React from 'react'
import { Handle, Position } from 'reactflow'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function FormulaNode({ data }) {
  // Render LaTeX → HTML
  const html = katex.renderToString(data.latex || '', {
    throwOnError: false,
    displayMode: true
  })

  return (
    <div
      style={{
        backgroundColor: '#FDF2E9',
        border: '2px solid #E67E22',
        borderRadius: 6,
        padding: 10,
        width: data.width || 220,
        minHeight: data.height || 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{ textAlign: 'center' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Optional handles */}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}
