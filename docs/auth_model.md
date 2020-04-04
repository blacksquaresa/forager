# Authentication Model

Forager will use [Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in) for user authentication. All the known users of the platform have Google accounts, so for the initial development, this seems most efficient.

The flow goes something like this:

- User clicks "Sign In", whether they are a new or existing user.
- Forager sends them to Google Sign In.
- User authenticates with Google.
- User gives permission for Forager to use their details (new users only - Google will remember).
- Google Sign In redirects back to Forager with a token.
- Forager client sends login request to server with token.
- Server authenticates the token with Google Sign In.
- Find user in our database based on email address from Google.
  - If no user is found, adds user.
- Creates session token, stores it in a session bag with a 20 minute expiry, returns a successful login response, including the token.
- All future requests include the token
  - Each check restarts the 20 minute expiry

```mermaid
sequenceDiagram
participant User
participant Client as Forager Client
participant Server as Forager Server
participant Google as Google Sign-In
activate Client
User ->> Client: clicks "Sign In"
activate Google
Client ->> Google: redirects to Google
deactivate Client
User ->> Google: Signs in
User ->> Google: Gives permission
activate Client
Google ->> Client: redirects with auth token
deactivate Google
activate Server
Client ->> Server: logs in with token
activate Google
Server ->> Google: authenticates token
deactivate Google
Server ->> Server: creates session token
Server -->> Client: login success with token
deactivate Server
Client ->> User: displays success
deactivate Client
opt Every Subsequent Request
Client ->>+ Server: request with session token
Server ->> Server: authenticate and refresh token
Server -->>- Client: response
end
```
