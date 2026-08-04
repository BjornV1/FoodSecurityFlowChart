import React from 'react'

const baseEdgeStyle = {
  strokeWidth: 2,
  stroke: '#222'
}

export default function CustomStraightEdge({
  sourceX,
  sourceY,
  targetX,
  targetY
}) {
  const path = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <polygon points="0 0, 12 6, 0 12" fill="#222" />
        </marker>
      </defs>

      <path
        d={path}
        style={baseEdgeStyle}
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </g>
  )
}
