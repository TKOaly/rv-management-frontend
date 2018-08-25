#!/bin/sh
docker run -p 5001:5000 -d --env-file=.env --name rv-management-container rv-management-frontend
