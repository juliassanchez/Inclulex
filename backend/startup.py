
from multiwordnet.db import compile
from utils import load_nlp_model

# Ejecutar compile-spanish
print('Running compile-spanish function...')

compile("spanish")

print('compile-spanish function executed successfully.')



# Cargar el tokenizador y el modelo pre-entrenado de GPT-2 en español
print('Loading NLP model...')

load_nlp_model()

print('NLP model loaded successfully.')