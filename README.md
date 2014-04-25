# EPNvsInternet

Cómo lo vio en la pared del Senado! Un app para mostrar tuits sobre un hashtag en tiempo real.

## Antes de empezar

Tenemos que crear un app de [Twitter](http://dev.twitter.com) y copiar el archivo `config.default.json` a `config.json`

## Config.json

```json
// Copiamos esto a config.json y creamos nuestro app de tuiter en http://dev.twitter.com
// Todas las líneas que empiezan con "//", incluyendo estas deben de ser borradas
// antes de comenzar la aplicación!
{
    "twitter": {
        "consumer_key": "",
        "consumer_secret": "",
        // Para esto, debemos de crear el access_token de nuestra aplicación!
        "access_token": "",
        "access_token_secret": ""
    },
    // Los hashtags que queremos trackear
    "hashtags":[
        "epnvsinternet",
        "internetvsepn",
        "nomaspoderalpoder"
    ],
    // El puerto en el correrá la aplicación, por default 6547 (opcional)
    "port": 6547,
    //El título de nuestra campaña
    "titulo": "#EPNvsInternet"
}
```

## Y luego?

Bien fácil:

```shell
npm install
node app.js
```
