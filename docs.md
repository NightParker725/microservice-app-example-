# Microservice App – Taller de DevOps

- Jhon Alexander Lamus Mora - A00372128
- David Henao Salazar - A00394033

## Descripción General
**Taller 1: Automatización de Infraestructura con Pipelines**.  
- Automatización con **pipelines CI/CD**.  
- Estrategias de branching.  
- Patrones de diseño en la nube (**Cache-Aside** y **Circuit Breaker**).  
- Despliegue local con **Docker Compose** y **Jenkins (Jenkins al final no sirvió debido a problemas en los jobs**.  

---

## Metodología Ágil
Se usó un **Scrum simple**:
- **Iteraciones (sprints)** de 2 a 3 dias.  
- **Roles, no habian definidos perse, todos haciamos todo**
- **Artefactos**: backlog = cada sprint entregó un incremento (infraestructura lista, pipeline corriendo, despliegue funcionando, WIP).  

---

## Estrategia de Branching
- **Desarrollo**:  
  - Rama única `master`.  
  - Todos los cambios se integran allí con commits descriptivos.  

- **Operaciones**:  
  - Archivos de infraestructura (`docker-compose.prod.yml`, `deploy/local_deploy.sh`, `Jenkinsfile`) también viven en `master`.  
  - Esto asegura que aplicación e infraestructura estén siempre sincronizadas.  

---

## Patrones de Diseño
- **Cache-Aside**: permite mejorar rendimiento consultando primero la caché antes de ir a la base de datos.  
- **Circuit Breaker**: evita fallos en cascada; si un microservicio falla de forma repetida, se abre el circuito y responde con error controlado.  

---

## Arquitectura
La aplicación está compuesta por los siguientes microservicios:
- **auth-api** → autenticación y autorización.  
- **users-api** → gestión de usuarios.  
- **todos-api** → gestión de tareas.  
- **log-message-processor** → procesamiento de logs.  
- **frontend** → interfaz web.  

## PIPELINES CI/CD en GitHub Actions

pipelines se definen en `.github/workflows/ci-cd.yml`.

### Estructura del trabajo

#### `build-test`
- Compila y valida cada microservicio en su pila correspondiente.
- Comprueba las dependencias (`npm install`, `pip install`, `mvn package`, `go build`).
- Incluye un servicio Redis para pruebas de integración.

#### `docker-build-push`
- Crea imágenes de Docker para cada servicio.
- Se autentica con Docker Hub mediante `DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN`.
- Publica imágenes con la etiqueta `latest`.

#### `deploy`
- Inicia la aplicación con `docker-compose.prod.yml`.
- Simula un entorno de producción. - Se ejecuta solo si los pasos anteriores se realizan correctamente.

---

## Secrets de GitHub requeridos

Los siguientes secretos deben configurarse en el repositorio:

- `DOCKERHUB_USERNAME` → Su nombre de usuario de Docker Hub.

- `DOCKERHUB_TOKEN` → Token de acceso generado en Docker Hub.

---

## Cambios en vivo

Cada vez que se realiza una subida a `master`:

--- El pipeline compila y valida los servicios.
--- Se generan nuevas imágenes de Docker.
--- Las imágenes se publican en Docker Hub.
--- El trabajo de implementación ejecuta `docker-compose` para lanzar la última versión.

Esto garantiza que los cambios estén disponibles en el entorno sin intervención manual.

---

## Diagrama de arqui:  
![microservice-app-example](/docs/Architecture_diagram.png)

