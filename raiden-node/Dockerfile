FROM ubuntu:latest

WORKDIR /raiden

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install make python g++ bash curl -y
# RUN apk add git python make g++ bash curl

RUN curl -L https://github.com/raiden-network/raiden/releases/download/v1.1.0/raiden-v1.1.0-linux-aarch64.tar.gz --output raiden.tar.gz
RUN tar -xzf raiden.tar.gz
RUN mv raiden-v1.1.0-linux-aarch64 raiden
RUN chmod +x raiden

ADD ./keystore /raiden/keystore
ADD ./password.txt /raiden/password.txt
ADD ./Makefile /raiden/Makefile

# Run an empty command by default - to keep container running
CMD make start
