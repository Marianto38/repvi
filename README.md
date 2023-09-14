# REPVI

REPVI es un proyecto de software web diseñado para proporcionar una experiencia de usuario intuitiva y eficiente en el ámbito de la seguridad vial, está dirigida a individuos interesados en mantenerse informados y reportar cualquier novedad relacionada con el tráfico y la seguridad vial en su entorno cercano.

#### Aspectos destacados para los Usuarios

- Información en Tiempo Real: REPVI proporciona acceso instantáneo a datos precisos sobre el tráfico, accidentes, incidentes, restricciones, pico y placa, cierres viales, estados de las vias, construcciones en carreteras y otros eventos viales que puedan afectar su trayecto diario. Mantenter al usuario al tanto de lo que está sucediendo en tiempo real.

- Reporte de Incidentes:  Cada usuario hace parte activa de la comunidad vial. Con REPVI, puede reportar fácilmente cualquier incidente que observe en la carretera.

- Comunidad Consciente: Fomentamos la colaboración Con REPVI, los usuarios podrán conectarse con otros usuarios preocupados por la seguridad vial en su área y compartir consejos y recomendaciones comentando sus publicaciones

## Caracteristicas/Funcionalidades

- Consultar, Editar, Agregar y eliminar publicaciones
- Guardar publicaciones como favoritas
- Formularios sencillos

## Demo

Insert gif or link to demo


## Instalación

### Requisitos previos:
-Asegurarse de tener instalado **Node js**, puede correr el comando en su terminal
   ```sh
   node js -v
   ```
En caso de no tener node instalado puede instalarlo con el comando:
   ```sh
   npm install node
   ```
### Proceso de instalación

1. Clonar el proyecto repvi
   
   -Asegurarse de crear una carpeta en su directorio antes de correr el siguiente comando
   ```sh
   git clone https://github.com/Marianto38/repvi.git
   ```
   -Abrir el proyecto instalado
     ```sh
   cd repvi
   ```
2. Instalación de paquetes y dependencias
   ```sh
   npm install
   ```
3. Abrir el proyecto en su editor, en caso de estar usando VSC
   ```sh
   code .
   ```
4. Iniciar el servidor de desarrollo
   ```sh
   npm start
   ```

### Generalidades
## Esta aplicación web, está construida con las tecnologías:

- React Js: Para la construcción de la interfaz de usuario.
- React Router Dom: Para el enrutamiento de la aplicación web.
- SASS: Como preprocesador de CSS.
- Axios: Para las solicitudes POST, PATCH y  DELETE en el consumo de la API.
- Git: Para el control de versiones.
- GitHub: Para rastrear y administrar diferentes versiones del código fuente, alojar el repositorio del código del proyecto de manera remota.
- Material UI: Para el uso de componentes predefinidos y personalizarlos.
- Sweetalert2: Para el manejo de alertas y confirmaciones.
- Hook Form: Para el manejo de formularios.
- Yup: Para el manejo de validaciones


<div align="center"> 
  <h2>Vistas Principales</h2>
  <img width="100%" height="auto" src="" height="175px"/>
  <img width="100%" height="auto" src="" height="175px"/>
  <img width="100%" height="auto" src="" height="175px"/>
</div>

## Despliegue

### Requisitos previos:
-Asegurarse de tener instalado **Docker**, puede correr el comando en su terminal
   ```sh
   docker -v
   ```
-Si no tiene docker instalados seguir los pasos para su instalación de acuerdo a la documentación

[instalar docker](https://docs.docker.com/desktop/install/windows-install/)
### Dockerización de la aplicación

-Ubicarse en el directorio raíz del proyecto y correr el siguiente comando:

1. Iniciar la construcción de la imagen:
   ```sh
   docker build -t repvi .
   ```
   
3. Levantar la imagen, elige el puerto disponible en tu local, por defecto se levantará en el 3000
   ```sh
   docker run -d -p 3000:3000 repvi
   ```

4. Abrir una nueva  pestaña del navegador e ingresar el puerto seleccionado en el paso anterior 
   ```sh
   localhost:3000
   ```



