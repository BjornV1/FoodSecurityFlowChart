// filterLogic.js

export function filterNodes(nodes, answers) {
  return nodes.filter(node => {
    // Hvis noden ikke har dependsOn → alltid synlig
    if (!node.dependsOn) return true

    // dependsOn kan være et objekt med flere filterkrav
    const conditions = Object.entries(node.dependsOn)

    return conditions.every(([filterKey, requiredValue]) => {
      const userAnswer = answers[filterKey]

      // ⭐ Null betyr "ingen filtrering" → behold noden
      if (userAnswer === null || userAnswer === undefined) {
        return true
      }

      // Hvis brukerens svar matcher kravet → behold noden
      return userAnswer === requiredValue
    })
  })
}

export function filterEdges(edges, visibleNodes) {
  const visibleIds = new Set(visibleNodes.map(n => n.id))

  return edges.filter(edge =>
    visibleIds.has(edge.source) && visibleIds.has(edge.target)
  )
}
