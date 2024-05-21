from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

def load_nlp_model():
    tokenizer = AutoTokenizer.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")
    model = AutoModelForCausalLM.from_pretrained("PlanTL-GOB-ES/gpt2-large-bne")
    generator = pipeline('text-generation', tokenizer=tokenizer, model=model)

    return {
        'model': model,
        'tokenizer': tokenizer,
        'generator': generator
    }