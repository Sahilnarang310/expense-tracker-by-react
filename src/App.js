import { RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import routes from './routes/routes';

function App() {
  return (
    <RouterProvider router={routes}>
    </RouterProvider>
  );
}

export default App;
