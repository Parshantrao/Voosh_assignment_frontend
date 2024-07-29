import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import NotFound from './pages/not_found/NotFound';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StateProvider } from './contexts/Context';

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/registration" element={<Signup />} />
          <Route path="/dashboard" element={
            <DndProvider backend={HTML5Backend}>
              <Home />
            </DndProvider>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
