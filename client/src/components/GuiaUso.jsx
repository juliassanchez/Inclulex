import React from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const GuiaUso = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const offset = 70; // Ajusta el valor según el espacio que ocupa tu navbar
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      };
  return (
    <Row >
    <Col sm={3} className='guia-uso-container'>
        <SectionIndex scrollToSection={scrollToSection} />
      </Col>
    <Col sm={9}>
        <div>
      <Section title="Página de inicio" id="pagina-de-inicio" backgroundColor="#F0F0F0">
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
                <img src="/src/assets/modo.png" alt="Modo" style={{ maxWidth: '70%', maxHeight: '70%', width: 'auto', height: 'auto' }} />
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Section>

      <Section title="Página de búsqueda" id="pagina-de-busqueda" backgroundColor="#E0E0E0">
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
                    <img src="/src/assets/frecuencia-compleja.png" alt="Frecuencia Compleja" style={{ maxWidth: '15%', height: 'auto'}} />
                </Row>
                </Col>
                
              </ListGroupItem>
              <ListGroupItem><strong>Ejemplos de Uso:</strong> Explora ejemplos que ilustran cómo se utiliza la palabra en contextos diferentes.</ListGroupItem>
              <ListGroupItem><strong>Sinónimos:</strong> Encuentra palabras similares que pueden enriquecer tu vocabulario.</ListGroupItem>
              <ListGroupItem><strong>Definición Simple:</strong> Obtén una explicación clara y concisa del significado de la palabra.</ListGroupItem>
              <ListGroupItem><strong>Pictograma:</strong> Observa a través de una representación gráfica la palabra buscada.</ListGroupItem>
            </ListGroup>
            <p>Siempre podrás volver a la página de inicio pulsando en el botón "Buscar otra palabra"</p>
          </Col>
        </Row>
      </Section>
    </div>
    </Col>
    </Row>
  );
};

const SectionIndex = ({ scrollToSection }) => {
    return (
      <div style={{ position: 'fixed', padding: '20px'}}>
        <h4>Índice de Secciones</h4>
        <ListGroup>
          <ListGroupItem onClick={() => scrollToSection('pagina-de-inicio')}>Página de inicio</ListGroupItem>
          <ListGroupItem onClick={() => scrollToSection('pagina-de-busqueda')}>Página de búsqueda</ListGroupItem>
        </ListGroup>
      </div>
    );
  };

  const Section = ({ title, id, backgroundColor, children }) => {
    const titleStyle = {
      color: '#FF6B35',
      textAlign: 'center',
      fontFamily: 'YourChosenFont, sans-serif',
      fontSize: '2em'
    };
    const sectionStyle = {
        backgroundColor,
        padding: '50px 0',
        minHeight: '100vh',
        marginTop: '80px', // Ajusta según tu barra de navegación
      };
    
  
    return (
        <div id={id} style={sectionStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    );
  };

export default GuiaUso;
