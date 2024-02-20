// WordMeaning.jsx

import {React, useState, useEffect} from 'react';
import { Container, Row, Col, Button, ListGroup, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../API';

const WordMeaning = (props) => {
    const { palabra } = useParams();
    const [significado, setSignificado] = useState('La definición de la palabra ejemplo.')
    const [sinonimos, setSinonimos] = useState(['Cocodrilo', 'Calamar', 'Jirafa'])
    const [pictograma, setPictograma] = useState('')
    const [ejemplos, setEjemplos] = useState(['Este es un ejemplo de uso.', 'Otro ejemplo interesante.'])
    const [frecuencia, setFrecuencia] = useState(0)

    useEffect(() => {
        const obtenerPictograma = async () => {
          try {
            const pictoURL = await API.obtenerPictograma(palabra.toLowerCase());
            console.log(pictoURL);
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
      
        obtenerPictograma();
        obtenerFrecuencia();
      }, [palabra]);

  return (
    <Container className="wordmeaining-container">
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
      <Row className='row-container align-items-start'>
        <Col className='col-container'>
          <section>
            <h3 className="subtitulo">Significado</h3>
            <p className='texto'>{significado}</p>
          </section>
        </Col>
        <Col className='col-container'>
          <section>
            <h3 className='subtitulo'>Pictograma</h3>
            <img src={pictograma} alt="Pictograma" style={{ maxWidth: '100%', maxHeight: '200px' }}/>
          </section>
        </Col>
      </Row>

      <Row className='row-container align-items-start'>
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