# MyChaty

Chating web application (in development)

## Features 
- [x]  **User Authentication**
  - [x]  Secure user login and registration (Email and Password)

- [ ]  **Real-Time Messaging**
  - [ ]  Instant messaging with real-time updates

- [ ]  **Group Chats**
  - [ ]  Create and manage group chats
  - [ ]  Add or remove members from group chats

- [ ]  **User Invites**
  - [ ]  Send chating invites for others users
  - [ ]  Accept or deny invites sent for you

## Architecture
![system-architecture](./docs/system-architecture.jpeg)

## Techs
- React
- Shadcn/UI
- NodeJs
- Fastify
- Docker

## Running Guide

- **Web**
```bash
npm install
npm run dev
```

- **API**
  - PostgreSQL (Docker)
  ```bash
    docker compose up -d
  ```
  - NodeJs Application
  ```bash
  npm install
  npm run dev
  ```