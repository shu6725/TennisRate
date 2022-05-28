FROM --platform=linux/x86_64 nikolaik/python-nodejs:latest

ENV PYTHON_VERSION 3.7.1
ENV HOME /root
ENV PYTHON_ROOT $HOME/local/python-$PYTHON_VERSION
ENV PATH $PYTHON_ROOT/bin:$PATH
ENV PYENV_ROOT $HOME/.pyenv

COPY requirements.txt .

RUN apt-get update
RUN apt-get install -y locales vim tmux
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install -r /app/requirements.txt

ENV TZ Asia/Tokyo
WORKDIR /app
