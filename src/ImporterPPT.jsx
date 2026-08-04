function ImportFlow() {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  async function handleFile(e) {
    const file = e.target.files[0]
    const { nodes, edges } = await importPptxToReactFlow(file)
    setNodes(nodes)
    setEdges(edges)
  }

  return (
    <>
      <input type="file" accept=".pptx" onChange={handleFile} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      />
    </>
  )
}
