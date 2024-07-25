
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
      <Suspense fallback={"App Loading..."}>
        <RouterProvider router={router} />
      </Suspense>
    )
  }
  
  export default App
  