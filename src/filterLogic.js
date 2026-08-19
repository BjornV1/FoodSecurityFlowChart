// filterLogic.js

// ⭐ Spesiell markør: brukes i dependsOn for å si "vis kun når filteret er ubesvart"
export const UNSET = '__unset__'

function matchesCondition(filterKey, requiredValue, answers) {
  const userAnswer = answers[filterKey]

  // ⭐ Spesialtilfelle: krever eksplisitt at spørsmålet IKKE er besvart
  if (requiredValue === UNSET) {
    return userAnswer === null || userAnswer === undefined
  }

  return userAnswer === requiredValue
}

function matchesDependsOn(dependsOn, answers) {
  return Object.entries(dependsOn).every(([filterKey, requiredValue]) =>
    matchesCondition(filterKey, requiredValue, answers)
  )
}

function matchesDependsOnLoose(dependsOn, answers) {
  return Object.entries(dependsOn).every(([filterKey, requiredValue]) => {
    // ⭐ Spesialtilfelle gjelder uansett strict/loose
    if (requiredValue === UNSET) {
      const userAnswer = answers[filterKey]
      return userAnswer === null || userAnswer === undefined
    }

    const userAnswer = answers[filterKey]

    if (userAnswer === null || userAnswer === undefined) {
      return true
    }

    return userAnswer === requiredValue
  })
}

export function filterNodes(nodes, answers) {
  return nodes.filter(node => {
    if (!node.dependsOn) return true

    return node.strict
      ? matchesDependsOn(node.dependsOn, answers)
      : matchesDependsOnLoose(node.dependsOn, answers)
  })
}

export function filterEdges(edges, visibleNodes, answers) {
  const visibleIds = new Set(visibleNodes.map(n => n.id))

  return edges.filter(edge => {
    if (!visibleIds.has(edge.source) || !visibleIds.has(edge.target)) {
      return false
    }

    if (!edge.dependsOn) return true

    return edge.strict
      ? matchesDependsOn(edge.dependsOn, answers)
      : matchesDependsOnLoose(edge.dependsOn, answers)
  })
}