import torch
from transformers import (AutoTokenizer,
                          AutoModelForCausalLM,
                          BitsAndBytesConfig)

# Variables globales para el modelo y el tokenizador
nlp_model = None
tokenizer = None

def load_nlp_model():
    global nlp_model, tokenizer

    model_name = 'stabilityai/stablelm-2-12b'
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16,
        device_map="auto"
    )
    
    tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir='/app/backend/cache')
    tokenizer.pad_token = tokenizer.eos_token
    
    try:
        torch.cuda.empty_cache()
        nlp_model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=bnb_config,
            cache_dir='/app/backend/cache'
        )
    except RuntimeError as e:
        print(f"Failed to load model on GPU: {e}")
        nlp_model = AutoModelForCausalLM.from_pretrained(
            model_name,
            cache_dir='/app/backend/cache'
        )

    return {'model': nlp_model, 'tokenizer': tokenizer}