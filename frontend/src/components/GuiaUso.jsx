import React from 'react';
import { Col, Row, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import { useState } from 'react';

const GuiaUso = (props) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const offset = 70; // Ajusta el valor según el espacio que ocupa tu navbar
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <Row className='guia-uso-container' role="main">
            <Col md={2} className="sidebar d-none d-md-block">
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link onClick={() => scrollToSection('contenido-principal')}>Contenido Principal</Nav.Link>
                    <Nav.Link onClick={() => scrollToSection('barra-navegación')}>Barra de navegación</Nav.Link>
                    <Nav.Link onClick={() => scrollToSection('pagina-de-inicio')}>Página de inicio - IncluLex</Nav.Link>
                    <Nav.Link onClick={() => scrollToSection('pagina-de-busqueda')}>Página de búsqueda</Nav.Link>
                    <Nav.Link onClick={() => scrollToSection('pagina-proyecto')}>Proyecto</Nav.Link>
                </Nav>
            </Col>
            <Col md={10} className="main-content">
                <div>
                    <Section title="Contenido Principal" id="contenido-principal" darkMode={props.darkMode}>
                        <p>En esta guía de uso, te explicamos cómo utilizar nuestra plataforma IncluLex Hub. Aquí encontrarás información sobre las distintas secciones de la página y cómo sacar el máximo provecho de ellas.</p>
                    </Section>
                    <Section title="Barra de navegación" id="barra-navegación" darkMode={props.darkMode}>
                        <Row>
                            <Col>
                                <p>La barra de navegación se encuentra en la parte superior de la página y contiene los siguientes elementos:</p>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <strong>IncluLex:</strong> Te lleva a la página de inicio de IncluLex Hub.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Proyecto:</strong> Te muestra información sobre el proyecto IncluLex Hub.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Guía de Uso:</strong> Te lleva a esta guía de uso.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Modo Claro / Oscuro:</strong> Permite cambiar los colores de la plataforma de tonos claros a oscuros y viceversa.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row className="justify-content-center">
                                            <img src="/src/assets/navbar.png" alt="NavBar" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Section>
                    <Section title="Página de inicio - IncluLex" id="pagina-de-inicio" darkMode={props.darkMode}>
                        <Row>
                            <Col>
                                <p>En nuestra página de inicio, te damos la bienvenida a una herramienta simple y poderosa para explorar el significado y la frecuencia de las palabras. Aquí puedes:</p>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <p>Utilizar nuestro buscador para encontrar información detallada sobre palabras complejas que te interesen.</p>
                                        <Row className="justify-content-center">
                                            <img src="/src/assets/buscador.jpg" alt="Buscador" style={{ maxWidth: '60%', maxHeight: '60%', width: 'auto', height: 'auto' }} />
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Acceder a la barra de navegación para obtener más información sobre el proyecto y la guía de uso.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Section>
                    <Section title="Página de búsqueda" id="pagina-de-busqueda" darkMode={props.darkMode}>
                        <Row>
                            <Col>
                                <p>A esta página se accede una vez hemos realizado una búsqueda</p>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <strong>Frecuencia:</strong>
                                        <Col>
                                            <p className="mb-0">Descubre qué tan común es la palabra que buscas. En función de su frecuencia, la palabra puede ser simple o compleja.</p>
                                        </Col>
                                        <Col>
                                            <Row className="justify-content-center">
                                                <img src="/src/assets/frecuencia-simple.png" alt="Frecuencia Simple" style={{ maxWidth: '20%', height: 'auto' }} />
                                                <img src="/src/assets/frecuencia-compleja.png" alt="Frecuencia Compleja" style={{ maxWidth: '20%', height: 'auto' }} />
                                            </Row>
                                        </Col>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Ejemplos de Uso:</strong>
                                        <Col>
                                            <p className="mb-0">Explora ejemplos que ilustran cómo se utiliza la palabra en contextos diferentes. 
                                            Si no te gustan los ejemplos de uso, no te preocupes! Puedes generar distintos ejemplos pulsando este botón:</p>
                                        </Col>
                                        <Col>
                                            <Row className="justify-content-center">
                                                <img src="/src/assets/generar-ejemplos.png" alt="Generar ejemplos" style={{ maxWidth: '40%', height: 'auto' }} />
                                            </Row>
                                        </Col>
                                    </ListGroup.Item>
                                    <ListGroup.Item><strong>Sinónimos:</strong> Encuentra palabras similares que pueden enriquecer tu vocabulario.</ListGroup.Item>
                                    <ListGroup.Item><strong>Definición Simple:</strong> Obtén una explicación clara y concisa del significado de la palabra.</ListGroup.Item>
                                    <ListGroup.Item><strong>Pictograma:</strong> Observa a través de una representación gráfica la palabra buscada.</ListGroup.Item>
                                </ListGroup>
                                <br /> {/* Salto de línea */}
                                <p>Siempre podrás volver a la página de inicio pulsando en el botón "Buscar otra palabra"</p>
                                <img src="/src/assets/buscar-otra.png" alt="Buscar otra palabra" style={{ maxWidth: '40%', maxHeight: '40%', width: 'auto', height: 'auto', margin: 'auto', display: 'block' }} />
                            </Col>
                        </Row>
                    </Section>
                    <Section title="Proyecto" id="pagina-proyecto" darkMode={props.darkMode}>
                        <p> En esta página podrás obtener toda la información del proyecto, como la motivación, accesibilidad, referencias y enlace al código fuente de la plataforma. </p>
                    </Section>
                </div>
            </Col>
        </Row>
    );
};

const Section = ({ title, id, children, darkMode }) => {
    const titleStyle = {
        color: darkMode ? '#42AFFE' : '#3240D1',
        textAlign: 'center',
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSize: '2em',
        marginTop: '10px',
    };

    // Determina el color de fondo basado en isGrayBackground
    const backgroundColor = id % 2 === 0 ? '' : 'gray-background';

    return (
        <div id={id} className={`section-content ${backgroundColor}`}>
            <h1 style={titleStyle}>{title}</h1>
            <hr style={{ borderTop: '1px solid #ccc' }} />
            <div>
                {children}
            </div>
        </div>
    );
};

export default GuiaUso;

