import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchBar from './components/SearchBar';
import WordMeaning from './components/WordMeaning';
import { Form, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const switchLabel = darkMode ? 'Modo Oscuro' : 'Modo Claro';


  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={switchLabel}
        className='switch'
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{ width: '160px'}}
      />
      <Button onClick={handleShow} className='guia-uso'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
        </svg>
          <span style={{ marginLeft: '8px' }}>Guía de uso</span>
        </div>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className={darkMode ? 'dark-mode-offcanvas' : 'light-mode-offcanvas'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: '36px'}}>Guía de uso 
          <span className="brand-text-inclu"> Inclu</span>
          <span className="brand-text-lex">Lex</span>
          
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h3 style={{color: '#FF6B35'}}>Página de inicio</h3>
            <p> En nuestra página de inicio, te damos la bienvenida a una herramienta simple y poderosa para explorar el significado y la frecuencia de las palabras. Aquí puedes:</p>
            <ul>
              <li>
              <p style={{ margin: 0, padding: 0 }}>
                Utilizar nuestro buscador para encontrar información detallada sobre palabras complejas que te interesen.
              </p>
              <img src="/src/assets/buscador.jpg" style={{ maxWidth: '90%', maxHeight: '90%', width: 'auto', height: 'auto' }} /> 
              </li>
              <li>Acceder a una guía de uso para comprender mejor cómo aprovechar al máximo nuestra página y sus características.</li>
              <li>
                <p style={{ margin: 0, padding: 0 }}>
                Seleccionar entre los modos de visualización claro u oscuro según tus preferencias.
                </p>
                <img src="/src/assets/modo.png" style={{ maxWidth: '70%', maxHeight: '70%', width: 'auto', height: 'auto' }} /> 
                </li>
            </ul>
            <h3 style={{color: '#FF6B35'}}>Página de búsqueda</h3>
            <p>A esta página se accede una vez hemos realizado una búsqueda</p>
            <ul>
              <li><strong>Frecuencia:</strong> 
              <p style={{ margin: 0, padding: 0 }}>
              Descubre qué tan común es la palabra que buscas. En función de su frecuencia, la palabra puede ser simple o compleja.
              </p>
              <div>
                <img src="/src/assets/frecuencia-simple.png" style={{ maxWidth: '24%', maxHeight: '24%', width: 'auto', height: 'auto' }} />
                <img src="/src/assets/frecuencia-compleja.png" style={{ maxWidth: '30%', maxHeight: '30%', width: 'auto', height: 'auto' }} />
              </div>
              </li>
              <li><strong>Ejemplos de Uso:</strong> Explora ejemplos que ilustran cómo se utiliza la palabra en contextos diferentes.</li>
              <li><strong>Sinónimos:</strong> Encuentra palabras similares que pueden enriquecer tu vocabulario.</li>
              <li><strong>Definición Simple:</strong> Obtén una explicación clara y concisa del significado de la palabra.</li>
              <li><strong>Pictograma:</strong> Observa através de una representación gráfica la palabra buscada.</li>
            </ul>
            <p> Siempre podrá volver a la página de inicio pulsando en el botón "Buscar otra palabra"</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <BrowserRouter>
        <Routes>
          <Route index element={<SearchBar darkMode={darkMode}/>}/>
          <Route path='search/:palabra' element={<WordMeaning darkMode={darkMode}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

