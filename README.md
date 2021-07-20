# SoPost Open API Banner Ad

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

This app is a small web app which can be deployed easily to [Render](https://render.com/deploy). It is primarily javascript, and uses the SoPost API to create a user flow for claiming a product sample. It is intended to be used as a banner ad served via ad networks.

## Setup

1. Create a new branch, or fork from this repository. Configure your web application in `sopost_configuration.ex`. There is documentation within this module which describes what each value does.
2. Click the Deploy to Render button!
3. Set up your environment variables, including your SoPost API user ID and password. A google API key can optionally be provided, which adds a google address search input to the form for quick, easy address lookup. 

### WARNING: Your Google API key will be visible on the front end. In order to use this safely within this application, you should ensure you add suitable restrictions to your Google API key here: https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions


## Additional Information

- This application does not do anything to prevent an individual submitting more than one order at this point in time. A user is rate limited, by IP address to a certain number of requests against the SoPost API. This will prevent an excessive number of orders placed by one individual, and also reduce the number of API requests that it is possible to make.
- This is currently restricted to GBR SoPost activities only.
