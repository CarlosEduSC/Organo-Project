FROM node:18
EXPOSE 5173
WORKDIR /home/carlos.campos/Downloads/Organo-Project/Front-End
COPY package*.json ./
COPY . .
RUN npm install
CMD [ "npm", "run", "dev" ]