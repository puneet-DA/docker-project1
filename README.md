# Production-Ready Dockerized Application

This repository contains a full multi-tier web application architecture designed with production constraints in mind.

## Architecture Diagram

```text
                  [ Internet / Host ]
                           │ (Port 8080)
                           ▼
                 ┌───────────────────┐
                 │       Nginx       │
                 │  (Reverse Proxy)  │
                 └───────────────────┘
                           │
       [ frontend network ]│
                           ▼
                 ┌───────────────────┐
                 │ Node.js App (API) │
                 │ (Internal: 3000)  │
                 └───────────────────┘
                           │
        [ backend network ]│
                           ▼
                 ┌───────────────────┐
                 │    PostgreSQL     │
                 │ (Internal: 5432)  │
                 └───────────────────┘
                           │
                      [ pgdata ]
                   (Named Volume)