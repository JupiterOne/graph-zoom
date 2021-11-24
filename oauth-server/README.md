# Zoom OAuth server

Zoom OAuth applications need an OAuth token for authorization. For the following
instructions, it is assumed that an OAuth app has already been created. For
instructions how to create one, see Zoom's
[Create an OAuth app](https://marketplace.zoom.us/docs/guides/build/oauth-app#create-an-oauth-app).

## Steps to get an OAuth token

1. Supply your `CLIENT_ID`, and `CLIENT_SECRET` from your OAuth app's
   credentials to the `.env`. Make sure `http://localhost:5000` is an allowed
   redirect in your app. See [.env.example](./env.example) as reference

2. Run `$ yarn start` and go to `http://localhost:5000` on your browser

3. Click on the link and authorize your account

4. Take note of the `access_token` in the response which will be needed on the
   main integration
