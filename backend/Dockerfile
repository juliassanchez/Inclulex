FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04

WORKDIR /app/backend

# Install system dependencies
# RUN apt-get update && \
#     apt-get install -y vim sqlite3 && \
#     apt-get clean

# Copy requirements and install Python dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Copy the SQLite database file
COPY frecuencia.db frecuencia.db
RUN chmod 777 frecuencia.db

CMD ["gunicorn", "-b", "0.0.0.0:3000", "--reload", "wsgi:app"]