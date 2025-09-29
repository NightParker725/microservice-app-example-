# Microservice App - PRFT Devops Training

This is the application you are going to use through the whole traninig. This, hopefully, will teach you the fundamentals you need in a real project. You will find a basic TODO application designed with a [microservice architecture](https://microservices.io). Although is a TODO application, it is interesting because the microservices that compose it are written in different programming language or frameworks (Go, Python, Vue, Java, and NodeJS). With this design you will experiment with multiple build tools and environments. 

## Workshop participants

- Jhon Alexander Lamus Mora - A00372128
- David Henao Salazar - A00394033

## Components
In each folder you can find a more in-depth explanation of each component:

1. [Users API](/users-api) is a Spring Boot application. Provides user profiles. At the moment, does not provide full CRUD, just getting a single user and all users.
2. [Auth API](/auth-api) is a Go application, and provides authorization functionality. Generates [JWT](https://jwt.io/) tokens to be used with other APIs.
3. [TODOs API](/todos-api) is a NodeJS application, provides CRUD functionality over user's TODO records. Also, it logs "create" and "delete" operations to [Redis](https://redis.io/) queue.
4. [Log Message Processor](/log-message-processor) is a queue processor written in Python. Its purpose is to read messages from a Redis queue and print them to standard output.
5. [Frontend](/frontend) Vue application, provides UI.

## Estrategia de Branching

Para este proyecto se recomienda usar **GitHub Flow**, ya que es:  
- Simple y ligero.  
- Centrado en **deploys frecuentes**.  
- Cada nueva funcionalidad se trabaja en una rama (`feature/...`) y se integra a `main` mediante **Pull Requests**.  
- El pipeline se activa en `main` y `develop`, garantizando cambios en vivo y despliegue continuo.

### Comparación con otras estrategias
- **GitFlow** → más robusto, útil en proyectos grandes con ciclos de release definidos.  
- **Trunk-Based Development** → útil para integración continua extrema, pero requiere un equipo muy disciplinado.  
- **GitHub Flow** → mejor balance para este proyecto académico: simplicidad + CI/CD directo.  

---

## Pipeline CI/CD en GitHub Actions

El pipeline está definido en `.github/workflows/ci-cd.yml`.  

### Estructura de jobs
1. **build-test**  
   - Compila y valida cada microservicio en su respectivo stack.  
   - Verifica dependencias (`npm install`, `pip install`, `mvn package`, `go build`).  
   - Incluye servicio Redis para pruebas de integración.  

2. **docker-build-push**  
   - Construye imágenes Docker para cada servicio.  
   - Autentica con Docker Hub usando `DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN`.  
   - Publica imágenes con el tag `latest`.  

3. **deploy**  
   - Levanta la aplicación con `docker-compose.prod.yml`.  
   - Simula un entorno de producción.  
   - Se ejecuta solo si los pasos anteriores pasan correctamente.  

---

## Secrets en GitHub

Se requieren los siguientes **secrets configurados en el repositorio**:

- `DOCKERHUB_USERNAME` → usuario de Docker Hub.  
- `DOCKERHUB_TOKEN` → token de acceso generado en Docker Hub.  

---

## Cambios en Vivo

Cada vez que se hace un **push a `main` o `develop`**:
1. El pipeline construye y valida los servicios.  
2. Se generan nuevas imágenes Docker.  
3. Se publican en Docker Hub.  
4. El `deploy` ejecuta `docker-compose` para levantar la última versión.  

Esto asegura que los cambios estén disponibles en el entorno sin intervención manual.  

---


## Architecture

Take a look at the components diagram that describes them and their interactions.
![microservice-app-example](/arch-img/Microservices.png)