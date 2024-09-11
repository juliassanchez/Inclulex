const SERVER_URL = 'http://127.0.0.1:3000/api';

const obtenerPictograma = async (palabra, signal) => {
  try {
    const respuestaIds = await fetch(`https://api.arasaac.org/v1/pictograms/es/search/${palabra}`, { signal });

    if (!respuestaIds.ok) {
      throw new Error('Error al obtener los IDs de los pictogramas');
    }

    const datosIds = await respuestaIds.json();
    const urlsPictogramas = datosIds.map((dato) => `https://api.arasaac.org/v1/pictograms/${dato._id}/?download=false`);

    return urlsPictogramas;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener los pictogramas:', error.message);
    }
    throw error;
  }
};

const obtenerFrecuencia = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/frecuencia?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }

    let frecuencia = contentJson.frecuencia;
    return frecuencia;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener la frecuencia:', error);
      // Intentar buscar la frecuencia de la palabra en singular si está en plural
      if (palabra.endsWith('s')) {
        const palabraSingular = palabra.slice(0, -1);
        return obtenerFrecuencia(palabraSingular, signal);
      }
    }
    throw error;
  }
};

const obtenerDefinicion = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/definition-easy?word=${palabra}`, { signal });

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
    if (error.name !== 'AbortError') {
      console.error('Error al obtener la definición:', error);
    }
    throw error;
  }
};

const obtenerSigla = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/siglas?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }
    const sigla = contentJson.texto;

    return sigla;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener la sigla:', error);
    }
    throw error;
  }
};

const obtenerRAE = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/definition-rae?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }

    const definicion = contentJson;
    console.log('Definición obtenida desde RAE:', definicion);

    return definicion;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener la definición desde RAE:', error);
    }
    throw error;
  }
};

const obtenerSinonimos = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/synonym-lwn?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }

    const synonyms = contentJson;
    if (synonyms.synoyms_list.length === 0 && palabra.endsWith('s')) {
      const singularPalabra = palabra.slice(0, -1);
      console.log(`No se encontraron sinónimos para "${palabra}". Intentando con "${singularPalabra}"...`);
      return obtenerSinonimos(singularPalabra, signal);
    }

    console.log('Sinónimos obtenidos:', synonyms);
    return synonyms;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener los sinónimos:', error);
    }
    throw error;
  }
};

const obtenerSinonimos2 = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/synonym-sinant?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }

    const synonyms = contentJson;
    if (synonyms.synoyms_list.length === 0 && palabra.endsWith('s')) {
      const singularPalabra = palabra.slice(0, -1);
      console.log(`No se encontraron sinónimos para "${palabra}". Intentando con "${singularPalabra}"...`);
      return obtenerSinonimos(singularPalabra, signal);
    }

    console.log('Sinónimos obtenidos:', synonyms);
    return synonyms;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener los sinónimos:', error);
    }
    throw error;
  }
};

const obtenerEjemplos = async (palabra, signal) => {
  try {
    const response = await fetch(SERVER_URL + `/examples?word=${palabra}`, { signal });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      throw new Error(contentJson.error);
    }

    const examples = contentJson;
    console.log('Ejemplos obtenidos:', examples);

    return examples;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al obtener los ejemplos:', error);
    }
    throw error;
  }
};

// Exportar todas las funciones de la API con soporte para señales de abortar
const API = {
  obtenerPictograma,
  obtenerFrecuencia,
  obtenerDefinicion,
  obtenerSigla,
  obtenerRAE,
  obtenerSinonimos,
  obtenerSinonimos2,
  obtenerEjemplos
};
export default API;

