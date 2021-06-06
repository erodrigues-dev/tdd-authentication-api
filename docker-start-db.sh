docker run --name nodeauthdb \
-e POSTGRES_USER=docker \
-e POSTGRES_PASSWORD=docker \
-p 5432:5432 \
-d postgres
