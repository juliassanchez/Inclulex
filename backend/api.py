import os
import re
import json
import sqlite3
from flask import Flask, request, jsonify
from werkzeug.utils import escape
from multiwordnet.wordnet import WordNet
from multiwordnet.db import compile
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from utils import load_nlp_model
import torch
from transformers import pipeline
from langchain import PromptTemplate
from langchain import HuggingFacePipeline

app = Flask(__name__)
CORS(app)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Database path
LOCAL_PATH = os.path.dirname(os.path.realpath(__file__))
DATABASE_PATH = os.path.join(LOCAL_PATH, 'frecuencia.db')


# Ruta para obtener la frecuencia de una palabra
@app.route('/api/frecuencia', methods=['GET'])
def get_frecuencia():
    palabra = escape(request.args.get('word'))
    if not palabra:
        return jsonify({'error': 'Palabra no proporcionada en los parámetros de la solicitud'}), 400

    try:
        # Conexión a la base de datos
        print(f'Intentando abrir base de datos: {DATABASE_PATH}')
        conexion = sqlite3.connect(DATABASE_PATH)
        cursor = conexion.cursor()

        # Consulta SQL para obtener la frecuencia de la palabra
        sql = "SELECT * FROM frecuencia_filtrada WHERE palabra = ?"
        cursor.execute(sql, (palabra,))
        row = cursor.fetchone()

        if row is None:
            return jsonify({'error': 'Palabra no encontrada en la base de datos'}), 404
        else:
            frecuencia = {
                'palabra': row[0],
                'frecuencia': row[1]
            }
            return jsonify(frecuencia)

    except sqlite3.Error as error:
        return jsonify({'error': 'Error al ejecutar la consulta SQL: {}'.format(str(error))}), 500
    finally:
        if conexion:
            conexion.close()

@app.route('/api/definition-easy', methods=['GET'])
def get_definition_easy():
    try:
        # Abrir el archivo JSON
        with open('dictionary.json', 'r', encoding='utf-8') as json_file:
            dictionary = json.load(json_file)

        # Obtener la palabra de la solicitud
        word = escape(request.args.get('word'))

        # Buscar la palabra en el diccionario
        definition = dictionary.get(word.lower())

        if definition:
            return jsonify({"definition_list": [definition]})
        else:
            # Si la palabra no se encuentra, intentar con su forma masculina
            if word.endswith('a') and word[:-1] + 'o' in dictionary:
                definition = dictionary.get(word[:-1] + 'o')
            elif word.endswith('o') and word[:-1] + 'a' in dictionary:
                definition = dictionary.get(word[:-1] + 'a')

            if definition:
                return jsonify({"definition_list": [definition]})
            else:
                return jsonify({"error": f"No se encontró una definición para la palabra '{word}'."})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/api/definition-rae', methods=['GET'])
def get_definition_rae():
    if request.method == 'GET':
        word = escape(request.args.get('word'))
        
        page = requests.get(url='https://dle.rae.es/'+ word + '?m=form', headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        
        error_content = soup.find("div", {"id": "infoBoxArrowError3contendor"})
        
        if page.status_code == 200 and not error_content:
            definitions_with_class_j = []
            definitions_content = soup.find_all("p", {"class": "j"})
            
            if definitions_content:
                for definition in definitions_content:
                    definition_text = definition.text.strip()
                    definition_text = re.sub(r'^\d+\.\s*[mf]\.\s*', '', definition_text)
                    definitions_with_class_j.append(definition_text)
                
                return jsonify(definition_list=definitions_with_class_j)
            else:
                return jsonify({"error": "No se encontraron definiciones para la palabra proporcionada."}), 404
        else:
            return jsonify({"error": "No se pudo acceder a la página o no se encontró la palabra especificada. , page.status_code: " + str(page.status_code)})

@app.route('/api/siglas', methods=['GET'])
def get_siglas():
    if request.method == 'GET':
        word = escape(request.args.get('word'))

        page = requests.get(url='https://www.siglas.com.es/letras/' + word[0], headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        error_content = soup.find("div", {"class": "error"})
        
        if page.status_code == 200 and not error_content:
            titulo = soup.find("span", {"class": "titulo"}, text=lambda t: t and t.lower() == word.lower())
            
            if not titulo:
                titulo = soup.find("span", {"class": "titulo"}, text=lambda t: t and t.lower() == word.upper())
            
            if titulo:
                texto = titulo.find_next_sibling("span", {"class": "texto"}).text.strip()
                return jsonify(texto=texto)
            else:
                return jsonify({"error": "No se encontró el título para la palabra proporcionada."}), 404
        else:
            return jsonify({"error": "No se pudo acceder a la página o no se encontró la palabra especificada, page.status_code: " + str(page.status_code)})

@app.route('/api/synonym-lwn', methods=['GET'])
def get_synonym_lwn():
    if request.method == 'GET':
        word = escape(request.args.get('word'))

        LWN = WordNet('spanish')
        # Obtener información sobre la palabra sin especificar la categoría gramatical
        resultados = LWN.get(word)

        synoyms_list = []
        # Iterar sobre los resultados y acceder a la información de cada categoría gramatical
        for resultado in resultados:
            sinonimos = resultado.synonyms
            for sinonimo in sinonimos:
                synoyms_list.append(sinonimo.lemma)
        return jsonify(synoyms_list=synoyms_list)

@app.route('/api/synonym-sinant', methods=['GET'])
def get_synonym_sinant():
    try:
        # Abrir el archivo JSON de sinónimos
        with open('sinant.json', 'r', encoding='utf-8') as json_file:
            sinant_data = json.load(json_file)

        # Obtener la palabra de la solicitud
        word = request.args.get('word')

        # Buscar la palabra en el diccionario de sinónimos
        synonyms = sinant_data.get(word.lower())

        if synonyms:
            synoyms_list = synonyms.get("sinonimos", [])
            return jsonify({"synoyms_list": synoyms_list})
        else:
            # Si la palabra no se encuentra, intentar con su forma masculina o femenina
            if word.endswith('a') and word[:-1] + 'o' in sinant_data:
                synonyms = sinant_data.get(word[:-1] + 'o')
            elif word.endswith('o') and word[:-1] + 'a' in sinant_data:
                synonyms = sinant_data.get(word[:-1] + 'a')

            if synonyms:
                synoyms_list = synonyms.get("sinonimos", [])
                return jsonify({"synoyms_list": synoyms_list})
            else:
                return jsonify({"error": f"No se encontraron sinónimos para la palabra '{word}'."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
with open('Instrucciones.txt', 'r') as file:
    instrucciones = file.read()

with open('EjemplosSimplificacion.txt', 'r') as file:
    ejemplos_simplificación = file.read()

template = """
Dame un ejemplo con la palabra de la entrada utilizando un lenguaje muy sencillo.

% TONO
 - No uses palabras complejas.
 - Utiliza un lenguaje sencillo.
 - Simplifica en un tono para que sea comprendido por personas con discapacidad intelectual.

%INICIO DE EJEMPLOS
{ejemplos_simplificación}
%FIN DE EJEMPLOS

% INSTRUCCIONES {instrucciones}

% TUS TAREAS
- Primero, escribe el ejemplo.
- Segundo, simplifica la respuesta del ejemplo.


CREA UNA FRASE DE EJEMPLO CON LA PALABRA: {entrada}

RESPUESTA:
"""

@app.route('/api/examples', methods=['GET'])
def get_ejemplos():
    if request.method == 'GET':
        entrada = escape(request.args.get('word'))
        # Cargar desde utils
        nlp_model = load_nlp_model()
        # Obtener ejemplos de uso de la palabra
        prompt= PromptTemplate(
            input_variables=['ejemplos_simplificación','instrucciones','entrada'],
            #input_variables=['entrada'],
            template=template,)
        final_prompt = prompt.format(ejemplos_simplificación=ejemplos_simplificación, instrucciones=instrucciones,entrada=entrada)
        #final_prompt = prompt.format(entrada=entrada)
        text_generator = pipeline(
                "text-generation",
                model=nlp_model['model'],
                tokenizer=nlp_model['tokenizer'],
                max_new_tokens=100,
                #max_new_tokens=3000,
                return_full_text = False,
                temperature=0.3,
                num_return_sequences=2,
                top_p=0.95,
                top_k=1,
                do_sample=True
        )
        llm = HuggingFacePipeline(pipeline=text_generator)
        invoke=re.split(r'\n\n', llm.invoke(final_prompt), 1)[0]
        lista_frases = [invoke]

        return jsonify({"frases_generadas": lista_frases})

