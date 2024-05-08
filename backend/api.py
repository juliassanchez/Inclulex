import spacy
from transformers import AutoTokenizer, AutoModelForCausalLM
import re
import json
import sqlite3
from flask import Flask, request, jsonify
from werkzeug.utils import escape
from multiwordnet.wordnet import WordNet
from multiwordnet.db import compile
compile("spanish")
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Ruta para obtener la frecuencia de una palabra
@app.route('/api/frecuencia', methods=['GET'])
def get_frecuencia():
    palabra = escape(request.args.get('word'))
    if not palabra:
        return jsonify({'error': 'Palabra no proporcionada en los parámetros de la solicitud'}), 400

    try:
        # Conexión a la base de datos
        conexion = sqlite3.connect('frecuencia.db')
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
        print("Error al ejecutar la consulta:", error)
        return jsonify({'error': 'Error al ejecutar la consulta SQL'}), 500
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



        
# Cargar el modelo de lenguaje de español de Spacy
nlp = spacy.load("es_core_news_sm")

# Cargar el tokenizador y el modelo pre-entrenado de GPT-2 en español

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, set_seed
tokenizer = AutoTokenizer.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")
model = AutoModelForCausalLM.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")
generator = pipeline('text-generation', tokenizer=tokenizer, model=model)

@app.route('/api/examples', methods=['GET'])
def get_ejemplos():
    if request.method == 'GET':
        word = escape(request.args.get('word'))
        # Obtener ejemplos de uso de la palabra
        frases_generadas = generator(f"Nos referimos a {word}", num_return_sequences=3)
        lista_frases = [generacion['generated_text'] for generacion in frases_generadas]

        return jsonify({"frases_generadas": lista_frases})


