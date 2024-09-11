FROM node:18
EXPOSE 5173
WORKDIR /home/Downloads/Formulario\ de\ Dados/Front-End/formulario-de-dados/
COPY package*.json ./
COPY . .
RUN npm install
CMD [ "npm", "run", "dev" ]