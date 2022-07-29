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

2. Go to [Build App](https://marketplace.zoom.us/develop/create) page on Zoom
   Marketplace and click 'Create' under the Server-to-Server OAuth app type.

3. Enter an app name to begin creation.

4. Take note of your `Account ID`, `Client ID`, and `Client secret` and supply
   it to the .env file.

5. Supply the required information for each section. Zoom will prompt you if any
   required fields are omitted.

6. On scopes, add `group:read:admin`, `role:read:admin`, `user:read:admin`, and
   `account:read:admin`. If you cannot or choose not to provide all the listed
   scopes the steps requiring the missing scopes will be disabled.

7. On the final screen once all required information has been provided, an
   `Activate your app` button will appear. Click it to complete app creation.

## Authentication

To start the integration, we need to provide the ACCOUNT_ID, CLIENT_ID, and
CLIENT_SECRET from the server-to-server oauth app creation. Once this has been
provided in the .env file, the integration will be able to authenticate and run.
