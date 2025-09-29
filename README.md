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

## Branching Strategy

For this project, **GitHub Flow** is recommended because it is:

- Simple and lightweight.
- Focused on frequent deployments.
- Each new feature is developed in a branch (`feature/...`) and integrated into `main` through Pull Requests.
- The pipeline is triggered on `main` and `develop`, ensuring live changes and continuous deployment.

### Comparison with Other Strategies

- **GitFlow:** More robust, useful in large projects with defined release cycles.
- **Trunk-Based Development:** Useful for extreme continuous integration, but requires a very disciplined team.
- **GitHub Flow:** Best balance for this academic project: simplicity + direct CI/CD.

---

## CI/CD Pipeline in GitHub Actions

The pipeline is defined in `.github/workflows/ci-cd.yml`.

### Job Structure

#### `build-test`
- Compiles and validates each microservice in its respective stack.
- Checks dependencies (`npm install`, `pip install`, `mvn package`, `go build`).
- Includes a Redis service for integration testing.

#### `docker-build-push`
- Builds Docker images for each service.
- Authenticates with Docker Hub using `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
- Publishes images with the `latest` tag.

#### `deploy`
- Brings up the application with `docker-compose.prod.yml`.
- Simulates a production environment.
- Runs only if the previous steps succeed.

---

## GitHub Secrets Required

The following secrets must be configured in the repository:

- `DOCKERHUB_USERNAME` → Your Docker Hub username.
- `DOCKERHUB_TOKEN` → Access token generated in Docker Hub.

---

## Live Changes

Every time a push is made to `main` or `develop`:

- The pipeline builds and validates the services.
- New Docker images are generated.
- Images are published to Docker Hub.
- The deploy job runs `docker-compose` to launch the latest version.

This ensures that changes are available in the environment without manual intervention.

---

## Architecture

Take a look at the components diagram that describes them and their interactions.
![microservice-app-example](/arch-img/Microservices.png)
