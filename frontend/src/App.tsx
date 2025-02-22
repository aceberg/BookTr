import './App.css'
import Body from './components/Body'
import DownButton from './components/DownButton'
import Header from "./components/Header"
import Tooltip from './components/Tooltip'

function App() {

  return (
    <div className="container-lg mb-2">
      <Header></Header>
      <Body></Body>
      <DownButton></DownButton>
      <Tooltip></Tooltip>
    </div>
  )
}

export default App
