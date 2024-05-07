FROM python:3.10.2-slim

WORKDIR /app/backend

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "-b", "0.0.0.0:3000", "backend.wsgi:app"]