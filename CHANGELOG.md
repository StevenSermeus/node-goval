# @goval/node-goval

## 1.0.0

### Major Changes

- b547465: Support for all the feature of V1 GoVal database

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

## 0.2.0

### Minor Changes

- 77720f2: Int support and INCR and DECR command

## 0.1.0

### Minor Changes

- 6f9442a: Basing Goval Client
