# Development

This integration focuses on [Zoom](https://zoom.us/) and is using
[Zoom API](https://marketplace.zoom.us/docs/api-reference/zoom-api) for
interacting with the Zoom resources.

## Provider account setup

This integration requires a Zoom
[OAuth](https://marketplace.zoom.us/docs/guides/build#oauth)
[Account-level app](https://marketplace.zoom.us/docs/guides/build#account-level-user-managed-apps).

### Follow these steps to create the necessary Zoom app:

1. Register for a Zoom account. A pro account is not required but some resources
   may not be ingested without it.

2. Go to [Create App](https://marketplace.zoom.us/develop/create) page on Zoom
   Marketplace and click 'Create' under the OAuth app type.

3. Enter an app name and choose the 'Account-level app' option. The publish app
   option will depend on your needs.

4. Take note of your `Client ID` and your `Client secret` and supply it to the
   [oauth-server's .env](../oauth-server/README.md).

5. Enter 'http://localhost:5000/redirect' to the Redirect URL for OAuth.

6. Add 'http://localhost:5000/redirect' to the OAuth allow list.

7. Supply the required information.

8. On scopes, add `group:read:admin`, `role:read:admin`, and `user:read:admin`.

9. The app is now ready. Proceed to authentication to generate your
   `ZOOM_ACCESS_TOKEN`.

## Authentication

To start the integration, we need to provide a `ZOOM_ACCESS_TOKEN` to our
`.env`. Luckily, we have supplied an [oauth-server](../oauth-server) to get the
token for us. Please follow the OAuth server's
[README.md](../oauth-server/README.md) to generate the access token. Once that's
done, you should now be able to start contributing to this integration. The
integration will pull in the `ZOOM_ACCESS_TOKEN` variable from the `.env` file
and use it when making requests.
