FROM node:12
WORKDIR /www

COPY package.json yarn.lock tsconfig.json /www/
RUN yarn

EXPOSE 3000
EXPOSE 35729
ENV PORT 3000
ENV REACT_APP_API_URL=http://localhost:8000

CMD yarn start
