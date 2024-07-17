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

- [x]  **User Invites**
  - [x]  Send chating invites for others users
  - [x]  Accept invites sent for you
  - [x]  Deny invites sent for you
  - [x]  Delete invites sent from you

## Architecture
![system-architecture](./docs/system-architecture.jpeg)

## Techs

- **Web**
  - React
  - Shadcn/UI
  - TailwindCSS

- **API**
  - NodeJs
  - Fastify
  - PostgreSQL 
  - Docker
  - Socket.io

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