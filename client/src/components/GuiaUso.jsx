import React from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState } from 'react';

const GuiaUso = (props) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const offset = 70; // Ajusta el valor según el espacio que ocupa tu navbar
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <Row className='guia-uso-container'>
            <Col sm={2}>
                <SectionIndex scrollToSection={scrollToSection} />
            </Col>
            <Col sm={10}>
                <div >
                    <Section title="Página de inicio - IncluLex" id="pagina-de-inicio" darkMode={props.darkMode}>
                        <Row>
                            <Col>
                                <p>En nuestra página de inicio, te damos la bienvenida a una herramienta simple y poderosa para explorar el significado y la frecuencia de las palabras. Aquí puedes:</p>
                                <ListGroup>
                                    <ListGroupItem>
                                        <p>Utilizar nuestro buscador para encontrar información detallada sobre palabras complejas que te interesen.</p>
                                        <img src="/src/assets/buscador.jpg" alt="Buscador" style={{ maxWidth: '90%', maxHeight: '90%', width: 'auto', height: 'auto' }} />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Acceder a una guía de uso para comprender mejor cómo aprovechar al máximo nuestra página y sus características.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <p>Seleccionar entre los modos de visualización claro u oscuro según tus preferencias.</p>
                                        <img src="/src/assets/modo.png" alt="Modo" style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto',  margin: 'auto', display: 'block' }} />
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Section>

                    <Section title="Página de búsqueda" id="pagina-de-busqueda" darkMode={props.darkMode}>
                        <Row>
                            <Col>
                                <p>A esta página se accede una vez hemos realizado una búsqueda</p>
                                <ListGroup>
                                    <ListGroupItem>
                                        <strong>Frecuencia:</strong>
                                        <Col>
                                            <p className="mb-0">Descubre qué tan común es la palabra que buscas. En función de su frecuencia, la palabra puede ser simple o compleja.</p>
                                        </Col>
                                        <Col>
                                            <Row className="justify-content-center">
                                                <img src="/src/assets/frecuencia-simple.png" alt="Frecuencia Simple" style={{ maxWidth: '15%', height: 'auto' }} />
                                                <img src="/src/assets/frecuencia-compleja.png" alt="Frecuencia Compleja" style={{ maxWidth: '15%', height: 'auto' }} />
                                            </Row>
                                        </Col>
                                    </ListGroupItem>
                                    <ListGroupItem><strong>Ejemplos de Uso:</strong> Explora ejemplos que ilustran cómo se utiliza la palabra en contextos diferentes.</ListGroupItem>
                                    <ListGroupItem><strong>Sinónimos:</strong> Encuentra palabras similares que pueden enriquecer tu vocabulario.</ListGroupItem>
                                    <ListGroupItem><strong>Definición Simple:</strong> Obtén una explicación clara y concisa del significado de la palabra.</ListGroupItem>
                                    <ListGroupItem><strong>Pictograma:</strong> Observa a través de una representación gráfica la palabra buscada.</ListGroupItem>
                                </ListGroup>
                                <br /> {/* Salto de línea */}
                                <p>Siempre podrás volver a la página de inicio pulsando en el botón "Buscar otra palabra"</p>
                                <img src="/src/assets/buscar-otra.png" alt="Buscar otra palabra" style={{ maxWidth: '30%', maxHeight: '30%', width: 'auto', height: 'auto', margin: 'auto', display: 'block' }} />
                            </Col>
                        </Row>
                    </Section>
                    <Section title="Proyecto" id="pagina-proyecto" darkMode={props.darkMode}>
                      
                    </Section>
                </div>
            </Col>
        </Row>
    );
};

const SectionIndex = ({ scrollToSection }) => {
  return (
    <div style={{ position: 'fixed', paddingLeft: '20px', width: 'auto', paddingTop: '2%'}}>
      <h4>Índice de Secciones</h4>
      <ListGroup variant="flush">
        <ListGroupItem action onClick={() => scrollToSection('pagina-de-inicio')} className='list-item'>Página de inicio - IncluLex</ListGroupItem>
        <ListGroupItem action onClick={() => scrollToSection('pagina-de-busqueda')} className='list-item'>Página de búsqueda</ListGroupItem>
        <ListGroupItem action onClick={() => scrollToSection('pagina-proyecto')} className='list-item'>Proyecto</ListGroupItem>
      </ListGroup>
    </div>
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
            <h3 style={titleStyle}>{title}</h3>
            <hr style={{ borderTop: '1px solid #ccc' }} />
            <div>
                {children}
            </div>
        </div>
    );
};


export default GuiaUso;
