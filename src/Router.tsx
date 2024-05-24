import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeNew from './pages/home-new';


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeNew />} />
      </Routes>
    </BrowserRouter>
  );
}
