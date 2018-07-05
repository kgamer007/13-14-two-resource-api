![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 13: Two-Resource Resource Mongo and Express API
===
[![Build Status](https://travis-ci.org/kgamer007/13-14-two-resource-api.svg?branch=master)](https://travis-ci.org/kgamer007/13-14-two-resource-api)

## Heroku 
https://two-resource-mongo.herokuapp.com/

## Overview

The cats api provides an interface to a database of cats and kittens. Basically a personal list of cats and kittens, with properties such as name, first name, last name, id (which is given by mongoDB)

MongoDB is used to provide persistent storage for cat/kitten data.

## Request endpoints:

#### cat.post()

`cat.post()` is how we send new data to MongoDB.  
If no database is available then server will display a 400 error.   
If the new data is posted successfully to MongoDB, the server will display a 200 message

#### cat.put() 

`cat.put()` is how we update existing data to MongoDB. 
If the new data is updated successfully to MongoDB the server will display a 200 message
If there is no data available to update, the server will send a 400 status code or a 404 if there is no cat to update. 

#### cat.get()

`cat.get()` is how we send retrieve data from MongoDB.  
If no database is available to receive the new data we've attempted to send, the server will display a 404 error.
If new data is retrieved successfully from MongoDB the server will display a 200 message.

#### cat.delete() 

`cat.delete()` is how we delete data from MongoDB.  
If no database is available to receive the new data we've attempted to delete, the server will display a 404 error 
If there is no specific id available in the database to delete, the server will display a 400 error and error message will read 'DELETE' 
If the new data is deleted successfully to MongoDB the server will display a 200 message

#### kitten.post()

`kitten.post()` is how we send new data to MongoDB specifically for the kittenSchema.  
If there is no database available to receive new data, the server will display a 400 error 
If the new data is posted successfully to MongoDB, the server will display a 200 message 

#### kitten.put() 

`kitten.put()` is how we update existing kittenSchema data on MongoDB. 
If the new data is updated successfully to MongoDB the server will display a 200 message 
If there is no data available to update, the server will send a 400 status. 

#### kitten.get()

`kitten.get()` is how we retrieve data for the kittenSchema from MongoDB.  
If there is no database available to receive the new data we've attempted to send, the server will display a 404 error  
If the new data is retrieved successfully from MongoDB the server will display a 200 message

#### kitten.delete() 

`kitten.delete()` is how we delete data from MongoDB.  
If there is no database available to delete the data we've attempted to delete, the server will display a 404 error 
If there is no specific id available in the database to delete, the server will display a 400 error 
If the new data is posted successfully to MongoDB the server will display a 200 message and the message will read 'DELETE - responding with a 200 status code'.

