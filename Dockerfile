FROM alpine:3.9.6
# FROM alpine:3.6

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    apk add mongodb && \
    mkdir /app && \
    mkdir /data && \
    mkdir /data/db && \
    npm install nodemon@2.0.4 -g

WORKDIR /app

COPY ./ .

RUN chmod +x start.sh && \
    npm i

EXPOSE 5300

CMD ["./start.sh"]
