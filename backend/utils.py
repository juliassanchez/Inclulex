import torch
from transformers import (AutoTokenizer,
                          AutoModelForCausalLM,
                          BitsAndBytesConfig)

class NLPModel:
    def __init__(self):
        self.model_name = 'stabilityai/stablelm-2-12b'
        self.tokenizer = None
        self.model = None

    def load_model(self):
        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.float16,
            device_map="auto"
        )
        # Clear GPU cache
        torch.cuda.empty_cache()

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, cache_dir='/app/backend/cache')
        self.tokenizer.pad_token = self.tokenizer.eos_token
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            device_map="cuda",
            quantization_config=bnb_config
        )

    def get_model(self):
        return self.model

    def get_tokenizer(self):
        return self.tokenizer