# Polygon Buidlit Project

Recommended: PNPM (dev), Docker, Docker Compose

# Docker Instructions

-   `cp .example.server.env .server.env`
-   `touch error.log`
-   `chmod +x entrypoint.sh`

## Development

-   `pnpm dev:up`

## Production

-   Start by `pnpm prod:up`
-   Stop by `pnpm prod:down`
-   Log: `docker-compose logs -f`
