FROM node:12 as build
WORKDIR /www

COPY . /www/
RUN npm install
RUN npm build
RUN npm prune --production

EXPOSE 3000
EXPOSE 35729
ENV PORT 3000
ENV REACT_APP_API_URL=https://dbdv.pieterswentholt.com

ENV NODE_ENV production

RUN pwd
RUN ls

FROM nginx
COPY --from=build /www/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]