# Goval client

Goval is a client for the GoVal database. It is a tool to query the GoVal database and get information about vulnerabilities in Go packages.

Goval is a Key-Value database that stores information in memory and persists it to disk. The caching mechanism allows for fast access to the data less than 1ms.

## Features

- Connection to the GoVal database
- Query
  - GET a key from the database
  - SET a key value pair in the database
  - DELETE a key from the database
  - INCR increment a key in the database (only for integer values)
  - DECR decrement a key in the database (only for integer values)
  - VERSION get the version of the database
  - AUTH authenticate to the database

## Security

Be aware that at the time of the v1 release, the GoVal database doesn't provide TCP/TLS encryption. This means that all data sent to the database is sent in plain text. This is a security risk and should be taken into consideration when using the GoVal database.
