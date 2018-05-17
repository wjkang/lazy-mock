FROM daocloud.io/node
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build
RUN cp -r src/db dist/
CMD ["npm","run","production"]
 
EXPOSE 3000