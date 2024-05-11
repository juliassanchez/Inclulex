FROM python:3.10.2-slim

WORKDIR /app/backend

COPY frecuencia.db frecuencia.db
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-b", "0.0.0.0:3000", "--reload", "wsgi:app"]