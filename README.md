# Watchful-Eye

## Explanation of choosing the database

I chose MongoDB because we don't need strictness or direct links between tables here—just a simple table with no relationship to other tables.

## Which HTTP status codes are used

- 200 OK, for a successful general operation
- 201 Created, for response in post alert that create a new alert
- 400 Bad Request, for error in validations of the body because of code 400 is for invalid request message framing
- 401 Unauthorized, This occurs when there is no token or the token has expired, resulting in a lack of authorization.
- 403 Forbidden, In the event that he does not have the specific authorization required for the role.
- 404 Not Found, if alert is not found by id
- 409 Conflict, To handle cases where a user with such a username already exists, thereby preventing duplicates and issues.
- 500 Internal Server Error, for General response to issues arising on the server

`A 401 Unauthorized is similar to the 403 Forbidden response, except that a 403 is returned when a request contains valid credentials, but the client does not have permissions to perform a certain action, And 401 error means the token is invalid, so there is no authorization at all..`

## Invalid input rules

In the event of invalid input or a missing field, a response is returned from the server = status 400 and json in formt {success:false,message:"error message"}
