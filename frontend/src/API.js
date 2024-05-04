const SERVER_URL = 'http://127.0.0.1:3000/api';
// const SERVER_URL = 'http://10.117.129.37:3000/api';
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
    const response = await fetch(SERVER_URL+`/frecuencia?word=${palabra}`);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const contentJson = await response.json();

    if (contentJson.error) {
      // Si hay un error en la respuesta, lanzar una excepción
      throw new Error(contentJson.error);
    }

    let frecuencia = contentJson.frecuencia; 
    return frecuencia;
  } catch (error) {
    console.error('Error al obtener la frecuencia:', error);
    // Intentar buscar la frecuencia de la palabra en singular si está en plural
    if (palabra.endsWith('s')) {
      const palabraSingular = palabra.slice(0, -1);
      return obtenerFrecuencia(palabraSingular);
    } else {
      // Si no es una palabra en plural o si falla nuevamente, lanzar el error
      throw error;
    }
  }
};

const obtenerDefinicion = async (palabra) => {
  try {
      const response = await fetch(SERVER_URL +`/definition-easy?word=${palabra}`);

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

const obtenerSigla = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL +`/siglas?word=${palabra}`);

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
    console.error('Error al obtener la sigla:', error);
    throw error;
  }
};

const obtenerRAE = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL +`/definition-rae?word=${palabra}`);
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
    console.error('Error al obtener la definición desde RAE:', error);
    throw error;
  }
};



const obtenerSinonimos = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL +`/synonym-lwn?word=${palabra}`);
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
      return obtenerSinonimos(singularPalabra);
    }

    console.log('Sinónimos obtenidos:', synonyms);
    return synonyms;
  } catch (error) {
    console.error('Error al obtener los sinónimos:', error);
    throw error;
  }
};

const obtenerSinonimos2 = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL +`/synonym-sinant?word=${palabra}`);
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
      return obtenerSinonimos(singularPalabra);
    }

    console.log('Sinónimos obtenidos:', synonyms);
    return synonyms;
  } catch (error) {
    console.error('Error al obtener los sinónimos:', error);
    throw error;
  }
}


const obtenerEjemplos = async (palabra) => {
  try {
    const response = await fetch(SERVER_URL +`/examples?word=${palabra}`);
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
  }
  catch (error) {
    console.error('Error al obtener los ejemplos:', error);
    throw error;
  }
};

//obtenerEjemplos
const API = { obtenerPictograma, obtenerFrecuencia, obtenerDefinicion, obtenerSigla, obtenerRAE, obtenerSinonimos, obtenerSinonimos2, obtenerEjemplos };
export default API;
