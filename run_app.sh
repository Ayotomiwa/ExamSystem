#!/bin/sh
cd app-api
java -Dspring.profiles.active=prod -jar target/examsystem-0.0.1-SNAPSHOT.jar
