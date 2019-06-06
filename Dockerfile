FROM node:10

WORKDIR /usr/src/app/

COPY package*.json ./

COPY package*.json ../backend/

RUN npm install 

RUN npm --prefix ../backend install ../backend/

COPY . .

COPY . ../backend

EXPOSE 3000

# need to make the script to run backend too
CMD ["npm", "docker"]