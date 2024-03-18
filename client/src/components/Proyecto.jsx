const Proyecto = ({ darkMode }) => { 
    const explanationTextClass = darkMode ? 'dark-mode-explanation-text' : 'light-mode-explanation-text';
    return (
        <div className="proyecto-container">
        <h1 className={`explanation-text ${explanationTextClass}`}>Proyecto</h1>
        <p className={`explanation-text ${explanationTextClass}`}>
            IncluLex es un diccionario de lengua española que busca ser inclusivo y accesible para todas las personas.
            Este proyecto es una iniciativa del departamento de informática de la Universidad Carlos III de Madrid.
        </p>
        </div>
    );
    };

export default Proyecto;