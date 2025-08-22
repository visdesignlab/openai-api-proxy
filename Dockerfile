# Dockerfile to build the OpenAI API proxy server
# The environment vars will be privded at run time, not build time and must be used in the command
FROM node:lts-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY index.js ./
EXPOSE 3000
CMD ["sh", "-c", "OPENAI_API_KEY=${OPENAI_API_KEY} CORS_ORIGIN=${CORS_ORIGIN} node index.js"]

# To build the Docker image, use the command
# docker build -t openai-api-proxy .

# To run the Docker container, use the command
# docker run -d -p 3000:3000 
