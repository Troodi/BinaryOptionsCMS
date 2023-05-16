certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n "binaries.site" -i $PWD'/../nginx/certs/domain.crt'
