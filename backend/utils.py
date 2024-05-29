import torch
from transformers import (AutoTokenizer,
                          AutoModelForCausalLM,
                          BitsAndBytesConfig)

def load_nlp_model():
    model_name='stabilityai/stablelm-2-12b'
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16
    )
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    tokenizer.pad_token = tokenizer.eos_token
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="cuda",
        quantization_config=bnb_config,
        device_map="auto"
    )       

    return {
        'model': model,
        'tokenizer': tokenizer
    }