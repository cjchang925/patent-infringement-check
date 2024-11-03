# Patlytics Take-Home: Patent Infringement Check App

You can run this app locally by following the steps below, or view the [live demo](http://140.113.160.136:3300) hosted on my server. Please note that the demo site does not support HTTPS, so it’s recommended to view it using Chrome.

## Running Locally

Note: To test the application, you’ll need a Gemini API key. You can obtain an API key [here](https://aistudio.google.com/app/apikey).

Clone the repository from GitHub:

```bash
git clone git@github.com:cjchang925/patent-infringement-check.git
```

Next, create a `.env` file in the backend folder to store the Gemini API key, then start the Docker Compose services:

```bash
cd patent-infringement-check/backend
echo "API_KEY={YOUR_API_KEY}" > .env
cd ..
docker compose up -d
```

The app will then be accessible at [http://localhost:3000](http://localhost:3000).

## Assumptions and Features

Given development time constraints, the app assumes inputs are valid. However, inputs do not need to exactly match those in the JSON files. For instance, entering "target" will automatically be interpreted as "Target Corporation," and "re49889" will be parsed as "US-RE49889-E1" to improve usability.

Additionally, the app allows saving a single analysis report, which is accessible on the search page.
