import { Row } from "react-bootstrap";

const Proyecto = () => { 
    return (
        <div className="proyecto-container">
        <h2 className='explanation-text'>Proyecto</h2>
        <p className='explanation-text'>
        En la sociedad actual, es muy importante que todos puedan acceder a la información, sin importar sus capacidades o nivel 
        de educación. Pero muchas veces, el lenguaje complicado puede ser un problema para algunas personas, como aquellos con 
        discapacidades intelectuales o que no hablan bien el idioma principal.
        <br /> <br />
        Para solucionar esto, es útil escribir la información de una manera más sencilla, usando palabras fáciles de entender. 
        Esto ayuda a todos, no solo a aquellos con dificultades. Evitamos usar palabras técnicas o extranjeras, abreviaturas o 
        acrónimos sin explicarlos claramente.
        <br /> <br />
        Adaptar el texto de esta manera no es fácil, y a menudo se necesitan diferentes recursos como diccionarios y dibujos para 
        ayudar. Esta plataforma pretende hacer que la información sea más fácil de entender para todos.
        </p>
        <h2 className='explanation-text'>Accesibilidad</h2>
        <p className='explanation-text'>
        Estamos trabajando en desarrollar IncluLex Hub, un sitio web fácil de usar para la mayor cantidad de personas posible. 
        Utilizamos herramientas estándar de la web como HTML5 para la estructura, CSS3 para que se vea bien en todos los 
        dispositivos, y JavaScript para hacerlo interactivo sin necesidad de recargar páginas. Nuestro objetivo principal es 
        asegurarnos de que el sitio sea accesible para todos, incluyendo personas con discapacidades. Seguimos las pautas de 
        Accesibilidad para el Contenido Web (<a href="https://www.w3.org/TR/WCAG22">WCAG</a>) para lograr esto.
        </p>
        <h2 className='explanation-text'>Descarga</h2>
        <p className='explanation-text'>
        IncluLex Hub es una plataforma de código abierto. Puedes descargarlo en el siguiente enlace al repositorio de
        github: <a href="https://github.com/juliassanchez/IncluLex">https://github.com/juliassanchez/IncluLex</a>
        </p>
        <h2 className='explanation-text'>Referencias</h2>
        <Row className="justify-content-center">
        <img src="/src/assets/ARASAAC.png" alt="ARASAAC" style={{ maxWidth: '20%', height: 'auto' }} href="https://arasaac.org/"/>
        <img src="/src/assets/busca-palabra.png" alt="BuscaPalabra" style={{ maxWidth: '20%', height: 'auto' }} href="https://www.buscapalabra.com/"/>
        </Row>
        </div>
    );
    };

export default Proyecto;