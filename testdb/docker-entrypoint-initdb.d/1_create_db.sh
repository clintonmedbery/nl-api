#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL

CREATE USER dbadmin WITH PASSWORD 'test_password';

CREATE DATABASE nuleaf WITH OWNER=dbadmin
                                  LC_COLLATE='en_US.utf8'
                                  LC_CTYPE='en_US.utf8'
                                  ENCODING='UTF8'
                                  TEMPLATE=template0;
EOSQL