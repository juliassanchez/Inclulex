FROM python:3.10.2-slim

WORKDIR /app/backend

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "wsgi.py"]