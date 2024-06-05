
from multiwordnet.db import compile
from utils import NLPModel

# Ejecutar compile-spanish
print('Running compile-spanish function...')

compile("spanish")

print('compile-spanish function executed successfully.')



# Cargar el tokenizador y el modelo pre-entrenado de GPT-2 en español
print('Loading NLP model...')

nlp_model = NLPModel()
nlp_model.load_model()

MODEL = nlp_model.get_model()
TOKENIZER = nlp_model.get_tokenizer()

print('NLP model loaded successfully.')