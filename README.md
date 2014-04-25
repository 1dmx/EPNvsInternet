# EPNvsInternet

Cómo lo vio en la pared del Senado! Un app para mostrar tuits sobre un hashtag en tiempo real.

## Antes de empezar

Tenemos que crear un app de [Twitter](http://dev.twitter.com) y copiar el archivo `config.default.json` a `config.json`

## Config.json

Copiamos esto a config.json y creamos nuestro app de tuiter en http://dev.twitter.com
Todas las líneas que empiezan con `//`, deben de ser borradas antes de comenzar la aplicación!

```json
{
    "twitter": {
        "consumer_key": "",
        "consumer_secret": "",
        "access_token": "",
        "access_token_secret": ""
    },
    "hashtags":[
        "epnvsinternet",
        "internetvsepn",
        "nomaspoderalpoder"
    ],
    "port": 6547,
    "titulo": "#EPNvsInternet"
}
```

Dónde `twitter` son las llaves de tu aplicación de tuiter,

`hashtags` los HT que queremos monitorear,

`port` (opcional), el puerto en el que queramos correr la aplicación, y

`titulo`, el título de nuestra campaña

## Y luego?

Bien fácil:

```shell
npm install
node app.js
```
