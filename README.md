# Watchful-Eye

## Explanation of choosing the database

I chose MongoDB because we don't need strictness or direct links between tables here—just a simple table with no relationship to other tables.

## Which HTTP status codes are used

- 400 Bad Request, for error in valid body because of code 400 is for invalid request message framing
- 500 Internal Server Error, for General response to issues arising on the server because of code 500 is for these errors
