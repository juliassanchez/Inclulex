import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBar from './components/SearchBar';
import WordMeaning from './components/WordMeaning';
import GuiaUso from './components/GuiaUso';
import Proyecto from './components/Proyecto';
import NotFound from './components/NotFound';
import { Form, Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  // Obtén el estado de darkMode desde el almacenamiento local al inicio
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  const toggleDarkMode = () => {
    // Cambia el estado y utiliza el estado actualizado
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem('darkMode', String(newDarkMode));
      return newDarkMode;
    });
  };

  const switchLabel = darkMode ? 'Modo Oscuro' : 'Modo Claro';

  useEffect(() => {
    // Aplica la clase al cuerpo del documento al cambiar el modo
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Navbar id="nav" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" fixed="top" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>
            <img alt="Botón de inicio" src="/logo.svg" width="30" height="30" className="d-inline-block align-top" /> IncluLex
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/guia-uso">
                Guía de uso
                <img src="/src/assets/question-circle.svg" alt="Info" className="nav-icon" />
              </Nav.Link>
              <Nav.Link href="/proyecto">
                Proyecto
                <img src="/src/assets/book.svg" alt="Info" className="nav-icon" />
              </Nav.Link>
            </Nav>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={switchLabel}
              className='switch'
              checked={darkMode}
              onChange={toggleDarkMode}
              style={{ width: '160px' }}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route index element={<SearchBar darkMode={darkMode} />} />
          <Route path='search/:palabra' element={<WordMeaning darkMode={darkMode} />} />
          <Route path='/guia-uso' element={<GuiaUso darkMode={darkMode} />} />
          <Route path='/proyecto' element={<Proyecto/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


