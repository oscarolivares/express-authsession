# express-authsession

Authentication and session manager with express

- Signup
- Login
- Login with remember option (Sets the session expiration to 30 days)
- Logout
- Protected routes
- Password encryption before save

To use, frist define these variables in your .env file:

    ## .env

    # server port number
    PORT=3000

    # DB connection URI
    DB_URI=mongodb://localhost/authsessionTest

    # Session encryption secret
    SECRET=secret

    # Number of rounds for Blowfish algorithm for hashing user password
    BCRYPT_ROUNDS=12

Then run

    $ yarn install
    $ yarn start
