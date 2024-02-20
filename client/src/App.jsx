import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchBar from './components/SearchBar';
import WordMeaning from './components/WordMeaning';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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

