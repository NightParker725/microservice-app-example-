
#!/usr/bin/env bash
set -euo pipefail
: "${TAG:?}"
docker compose -f docker-compose.prod.yml pull || true
docker compose -f docker-compose.prod.yml up -d
docker system prune -f || true
