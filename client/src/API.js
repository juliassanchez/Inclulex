const SERVER_URL = 'http://localhost:3000';

const obtenerPictograma = async (palabra) => {
  try {
    const respuestaId = await fetch(`https://api.arasaac.org/v1/pictograms/es/search/${palabra}`);

    if (!respuestaId.ok) {
      throw new Error('Error al obtener el ID del pictograma');
    }

    const datosId = await respuestaId.json();
    const urlPictograma = `https://api.arasaac.org/v1/pictograms/${datosId[0]._id}/?download=false`;

    return urlPictograma;
  } catch (error) {
    console.error('Error al obtener el pictograma:', error.message);
    throw new Error('Error en la obtención del pictograma');
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
