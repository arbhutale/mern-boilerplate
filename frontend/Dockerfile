FROM --platform=linux/arm64 node:20-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

ENV NODE_ENV=development
ENV ROLLUP_NO_NATIVE=true 

RUN npm install -g pnpm && pnpm install
# RUN npm install @nextui-org/react@latest --lega

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
