# Microservice App – Taller de DevOps

David Henao

John Lamus

## Descripción General
**Taller 1: Automatización de Infraestructura con Pipelines**.  
- Automatización con **pipelines CI/CD**.  
- Estrategias de branching.  
- Patrones de diseño en la nube (**Cache-Aside** y **Circuit Breaker**).  
- Despliegue local con **Docker Compose** y **Jenkins**.  

---

## Metodología Ágil
Se usó un **Scrum simple**:
- **Iteraciones (sprints)** semanales.  
- **Roles, si fuera un grupo grande para un proceso mas masivo, en nuestro caso son roles repartidos entre 2**:  
  - *Scrum Master*: coordinación del taller.  
  - *Developers*: implementación de microservicios y pruebas.  
  - *Ops*: configuración de Jenkins, Docker y despliegue.  
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

## Diagrama de arqui:  
![microservice-app-example](/docs/Architecture diagram.png)

