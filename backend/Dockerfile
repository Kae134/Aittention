FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

ENV PATH=/usr/local/cuda/bin:$PATH
ENV LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH

RUN apt-get update && apt-get install -y \
    sudo \
    wget \
    gnupg \
    software-properties-common \
    apt-utils \
    g++ \
    freeglut3-dev \
    build-essential \
    libx11-dev \
    libxmu-dev \
    libxi-dev \
    libglu1-mesa \
    libglu1-mesa-dev \
    python3-pip \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip setuptools wheel packaging

RUN pip3 install torch==2.1.0 torchvision==0.16.0 torchaudio==2.1.0 --index-url https://download.pytorch.org/whl/cu121

RUN pip3 install causal-conv1d==1.0.2

WORKDIR /app

COPY . /app

RUN grep -v "causal-conv1d" requirements.txt > requirements_filtered.txt || cp requirements.txt requirements_filtered.txt

RUN pip3 install --no-cache-dir -r requirements_filtered.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]