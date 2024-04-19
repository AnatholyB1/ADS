import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Three from '@/pages/three';
import Babylon from '@/pages/babylon';
import Webgpu from '@/pages/webgpu';
import Results from '@/pages/results';

function App() {


  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/three.js" Component={Three} />
      <Route path="/babylon.js" Component={Babylon} />
      <Route path="/webgpu" Component={Webgpu} />
      <Route path="/results" Component={Results} />
    </Routes>
  )
}

export default App
