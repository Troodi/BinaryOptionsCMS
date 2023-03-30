openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $PWD'/../nginx/certs/domain.key' -out $PWD'/../nginx/certs/domain.crt' -config openssl.conf
