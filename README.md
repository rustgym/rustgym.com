# rustgym.com

## create .env file at the root directory
```
DATABASE_URL=postgresql://postgres:password@localhost/rustgym_alpha
PORT=8080
DOMAIN=localhost
SENDGRID_API_KEY=SG.api.key
URL_PREFIX_FOR_EMAIL=http://localhost:8080
NOREPLY_EMAIL_ADDRESS=noreply@rustgym.com
EXPIRATION_IN_MINUTES=10
WELCOME_EMAIL_TEMPLATE_ID=d-template-id
LOCAL_SALT=ABCDEFGHIJKLMNOPQRSTUVWXYZ123456
```
## build container and run
change localhost to host.docker.internal in .env file to run container on mac
```
$ docker build .
$ docker run -p 8080:8080 --rm --env-file=.env {image-id}
```

## run dev server with nginx
```
$ ./dev.sh
```