import { Row } from "react-bootstrap";

const Proyecto = () => { 
    return (
        <div className="proyecto-container" role="main">
        <h1 className='explanation-text'>Proyecto</h1>
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
        <h1 className='explanation-text'>Accesibilidad</h1>
        <p className='explanation-text'>
        Estamos trabajando en desarrollar IncluLex Hub, un sitio web fácil de usar para la mayor cantidad de personas posible. 
        Utilizamos herramientas estándar de la web como HTML5 para la estructura, CSS3 para que se vea bien en todos los 
        dispositivos, y JavaScript para hacerlo interactivo sin necesidad de recargar páginas. Nuestro objetivo principal es 
        asegurarnos de que el sitio sea accesible para todos, incluyendo personas con discapacidades. Seguimos las pautas de 
        Accesibilidad para el Contenido Web (<a className="enlace" href="https://www.w3.org/TR/WCAG22">WCAG</a>) para lograr esto.
        </p>
        <h1 className='explanation-text'>Contacto</h1>
        <p className='explanation-text'>
        Si tienes alguna pregunta o sugerencia, por favor no dudes en contactarnos. Nos encantaría saber de ti y estamos aquí para ayudarte. 
        Valoramos mucho tu opinión y queremos asegurarnos de que tengas la mejor experiencia posible en nuestra plataforma.
        Puedes enviarnos tus comentarios a través de nuestro formulario de evaluación. <a className="enlace" href="https://docs.google.com/forms/d/e/1FAIpQLSd95ESCWLHcshCTU7Gk9_cKwygfv8vCjHE0B72S5ZoWxV6xtw/viewform"> Google Forms IncluLex Hub</a>
        </p>
        <h1 className='explanation-text'>Descarga</h1>
        <p className='explanation-text'>
        IncluLex Hub es una plataforma de código abierto. Puedes descargarlo en el siguiente enlace al repositorio de
        github: <a href="https://github.com/juliassanchez/IncluLex">https://github.com/juliassanchez/IncluLex</a>
        </p>
        <h1 className='explanation-text'>Referencias</h1>
        <Row className="justify-content-center">
        <img src="/src/assets/ARASAAC.png" alt="ARASAAC" style={{ maxWidth: '30%', height: 'auto' }} href="https://arasaac.org/"/>
        <img src="/src/assets/hulat.png" alt="EasierHulat" style={{ maxWidth: '30%', height: 'auto' }} href="https://hulat.inf.uc3m.es"/>
        </Row>
        </div>
    );
    };

export default Proyecto;