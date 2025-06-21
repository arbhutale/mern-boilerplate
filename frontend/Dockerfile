FROM node:18

WORKDIR /app

COPY package*.json ./
# Ensure devDependencies like nodemon are installed
ENV NODE_ENV=development

RUN npm install --include=dev

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
