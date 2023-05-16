#!/bin/bash
export CF_Key=
export CF_Email=
./acme.sh --register-account -m info@binaries.site
./acme.sh --issue --dns dns_cf -d binaries.site -d *.binaries.site --cert-file $PWD'/certs/domain-cert.pem' --key-file $PWD'/certs/domain-key.key' --ca-file $PWD'/certs/domain-ca.pem' --fullchain-file $PWD'/certs/domain-fullchain.pem' --force >> $PWD/letencrypt/renew.sh
