from flask import Flask, request, jsonify
from werkzeug.utils import escape
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/api/definition-easy', methods=['GET'])
def get_definition_easy():
    if request.method == 'GET':
        word = escape(request.args.get('word'))
        
        definition_list = list()
        page = requests.get(url='http://diccionariofacil.org/diccionario/' + word)
        soup = BeautifulSoup(page.text, 'html.parser')
        error_content = soup.find("div", {"id": "infoBoxArrowError3contendor"})
        if page.status_code == 200 and not error_content:
            definitions_content = soup.findAll(True, {"class": ["field-definicion"]})
            for definition_content in definitions_content:
                definition_list.append(definition_content.text.replace("\n", ""))
            return jsonify(definition_list=definition_list)
        else:
            return jsonify(definition_list=definition_list)

if __name__ == '__main__':
    app.run(debug=True, port=3000)


