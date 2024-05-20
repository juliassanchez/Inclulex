import { ListGroup, Row } from "react-bootstrap";

const Proyecto = () => { 
    return (
        <div className="proyecto-container" role="main">
        <h1 className='explanation-text'>Proyecto</h1>
        <p className='explanation-text'>
        En nuestra sociedad, el acceso equitativo a la información es fundamental, independientemente de las capacidades 
        individuales o del nivel educativo de cada persona. Sin embargo, el uso de un lenguaje complejo a menudo representa 
        una barrera significativa, especialmente para aquellos con discapacidades intelectuales, limitación cognitiva o quienes 
        no dominan el idioma principal. 
        <br /> <br />
        Esta contribución, la plataforma IncluLex Hub, es parte del Trabajo Fin de Grado de Julia Sánchez Esquivel, 
        estudiante de Ingeniería Informática de UC3M realizado en el Grupo de Investigación <a className="enlace" href="https://hulat.inf.uc3m.es">HULAT (Human Language and Accessibility Technologies)</a> <b />
        de la Universidad Carlos III de Madrid. 
        <br /> <br />
        Esta iniciativa busca facilitar el entendimiento a través de la simplificación del lenguaje, utilizando términos 
        fáciles de comprender y evitando jergas técnicas sin explicaciones claras.
        <br/> <br />
        <b>Referencia:</b> Plataforma IncluLex. Junio 2024. Julia Sánchez Esquivel y Lourdes Moreno López. Grupo HULAT. UC3M.
        </p>
        <h1 className='explanation-text'>Accesibilidad</h1>
        <p className='explanation-text'>
        IncluLex Hub se ha desarrollado para que sea un sitio web fácil de usar para la mayor cantidad de personas posible. 
        Utilizamos herramientas estándar de la web como HTML5 para la estructura, CSS3 para que se vea bien en todos los 
        dispositivos, y JavaScript para hacerlo interactivo sin necesidad de recargar páginas. Nuestro objetivo principal 
        es asegurarnos de que el sitio sea accesible para todos, incluyendo personas con discapacidades siguiendo las pautas de 
        <a className="enlace" href="https://www.w3.org/TR/WCAG22"> Accesibilidad para el Contenido Web (WCAG)</a>.
        </p>
        <h1 className='explanation-text'>Contacto</h1>
        <p className='explanation-text'>
        Para preguntas o sugerencias, contáctanos a través de nuestro formulario de evaluación en  <a className="enlace" href="https://docs.google.com/forms/d/e/1FAIpQLSd95ESCWLHcshCTU7Gk9_cKwygfv8vCjHE0B72S5ZoWxV6xtw/viewform"> Google Forms IncluLex Hub</a>
        </p>
        <h1 className='explanation-text'>Descarga</h1>
        <p className='explanation-text'>
        IncluLex Hub es una plataforma de código abierto. Puedes descargarlo en el siguiente enlace al repositorio de
        github: <a href="https://github.com/juliassanchez/IncluLex">https://github.com/juliassanchez/IncluLex</a>
        </p>
        <h1 className='explanation-text'>Reconocimientos y Recursos de Terceros</h1>
        <ul>
        <li className="explanation-text"> Agradecemos al Centro Aragonés de Comunicación Aumentativa y Alternativa <a className="enlace" href="https://arasaac.org/"> ARASAAC</a> por proporcionar 
            los pictogramas utilizados en IncluLex Hub, fundamentales para mejorar la comunicación visual en nuestra plataforma.</li>
        <li className="explanation-text">Agradecemos a <a className="enlace" href="https://www.siglas.com.es/"> Siglas</a> por proporcionar las siglas que utilizamos en este proyecto.</li>
        <li className="explanation-text">Agradecemos a <a className="enlace" href="https://guao.org/sites/default/files/biblioteca/Diccionario%20básico%20de%20español.pdf"> Guao.org</a> por proporcionar el diccionario del cual se obtienen las definiciones y algunos sinónimos que utilizamos en este proyecto.</li>
        <li className="explanation-text">Agradecemos a <a className="enlace" href="https://huggingface.co/PlanTL-GOB-ES/gpt2-large-bne"> Text Mining Unit (TeMU) en el Centro de Supercomputación de Barcelona (BSC)</a> por proporcionar la IA generativa mediante la cual se obtienen los ejemplos de uso de IncluLex Hub. </li>
        <li className="explanation-text">Proyecto <a className="enlace" href="https://github.com/LURMORENO/easier"> EASIER</a>. Grupo <a className="enlace" href="https://hulat.inf.uc3m.es"> HULAT</a>. </li>
        </ul>
        <Row className="justify-content-center">
        <img src="/src/assets/arasaac.png" alt="ARASAAC" style={{ maxWidth: '22%', height: 'auto' }} href="https://arasaac.org/"/>
        <img src="/src/assets/guao.png" alt="Guao" style={{ maxWidth: '22%', height: 'auto' }} href="https://www.guao.org"/>
        <img src="/src/assets/easier.jpg" alt="EasierHulat" style={{ maxWidth: '22%', height: 'auto' }} href="https://github.com/LURMORENO/easier"/>
        <img src="/src/assets/hulat_azul.png" alt="Hulat" style={{ maxWidth: '22%', height: 'auto' }} href="https://hulat.inf.uc3m.es"/>
        </Row>
        </div>
    );
    };

export default Proyecto;