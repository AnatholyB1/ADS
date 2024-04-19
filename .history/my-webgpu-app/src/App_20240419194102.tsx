import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from '@/pages/home';
import Three from '@/pages/three';
import Babylon from '@/pages/babylon';
import Webgpu from '@/pages/webgpu';
import Results from '@/pages/results';
import Layout from '@/Layer';



function App() {
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // other pages....
        {
          path: "/three",
          element: <Three />,
        },
        {
          path: "/babylon",
          element: <Babylon />,
        },
        {
          path: "/webgpu",
          element: <Webgpu />,
        },
        {
          path: "/results",
          element: <Results />,
        },
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
