// SearchBar.jsx

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Importa el archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import inclulexLogo from '/logo.svg'
import Typo from 'typo-js'

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const dictEs = new Typo('es', null, null, { dictionaryPath: '/assets' });
  console.log(dictEs);
  const handleSearch = () => {
    console.log('searchTerm:', searchTerm);
    const suggestions = dictEs.suggest(searchTerm.toLowerCase());
    const check = dictEs.check(searchTerm.toLowerCase())
    console.log('check:', check);
    console.log('suggestions:', suggestions);
    const correctedWord = suggestions.length > 0 ? suggestions[0] : searchTerm;
    console.log('correctedWord:', correctedWord);
    navigate(`/search/${correctedWord.toLowerCase()}`);
  };

  const searchInputClass = props.darkMode ? 'dark-mode-search-input' : 'light-mode-search-input';
  const searchButtonClass = props.darkMode ? 'dark-mode-search-button' : 'light-mode-search-button';
  const explanationTextClass = props.darkMode ? 'dark-mode-explanation-text' : 'light-mode-explanation-text';

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
    <div className="app-container">
    {/* <img src={inclulexLogo} className="logo" alt="IncluLex logo" style={{ width: "15vw", height: "15vh" }}/> */}
      <h1 className="brand-text">
        <span className="brand-text-inclu">Inclu</span>
        <span className="brand-text-lex">Lex</span>
      </h1>
    </div>
    <div className="search-bar-container">
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ingrese una palabra"
        className={`search-input ${searchInputClass}`}
        spellCheck="true"
      />
      <Button
        variant="primary"
        onClick={handleSearch}
        className={`search-button ${searchButtonClass}`}
      >
        Buscar
      </Button>
    </div>
    <h2 className={`explanation-text ${explanationTextClass}`}>
    Queremos ayudarte a entender palabras difíciles de una manera divertida. Te mostramos palabras parecidas, te damos ejemplos y usamos dibujos para que sea fácil y divertido aprender nuevas palabras.
    </h2>
    </>
  );
};

export default SearchBar;