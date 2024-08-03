# MyChaty
![banner](./docs/banner.png)

## 🚀 Features 
### User Authentication**
- [x]  Secure user login and registration (Email and Password)

### Real-Time Messaging
- [x]  Instant messaging with real-time updates

### Manage User Friends
- [ ]  List user friends
- [ ]  Remove user friends

### User Invites
- [x]  Send chating invites for others users
- [x]  Accept invites sent for you
- [x]  Deny invites sent for you

### *Real-Time Notications
- [ ] Message notification
- [ ] Receive invite notification
- [ ] Invite accepte notification

## 🏛️ Architecture
![system-architecture](./docs/system-architecture.jpeg)

## 🛠️ Tech Stack
### Web
- [React](https://reactjs.org/)
- [Shadcn/UI](https://github.com/shadcn/ui)
- [TailwindCSS](https://tailwindcss.com/)

### API
- [NodeJs](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Socket.io](https://socket.io/)

## 📦 Dependencies
- [Node/NPM](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## 🏃‍♂️ Running Guide
### Web
1. Change to web directory
```bash
cd web
```
2. Installing Packages
```bash
npm install
```
3. Run project
```bash
npm run dev
```

### API
1. Change to api directory
```bash
cd api
```
2. Installing Packages
```bash
npm install
```
3. Start PSQL using docker
```bash
docker compose up -d
```
4. Run project
```bash
npm run dev
```