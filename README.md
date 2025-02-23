use unbutu + docker

create backend  nodejs  ESM
log write
add jsonwebtoken : refres token + access token
authenticate, authorize
connect mongodb

init:
  npm install
open terminal unbutu :
  docker pull mongo
  docker run -d --name mongodb_container  -p 27017:27017  -e MONGO_INITDB_ROOT_USERNAME=admin  -e MONGO_INITDB_ROOT_PASSWORD=admin123 -e MONGO_INITDB_DATABASE=mydatabase  mongo
run :
    npm run dev
