FROM node:12
WORKDIR /www

COPY package.json package-lock.json tsconfig.json /www/
RUN npm install

EXPOSE 3000
EXPOSE 35729
ENV PORT 3000
ENV REACT_APP_API_URL=http://localhost:8000

CMD npm start
