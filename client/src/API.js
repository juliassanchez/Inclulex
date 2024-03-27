const SERVER_URL = 'http://localhost:3000';

const obtenerPictograma = async (palabra) => {
  try {
    const respuestaIds = await fetch(`https://api.arasaac.org/v1/pictograms/es/search/${palabra}`);

    if (!respuestaIds.ok) {
      throw new Error('Error al obtener los IDs de los pictogramas');
    }

    const datosIds = await respuestaIds.json();
    const urlsPictogramas = datosIds.map((dato) => `https://api.arasaac.org/v1/pictograms/${dato._id}/?download=false`);

    return urlsPictogramas;
  } catch (error) {
    console.error('Error al obtener los pictogramas:', error.message);
    throw new Error('Error en la obtención de los pictogramas');
  }
};

const obtenerFrecuencia = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL + `/api/search/${palabra}`);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      // Si hay un error en la respuesta, lanzar una excepción
      throw new Error(contentJson.error);
    }

    const frecuencia = contentJson.frecuencia; 
    return frecuencia;
  } catch (error) {
    console.error('Error al obtener la frecuencia:', error);
    // Puedes lanzar nuevamente el error para manejarlo más arriba si es necesario
    throw error;
  }
};

const obtenerDefinicion = async (palabra) => {
  try {
      const response = await fetch(`http://127.0.0.1:3000/api/definition-easy?word=${palabra}`);

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }

      const contentJson = await response.json();

      if (contentJson.error) {
          throw new Error(contentJson.error);
      }

      const definition = contentJson;
      console.log('Definición obtenida:', definition);

      return definition;
  } catch (error) {
      console.error('Error al obtener la definición:', error);
      throw error;
  }
};

const API = { obtenerPictograma, obtenerFrecuencia, obtenerDefinicion };
export default API;
