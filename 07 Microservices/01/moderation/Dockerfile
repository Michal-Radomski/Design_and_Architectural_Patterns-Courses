# Todo: Add dependencies/ devDependencies to package.json

FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run" "dev"]
