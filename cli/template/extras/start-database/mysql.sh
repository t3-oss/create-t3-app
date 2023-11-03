#!/bin/bash

DB_CONTAINER_NAME="project1-mysql"

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# import env variables from .env
set -a
source .env

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker start $DB_CONTAINER_NAME
  echo "Database container started"
else
  echo "Did not find database container. Creating a new container..."
  docker run --name $DB_CONTAINER_NAME -e MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD -e MYSQL_DATABASE=project1 -d -p 3306:3306 docker.io/mysql
  echo "Database container created and started"
fi

