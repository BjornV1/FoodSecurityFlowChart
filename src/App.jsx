import { ReactFlowProvider } from 'reactflow'
import FlowDiagram from './FlowDiagram'

function App() {
  return (
    <ReactFlowProvider>
      <FlowDiagram />
    </ReactFlowProvider>
  )
}

export default App
