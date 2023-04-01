#!/bin/bash
export CF_Key=
export CF_Email=
./acme.sh --register-account -m info@binaries.website
./acme.sh --issue --dns dns_cf -d binaries.website -d *.binaries.website --cert-file $PWD'/../docker/nginx/certs/domain-cert.pem' --key-file $PWD'/docker/nginx/certs/domain.key' --ca-file $PWD'/docker/nginx/certs/domain-ca.pem' --fullchain-file $PWD'/docker/nginx/certs/domain.crt' --force >> $PWD/letencrypt/renew.sh
