# README

## IMPORTANT
This is very old and buggy. Have fun :)

## Running 
For simplicities sake this repo uses Docker to run 
an Nginx webserver you can use anything that hosts static HTML, CSS, and JS 
(if you want you can even host this on something like firebase)

```bash
docker build -t webserver .
docker run -it --rm -d -p 8080:80 --name web webserver
```

go to `http://localhost:8080`
