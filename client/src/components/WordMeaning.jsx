// WordMeaning.jsx

import {React, useState, useEffect} from 'react';
import { Container, Row, Col, Button, ListGroup, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../API';

const WordMeaning = (props) => {
    const { palabra } = useParams();
    const [significado, setSignificado] = useState(['Esta palabra no se encuentra actualmente en nuestros diccionarios'])
    const [sinonimos, setSinonimos] = useState(['Cocodrilo', 'Calamar', 'Jirafa'])
    const [pictograma, setPictograma] = useState('')
    const [ejemplos, setEjemplos] = useState(['Este es un ejemplo de uso.', 'Otro ejemplo interesante.'])
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
    <Container fluid="md" align="center">
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
      <Row>
        <Col md={6}>
          <section>
            <h3 className="subtitulo">Significado</h3>
            {significado.map((definicion, index) => (<p key={index} className='texto'>{definicion}</p>))}
          </section>
        </Col>
        <Col md={6}>
  <section>
    <h3 className='subtitulo'>Pictograma</h3>
    <div style={{ width: '200px', height: '200px', overflow: 'hidden', backgroundColor: '#ffffff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={pictograma} alt="Pictograma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </section>
</Col>




      </Row>

      <Row>
        <Col className='col-container'>
          <section>
            <h3 className='subtitulo'>Ejemplos de uso</h3>
            <ListGroup className='custom-list-group'>
              {ejemplos.map((ejemplo, index) => (
                <ListGroup.Item key={index} className='texto custom-list-group'>{ejemplo}</ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col> 
        <Col className='col-container'>
          <section>
            <h3 className='subtitulo'>Sinónimos</h3>
            <ListGroup>
              {sinonimos.map((sinonimo, index) => (
                <ListGroup.Item key={index} className='texto custom-list-group'>
                  <Link to={`/search/${sinonimo.toLowerCase()}`} className='link-sinonimo'>{sinonimo}</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col>   
      </Row>
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