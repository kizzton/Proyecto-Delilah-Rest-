# Proyecto-Delilah-Rest
El objetivo del proyecto Delilah Restó es emular la tarea de un desarrollador backend.

## Objetivo
Realizar Backend creando una API rest que permita realizar pedidos a un restaurante llamado Delailah Resto
## Tecnologías utilizadas
* Node.js (v12.13.0)
* Express
* JWT 
* MySQL
* Sequelize
* Postman para testear los endpoints
* Swagger para crear documentación

**opcional:** _puede instalar **nodemon** como entorno de desarrollo para un reinicio automático del servidor_
  
  `npm install nodemon --save-dev`
  
---

## Iniciando
### 1-Primeros pasos
* Clonar Repositoio

Abrir terminal en la carpeta donde se va a clonar el proyecto y escribir el siguiente comando: 

`git clone https://github.com/kizzton/Proyecto-Delilah-Rest-/ `

y presione Enter.

### 2- Instalación de paquetes:

Las dependencias se instalan con el siguiente comando:

`npm install`

### 3- XAMPP:

Instalar XAMPP o algún otro sistema de gestión de base de datos MySQL. Se puede descargar e instalar en https://www.apachefriends.org/es/index.html.

En XAMPP se debera tener activado los módulos Apache y MySQL para poder realizar consultas a la base de datos. 

**obs:** _si utiliza otra herramienta realizar las operaciones equivalentes, por ej. **mysqlworbench** no requiere tener activo Apache_  

### 4- Cargar Base de datos

La misma se encuentra en la carpeta db con el nombre **delilah_resto_db**, cuenta con datos de usuarios (1 admin y 2 users) y productos
listos para realizar las consultas que precise. 

Puede ser ejecutada desde su gestor preferido o bien por consola

### 5- Iniciando Servidor

Es momento de comenzar!! 

por consola nos posicionamos en la carpeta correspondientes y ejecutamos:

  `npm start`

o _Si tiene nodemon instalado_

  `npm run dev`       

Listo para realizar las consultas

## Consultas

### Endpoint Users
CREAR USUARIO

`POST /users`

Ejemplo de peticion

rol : (1: Admin, 0: User)

**obs:** _el rol es optativo por defecto sera user en el ejemplo le agregaremos is_admin para generar un usuario admin_

```
{  

    "username": "superUser",
    "fullname": "Miguel Calle",  
    "email": "miguelcalle@mail.com",  
    "phone": "0123456789",
    "adress": "Calle Falsa 123",
    "password": "pass0123",
    "is_admin": 1                  

}
```

Respuesta

```
{ message: 'User created successfully.' }
```

POST `/login`

Ejemplo

```
{  
  "username": "bootUser",
  "pass": "abc123"                
}
```

Respuesta

```
{
  "message": "Logged in successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZnVsbG5hbWUiOiJ...."
}
```

VALIDAR USUARIO PARA REALIZAR UNA PETICIÓN 

Ejemplo

`POST /products`


En **Header** configurar **"KEY"** como **"Authorization"** y en **"VALUE"** colocar **"Bearer "** y el **"token"** correspondiente.

**obs :** _dejar espacio entre el **bearer** y el **token**_

Respuesta


```
[
    {
        "id": 7,
        "product_name": "Hamburguesa Clasica",
        "description": null,
        "price": 350,
        "product_image": null
    },
    {
        "id": 8,
        "product_name": "Sandwich Veggie",
        "description": null,
        "price": 310,
        "product_image": null
    }
]    
```
---

## Open API

Para más información, ingresar al siguiente enlace [docuAPI](https://app.swaggerhub.com/apis/kizzton/Proyecto_Delilah_Resto/1.0.0) donde encontrara toda la documentacón necesaria o abrir archivo openapi.yml del repositorio

