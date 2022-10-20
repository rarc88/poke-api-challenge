# Poke API Challenge - Backend

API construida en el framework **NestJS** para el entorno en tiempo de ejecución **NodeJS**, para el almacenamiento persistente de la información se escogió **MongoDB + Mongoose**.

## Instalación de dependencias

    npm i

## Variables de entorno

Si se encuentra en modo desarrollo haga una copia del archivo .env.example con el nombre .env y asigne el valor de cada variable según su entorno.

Para producción tome como ejemplo el archivo .env.example y cree cada una de las variables de entorno que aparecen en el, en caso de que falte alguna o tenga un tipo de dato incorrecto el API esta preparada para indicar el error al momento de iniciar el proyecto.

## Iniciar proyecto en modo desarrollo

    npm run start:dev

## Compilar e iniciar proyecto en modo producción

    npm run build
    npm run start:prod

## Datos iniciales

Una vez iniciada la API se puede correr el script command.sh (en caso de que se desee) para generar datos iniciales en la base de datos.

    sh command.sh

Esto creara un usuario **test** con clave **12345** y descargara de la API https://pokeapi.co/api/v2/pokemon los 10 primeros pokemons con información extra.

## Documentación del API

Se utilizo swagger para documentar los endpoints de esta API, puede ser accedido a través del endpoint **/api/docs**
