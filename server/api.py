# import spacy
# import random
# from transformers import AutoTokenizer, AutoModelForCausalLM
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
        
@app.route('/api/definition-easy', methods=['GET'])
def get_definition_easy():
    if request.method == 'GET':
        word = escape(request.args.get('word'))
        
        definition_list = []
        page = requests.get(url='https://www.buscapalabra.com/definiciones.html?palabra='+ word + '#resultados', headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        error_content = soup.find("div", {"id": "infoBoxArrowError3contendor"})
        if page.status_code == 200 and not error_content:
            definitions_content = soup.find("ol", {"class": "lista-ordenada"})
            if definitions_content:
                for li in definitions_content.find_all("li"):
                    definition_text = li.text.strip()
                    if definition_text not in definition_list: # A veces da definiciones repetidas
                        definition_list.append(definition_text)
                return jsonify(definition_list=definition_list)
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
#     # Obtener el género gramatical de la palabra utilizando Spacy
#     genero = ""
#     doc = nlp(palabra)
#     for token in doc:
#         if token.tag_ == "NOUN":
#             if token.text.lower() in ["águila", "ente"]:
#                 genero = "fem"
#             else:
#                 genero = "masc"
#             break
    
#     # Determinar el artículo adecuado según el género
#     if genero == "masc":
#         return "El"
#     elif genero == "fem":
#         return "La"
#     else:
#         return "El"

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
# def get_examples():
#     if request.method == 'GET':
#         word = escape(request.args.get('word'))

#         # Llamar a la función que genera frases con la palabra dada
#         frases_generadas = generar_frases_con_palabra(word, model, tokenizer, num_frases=5)

#         return jsonify({"frases_generadas": frases_generadas})

    
if __name__ == '__main__':
    app.run(debug=True, port=3000)

