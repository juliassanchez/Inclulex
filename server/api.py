from flask import Flask, request, jsonify
from werkzeug.utils import escape
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


if __name__ == '__main__':
    app.run(debug=True, port=3000)


