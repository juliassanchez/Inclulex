# import spacy
# from transformers import AutoTokenizer, AutoModelForCausalLM
import re
import json
import sqlite3
from flask import Flask, request, jsonify
from werkzeug.utils import escape
from multiwordnet.wordnet import WordNet
# from multiwordnet.db import compile
# compile("spanish")
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Ruta para obtener la frecuencia de una palabra
@app.route('/api/frecuencia')
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
        with open('Dictionary.json', 'r', encoding='utf-8') as json_file:
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
        
# # Cargar el modelo de lenguaje de español de Spacy
# nlp = spacy.load("es_core_news_sm")

# # Cargar el tokenizador y el modelo pre-entrenado
# tokenizer = AutoTokenizer.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")
# model = AutoModelForCausalLM.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")

# def obtener_articulo(palabra):
#     # Procesar la palabra con SpaCy
#     doc = nlp(palabra)
    
#     # Verificar el género de la palabra en el contexto
#     for token in doc:
#         # Verificar si el token es un sustantivo y si tiene información de género
#         if token.pos_ == "NOUN" and token.morph.get("Gender"):
#             # Obtener el género de la palabra y convertirlo a cadena
#             genero = token.morph.get("Gender")[0]  # Tomar el primer elemento de la lista
#             # Devolver el artículo correspondiente al género
#             return "El" if genero == "Masc" else "La"
    
#     # Si no se encontró información de género, devolver None
#     return None

# def generar_frases_con_palabra(palabra, modelo, tokenizer, num_frases=3, max_length=50):
#     frases_generadas = []
#     for _ in range(num_frases):
#         # Obtener el artículo adecuado para la palabra
#         articulo = obtener_articulo(str(palabra))
        
#         # Construir el inicio de la frase con el artículo y la palabra
#         inicio_frase = f"{articulo} {palabra} "
        
#         # Inicializar la longitud máxima inicial
#         current_max_length = max_length
        
#         # Generar texto adicional con el modelo de lenguaje
#         while True:
#             input_ids = tokenizer.encode(inicio_frase, return_tensors="pt")
#             output = modelo.generate(input_ids, do_sample=True, max_length=current_max_length, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id, top_k=50, top_p=0.95, temperature=0.7)
#             texto_generado = tokenizer.decode(output[0], skip_special_tokens=True)
            
#             # Verificar si la frase generada excede la longitud máxima deseada
#             if len(texto_generado.split()) <= max_length:
#                 break
#             else:
#                 # Reducir la longitud máxima y generar nuevamente
#                 current_max_length -= 10
        
#         # Agregar el texto generado a la lista de frases generadas
#         frases_generadas.append(texto_generado)

#     return frases_generadas

# @app.route('/api/examples', methods=['GET'])
# def get_ejemplos():
#     if request.method == 'GET':
#         word = escape(request.args.get('word'))

#         # Llamar a la función que genera frases con la palabra dada
#         frases_generadas = generar_frases_con_palabra(word, model, tokenizer, num_frases=5)

#         return jsonify({"frases_generadas": frases_generadas})

    
if __name__ == '__main__':
    app.run(debug=True, port=3000)

