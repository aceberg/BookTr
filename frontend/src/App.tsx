import './App.css'
import Body from './components/Body'
import DownButton from './components/DownButton'
import Header from "./components/Header"
import Tooltip from './components/Tooltip'
import TopInfo from './components/TopInfo'

function App() {

  return (
    <div className="container-lg mb-2">
      <Header></Header>
      <Body></Body>
      <TopInfo></TopInfo>
      <DownButton></DownButton>
      <Tooltip></Tooltip>
    </div>
  )
}

export default App
