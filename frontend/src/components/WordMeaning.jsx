// WordMeaning.jsx

import {React, useState, useEffect} from 'react';
import { Container, Row, Col, Button, ListGroup, Tooltip, OverlayTrigger, Carousel, ListGroupItem, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../API';

const WordMeaning = (props) => {
    const { palabra } = useParams();
    const [significado, setSignificado] = useState(['Esta palabra no se encuentra actualmente en nuestros diccionarios'])
    const [sinonimos, setSinonimos] = useState(['No se encontraron sinónimos.'])
    const [pictograma, setPictograma] = useState(['No se encontraron pictogramas.'])
    const [ejemplos, setEjemplos] = useState([
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    ])
    const [frecuencia, setFrecuencia] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const obtenerEjemplos = async () => {
      setIsLoading(true);
      console.log('Obteniendo ejemplos...');
      setEjemplos([
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ]);
      try {
        const nuevosEjemplos = await API.obtenerEjemplos(palabra);
        const ejemplos = nuevosEjemplos.frases_generadas || [];
        console.log('Ejemplos obtenidos:', ejemplos);
        let frase;
        if (ejemplos.length > 0) {
          frase = ejemplos[0].split('.')[0] + ".";
          console.log(frase);
        } else {
          frase = 'No se encontraron ejemplos';
        }
        // Actualizar el estado de ejemplos después de obtener los nuevos ejemplos
        setEjemplos(ejemplos.length > 0 ? [frase] : ['No se encontraron ejemplos']);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los ejemplos:', error);
        // Establecer el estado de los ejemplos como el spinner nuevamente
        setEjemplos([
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ]);
      }
    };

    useEffect(() => {

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
            let definiciones = [];
            
            // Intenta obtener la definición
            const nuevaDefinicion = await API.obtenerDefinicion(palabra);
            if (nuevaDefinicion && nuevaDefinicion.definition_list && nuevaDefinicion.definition_list.length > 0) {
              definiciones = nuevaDefinicion.definition_list;
            } else {
              console.log('No se encontró una definición. Intentando obtener la sigla...');
              // Si no se encuentra definición, intenta obtener la sigla
              const sigla = await API.obtenerSigla(palabra);
              setSignificado([sigla]);
              return;
            }
        
            // Si hay definiciones, establecerlas
            setSignificado(definiciones.length > 0 ? definiciones : ['Esta palabra no se encuentra actualmente en nuestros diccionarios']);
          } catch (error) {
            console.error('Error al obtener la definición:', error);
            // Si hay un error al obtener la definición, intenta obtenerla desde la RAE
            console.log('Intentando obtener desde RAE...');
            try {
              const respuestaRAE = await API.obtenerRAE(palabra);
              const definicionesRAE = respuestaRAE.definition_list || [];
              setSignificado(definicionesRAE.length > 0 ? definicionesRAE : ['No se encontraron definiciones en la RAE']);
            } catch (raeError) {
              console.error('Error al obtener la definición desde RAE:', raeError);
              setSignificado(['No se pudo obtener la definición desde la RAE']);
            }
            
          }
        };        
        
        const obtenerSinonimos = async () => {
          try {
              let nuevosSinonimos = await API.obtenerSinonimos(palabra);
              let sinonimos = nuevosSinonimos.synoyms_list || [];

              if (sinonimos.length === 0) {
                  nuevosSinonimos = await API.obtenerSinonimos2(palabra);
                  sinonimos = nuevosSinonimos.synoyms_list || [];
              }

              if (sinonimos.length > 5) {
                  const frecuencias = await Promise.all(sinonimos.map(async (sinonimo) => {
                      try {
                          const frecuencia = await API.obtenerFrecuencia(sinonimo);
                          return { sinonimo, frecuencia };
                      } catch (error) {
                          console.error('Error al obtener la frecuencia:', error);
                          return { sinonimo, frecuencia: 0 };
                      }
                  }));

                  frecuencias.sort((a, b) => b.frecuencia - a.frecuencia);
                  sinonimos = frecuencias.slice(0, 5).map((obj) => obj.sinonimo);
              }

              setSinonimos(sinonimos.length > 0 ? sinonimos : ['No se encontraron sinónimos.']);
          } catch (error) {
              console.error('Error al obtener los sinónimos:', error);
          }
      };
        
        
        const obtenerPictograma = async () => {
          try {
            const pictoURLs = await API.obtenerPictograma(palabra.toLowerCase());
            setPictograma(pictoURLs);
          } catch (error) {
            console.error('Error al obtener el pictograma:', error);
        
            // Si hay sinónimos, intentamos obtener el pictograma con cada sinónimo
            if (sinonimos.length > 0) {
              for (const sinonimo of sinonimos) {
                try {
                  const pictoURLs = await API.obtenerPictograma(sinonimo.toLowerCase());
                  // Si pictoURLs no está vacío, lo establecemos como pictograma
                  if (pictoURLs.length > 0) {
                    setPictograma(pictoURLs);
                    return;
                  }
                } catch (sinonimoError) {
                  console.error('Error al obtener el pictograma con el sinónimo:', sinonimoError);
                }
              }
            }
        
            // // Si no se pudo obtener el pictograma con los sinónimos, intentamos con la definición
            // if (significado.length > 0) {
            //   try {
            //     const pictoURLs = await API.obtenerPictograma(significado[0].toLowerCase());
            //     // Si pictoURLs no está vacío, lo establecemos como pictograma
            //     if (pictoURLs.length > 0) {
            //       setPictograma(pictoURLs);
            //       return;
            //     }
            //   } catch (definicionError) {
            //     console.error('Error al obtener el pictograma con la definición:', definicionError);
            //   }
            // }
        
            // Si no se puede obtener el pictograma con ninguna palabra alternativa, establecemos pictograma como vacío
            setPictograma([]);
          }
        };

        const obtenerDatos = async () => {
          await Promise.all([
              obtenerFrecuencia(),
              obtenerDefinicion(),
              obtenerSinonimos(),
              obtenerPictograma()
          ]);
          obtenerEjemplos();
        };

        obtenerDatos();

        return () => {
            setSignificado([]);
            setSinonimos([]);
            setPictograma([]);
            setFrecuencia(0);
            setEjemplos([
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ]);
      };
      }, [palabra]);


  return (
    <Container fluid className="word-meaning-container" role="main" style={{ marginTop: '90px', textAlign: 'center' }}>
    <h1 className='palabra' role="banner">{palabra}</h1>
    <OverlayTrigger
      placement="auto"
      delay={{ show: 250, hide: 400 }}
      overlay={
        frecuencia < 1000 ? (
          <Tooltip id="frecuencia-tooltip">No es una palabra frecuente</Tooltip>
        ) : (
          <Tooltip id="frecuencia-tooltip">Es una palabra frecuente</Tooltip>
        )
      }>
      <p className='mini-texto'>
        Se trata de una palabra {' '}
        <Button
        variant={frecuencia < 1000 ? "danger" : "success"}
        className='frecuency-button'
        role="navigation"
        style={{ pointerEvents: 'none' }}>
        {frecuencia < 1000 ? "Compleja" : "Simple"}
      </Button>
      </p>
    </OverlayTrigger>


  <br />
  <Row>
    <Col md={8} className="d-flex flex-column">
      <h2 className="subtitulo">Significado</h2>
      <ListGroup className="custom-list-group my-auto">
        {significado.map((definicion, index) => (
          <ListGroupItem key={index} className="texto custom-list-group">
            {definicion}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Col>
    <Col md={4} className="d-flex justify-content-center">
  <section>
    <h2 className='subtitulo'>Pictogramas</h2>
    {pictograma.length > 0 ? (
  <div style={{ width: '300px', height: '300px', overflow: 'hidden', backgroundColor: '#ffffff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Carousel variant='dark'>
      {pictograma.map((pictoURL, index) => (
        <Carousel.Item key={index}>
          <img src={pictoURL} alt={`Pictograma ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
) : (
  <ListGroup className='custom-list-group-container'>
    <ListGroup.Item className='mini-texto-picto custom-list-group'>
          No se encontraron pictogramas.
  </ListGroup.Item>
  </ListGroup>
)}

  </section>
</Col>

  </Row>
  <br />
  <Row>
    <Col md={8} className="d-flex flex-column">
      <section>
        <h2 className='subtitulo'>Ejemplo de uso</h2>
        <ListGroup className='custom-list-group'>
          {ejemplos.map((ejemplo, index) => (
            <ListGroup.Item key={index} className='texto custom-list-group'>{ejemplo}</ListGroup.Item>
          ))}
        </ListGroup>
        {!isLoading ? ( <Button variant="dark" onClick={obtenerEjemplos} className="examples-button">Generar otro ejemplo de uso</Button>): (<><br></br><p>Los ejemplos de uso pueden tardar en cargar unos segundos.</p></>)}
        
      </section>
    </Col> 
    <Col  md={4} className="d-flex justify-content-center">
      <section>
        <h2 className='subtitulo'>Sinónimos</h2>
        <ListGroup className='custom-list-group-container'>
      {sinonimos.length > 0 ? (
        sinonimos.map((sinonimo, index) => (
          <ListGroup.Item key={index} className='texto custom-list-group'>
            <Link to={`/search/${sinonimo.toLowerCase()}`} className='link-sinonimo'>{sinonimo}</Link>
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item className='mini-texto-picto custom-list-group'>
          No se encontraron sinónimos.
        </ListGroup.Item>
      )}
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