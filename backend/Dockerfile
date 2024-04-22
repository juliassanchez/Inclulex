FROM python:3.10.2

WORKDIR /app/backend

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "api.py"]