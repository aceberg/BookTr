import './App.css'
import Body from './components/Body'
import DownButton from './components/DownButton'
import Header from "./components/Header"

function App() {

  return (
    <div className="container-lg mb-2">
      <Header></Header>
      <Body></Body>
      <DownButton></DownButton>
    </div>
  )
}

export default App
