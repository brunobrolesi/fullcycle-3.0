FROM golang:1.18.1-alpine as builder

WORKDIR /usr/src/app

COPY ./src .

RUN go build -o bin/hello

FROM scratch

COPY --from=builder /usr/src/app/bin .

ENTRYPOINT ["./hello"]