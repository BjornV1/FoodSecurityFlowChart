// importPptxToReactFlow.js

const EMU_PER_PIXEL = 9525
const SCALE = 0.5

// spacing legges på ETTER import
const SPACING_X = 80
const SPACING_Y = 60

export function importPptxToReactFlow(slideJson) {
  const shapes = slideJson["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || []
  const connectors = slideJson["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:cxnSp"] || []

  const rawNodes = []
  const edges = []

  // -----------------------------
  // 1. IMPORTER PPTX-SHAPES → RAW NODES
  // -----------------------------
  shapes.forEach(sp => {
    const id = sp["p:nvSpPr"]?.[0]?.["p:cNvPr"]?.[0]?.["$"]?.id
    if (!id) return

    const off = sp["p:spPr"]?.[0]?.["a:xfrm"]?.[0]?.["a:off"]?.[0]?.["$"]
    const ext = sp["p:spPr"]?.[0]?.["a:xfrm"]?.[0]?.["a:ext"]?.[0]?.["$"]
    if (!off || !ext) return

    // PPTX → px → scale
    const x = (parseInt(off.x) / EMU_PER_PIXEL) * SCALE
    const y = (parseInt(off.y) / EMU_PER_PIXEL) * SCALE

    const width = (parseInt(ext.cx) / EMU_PER_PIXEL) * SCALE
    const height = (parseInt(ext.cy) / EMU_PER_PIXEL) * SCALE

    // -----------------------------
    // TEKSTIMPORT
    // -----------------------------
    let text = ""
    const txBody = sp["p:txBody"]?.[0]

    if (txBody) {
      const paragraphs = txBody["a:p"] || []
      paragraphs.forEach(p => {
        const runs = p["a:r"] || []
        runs.forEach(r => {
          const t = r["a:t"]?.[0]
          if (t) text += t + " "
        })

        const fld = p["a:fld"]?.[0]?.["a:t"]?.[0]
        if (fld) text += fld + " "
      })
    }

    if (text.trim() === "") text = `Node ${id}`

    rawNodes.push({
      id: id.toString(),
      type: "process",
      position: { x, y },
      data: { label: text.trim(), width, height }
    })
  })

  // -----------------------------
  // 2. IMPORTER PPTX-CONNECTORS → EDGES
  // -----------------------------
  connectors.forEach(cxn => {
    const id = cxn["p:nvCxnSpPr"]?.[0]?.["p:cNvPr"]?.[0]?.["$"]?.id
    const startId = cxn["p:nvCxnSpPr"]?.[0]?.["p:cNvCxnSpPr"]?.[0]?.["$"]?.stCxn
    const endId = cxn["p:nvCxnSpPr"]?.[0]?.["p:cNvCxnSpPr"]?.[0]?.["$"]?.endCxn

    if (!id || !startId || !endId) return

    edges.push({
      id: id.toString(),
      source: startId.toString(),
      target: endId.toString(),
      type: "straightCustom"
    })
  })

  // -----------------------------
  // 3. LEGG TIL SPACING ETTER IMPORT
  // -----------------------------
  const spacedNodes = rawNodes.map((n, i) => ({
    ...n,
    position: {
      x: n.position.x + (i % 5) * SPACING_X,
      y: n.position.y + Math.floor(i / 5) * SPACING_Y
    }
  }))

  // -----------------------------
  // 4. RETURNER NODER + EDGES
  // -----------------------------
  return { nodes: spacedNodes, edges }
}
