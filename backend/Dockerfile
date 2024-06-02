FROM python:3.10.2-slim

WORKDIR /app/backend

# Install system dependencies
# RUN apt-get update && \
#     apt-get install -y vim sqlite3 && \
#     apt-get clean

# Copy requirements and install Python dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
# RUN pip3 install torch
# RUN pip install accelerate
# RUN pip install -i https://pypi.org/simple/ bitsandbytes


# Copy application code
COPY . .

# Set up the NVIDIA repository key and add the repository to APT sources
RUN apt-get update && apt-get install -y \
    vim \
    curl \
    gnupg \
    ca-certificates \
    && curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
    && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
        sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
        tee /etc/apt/sources.list.d/nvidia-container-toolkit.list \
    && apt-get update \
    && apt-get install -y nvidia-container-toolkit
RUN echo "Installed nvidia packages."

# Copy the SQLite database file
COPY frecuencia.db frecuencia.db
RUN chmod 777 frecuencia.db

CMD ["gunicorn", "-b", "0.0.0.0:3000", "--reload", "wsgi:app"]