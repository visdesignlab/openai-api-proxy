# OpenAI API Proxy
A simple proxy server for the OpenAI API using Express.js. This server forwards requests to the OpenAI API and returns the responses, allowing you to avoid exposing your API key in client-side applications.

## Deployment
You can deploy this server using Docker using the following steps:
1. Copy the `.env.example` file to `.env` and set your OpenAI API key and CORS origin(s).  
   `CORS_ORIGIN` supports comma-separated values (for example: `http://localhost:3000,http://localhost:8080`) or a JSON array string.
2. Build and run the Docker container using Docker Compose:
    ```bash
    docker compose up -d --build
    ```
3. The server will be accessible at `http://localhost:3000`.

## Usage
You can send POST requests to the `/v1/chat/completions` endpoint with the same body format as the OpenAI API. For example:
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```
The server will forward this request to the OpenAI API and return the response.
