// WordMeaning.jsx

import {React, useState, useEffect} from 'react';
import { Container, Row, Col, Button, ListGroup, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../API';

const WordMeaning = (props) => {
    const { palabra } = useParams();
    const [significado, setSignificado] = useState(['Esta palabra no se encuentra actualmente en nuestros diccionarios'])
    const [sinonimos, setSinonimos] = useState(['Cocodrilo', 'Banco', 'Jirafa'])
    const [pictograma, setPictograma] = useState('')
    const [ejemplos, setEjemplos] = useState(['El caimán y el cocodrilo no se diferencian más que en el nombre.', 
    'Allí, golpean por accidente a un cocodrilo, por lo que los encarcelan.', 
    'Son devoradas por un cocodrilo, que dice Coors, en referencia a otra cervecería estadounidense.', 
    'Cocodrilo, ¿dónde? Es la imagen de un río, en donde se supone hay un cocodrilo, pero no se ve.'])
    const [frecuencia, setFrecuencia] = useState(0)

    useEffect(() => {
        const obtenerPictograma = async () => {
          try {
            const pictoURL = await API.obtenerPictograma(palabra.toLowerCase());
            setPictograma(pictoURL);
          } catch (error) {
            console.error('Error al obtener el pictograma:', error);
          }
        };

        const obtenerFrecuencia = async () => {
          try {
            const nuevaFrecuencia = await API.obtenerFrecuencia(palabra);
            setFrecuencia(() => {
              return nuevaFrecuencia;
            });
          } catch (error) {
            console.error('Error al obtener la frecuencia:', error);
          }
        };

        const obtenerDefinicion = async () => {
          try {
            const nuevaDefinicion = await API.obtenerDefinicion(palabra);
    
            // Asegúrate de que nuevaDefinicion.definition_list sea una matriz antes de asignarlo
            const definiciones = nuevaDefinicion.definition_list || [];
    
            setSignificado(() => {
              return definiciones.length > 0 ? definiciones : ['Esta palabra no se encuentra actualmente en nuestros diccionarios'];
            });
          } catch (error) {
            console.error('Error al obtener la definición:', error);
          }
        };
      
        obtenerPictograma();
        obtenerFrecuencia();
        obtenerDefinicion();
      }, [palabra]);

  return (
    <Container fluid="md" align="center" style={{ marginTop: '80px' }}>
      <h2 className='palabra'>{palabra}</h2>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={
          frecuencia < 1000 ? (
            <Tooltip id="frecuencia-tooltip">No es una palabra frecuente</Tooltip>
          ) : (
            <Tooltip id="frecuencia-tooltip">Es una palabra frecuente</Tooltip>
          )
        }>
        <Button variant={frecuencia < 1000 ? "danger" : "success"} active className='frecuency-button'>
          {frecuencia < 1000 ? "Compleja" : "Simple"}
        </Button>
      </OverlayTrigger>
      <br />
      <Row>
      <Col md={8} className="d-flex flex-column">
        <h3 className="subtitulo">Significado</h3>
        <ol className="texto my-auto">
          {significado.map((definicion, index) => (
            <li key={index}>
              {definicion}
            </li>
          ))}
        </ol>
      </Col>
        <Col md={4}>
          <section>
            <h3 className='subtitulo'>Pictograma</h3>
            <div style={{ width: '300px', height: '300px', overflow: 'hidden', backgroundColor: '#ffffff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={pictograma} alt="Pictograma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </section>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={8} className="d-flex flex-column">
          <section>
            <h3 className='subtitulo'>Ejemplos de uso</h3>
            <ListGroup className='custom-list-group'>
              {ejemplos.map((ejemplo, index) => (
                <ListGroup.Item key={index} className='texto custom-list-group'>{ejemplo}</ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col> 
        <Col md={4}>
          <section>
            <h3 className='subtitulo'>Sinónimos</h3>
            <ListGroup className='custom-list-group-container'>
              {sinonimos.map((sinonimo, index) => (
                <ListGroup.Item key={index} className='texto custom-list-group-item'>
                  <Link to={`/search/${sinonimo.toLowerCase()}`} className='link-sinonimo'>{sinonimo}</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col>   
      </Row>
      <br />
      <Button
        variant="primary"
        className="go-back-button"
        as={Link} to={`/`}
      >
        Buscar otra palabra
      </Button>
    </Container>
  );
};

export default WordMeaning;