---
"@goval/node-goval": major
---

Support for all the feature of V1 GoVal database

- Connection to the GoVal database
- Query
  - GET a key from the database
  - SET a key value pair in the database
  - DELETE a key from the database
  - INCR increment a key in the database (only for integer values)
  - DECR decrement a key in the database (only for integer values)
  - VERSION get the version of the database
  - AUTH authenticate to the database

BE AWARE THAT AT THE TIME GOVAL DOESN'T PROVIDE TCP/TLS ENCRYPTION. THIS MEANS THAT ALL DATA SENT TO THE DATABASE IS SENT IN PLAIN TEXT. THIS IS A SECURITY RISK AND SHOULD BE TAKEN INTO CONSIDERATION WHEN USING THE GOVAL DATABASE.
