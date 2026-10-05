# Watchful-Eye

## Explanation of choosing the database

I chose MongoDB because we don't need strictness or direct links between tables here—just a simple table with no relationship to other tables.

## Which HTTP status codes are used

- 200 OK, for a successful general operation
- 201 Created, for response in post alert that create a new alert
- 400 Bad Request, for error in validations of the body because of code 400 is for invalid request message framing
- 404 Not Found, if alert is not found by id
- 500 Internal Server Error, for General response to issues arising on the server

## Invalid input rules

In the event of invalid input or a missing field, a response is returned from the server = status 400 and json in formt {success:false,message:"error message"}
