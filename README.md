# Textbook Annotation Platform

## Stack
- React + Vite + TypeScript
- Node.js + Express
- Docker + Docker Compose

## Features
- Textbook content viewer
- Inline annotation system
- Teacher notes on sections/problems

## Run

### Backend + Frontend
- docker-compose orchestrates both
```bash 
    docker-compose down
    docker-compose up --build 
```

## Ports

Frontend (Vite dev server):
http://localhost:5173

Backend API:
http://localhost:3000

Dashboard:
http://localhost:5001/

Dashboard metrics API:
http://localhost:4001/metrics

4000 - Metrics server (inside container)
5000 - Dashboard static server (inside container)
localhost:5001 → container:5000
localhost:4001 → container:4000


    in frontend dir:
        make sure node is set to a high enough version (not 22.11)
            if not, do "nvm use node" in zsh terminal 
        in zsh terminal: npm run dev

        http://localhost:5173
        This serves the React app
        Completely separate dev server (Vite default port)
        Used for UI only

        The frontend must correctly call the backend: baseURL: "http://localhost:3000/api"

        Frontend (5173)  --->  Backend API (3000)
            UI                Data / Logic

    in backend dir (docker):
        in bash terminal: docker-compose up --build
        or docker-compose up

        Backend (Docker / Express)
        http://localhost:3000
        This is the API server
        Handles data: textbooks, annotations, etc.
        Running inside Docker container (mapped to port 3000)