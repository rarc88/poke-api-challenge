
# Poke API Challenge

Reto frontend y backend con temática de Pokemon.

## Observaciones

Cada proyecto se encuentra es su respectivo directorio, se versionó en un solo repositorio porque así lo indican en las pautas de reto.
Los directorios contienen su propio README.md con las instrucciones de como instalar las dependencias y de ejecución.

## Acceso al deploy

Adicionalmente, el proyecto fue subido a un EC2 de AWS y puede ser accedido a través de los siguientes enlaces:

 - **Frontend**:  ec2-18-221-239-57.us-east-2.compute.amazonaws.com
 - **Backend**:  ec2-18-221-239-57.us-east-2.compute.amazonaws.com:4000/api/v1

## Levantar entorno local con Docker

En el caso de que esté familiarizado con docker tendrá disponible un script docker-compose.yml en la raíz del repositorio con todas las configuraciones necesarias para hacer funcionar todo con una sola instrucción, tan solo ejecute (en la ubicación del script):

    docker-compose up -d
