# 💬 MyChaty
![banner](./docs/banner.png)

## 🚀 Features 
### User Authentication
- [x]  Secure user login and registration (Email and Password)

### Real-Time Messaging
- [x]  Instant messaging with real-time updates

### Manage User Friends
- [x]  List user friends
- [x]  Remove user friends

### User Invites
- [x]  Send chating invites for others users
- [x]  Accept invites sent for you
- [x]  Deny invites sent for you

### Real-Time Notications
- [x] Message notification
- [ ] Receive invite notification
- [ ] Invite accepted notification

## 🏛️ Architecture
![system-architecture](./docs/system-architecture.jpeg)
![system-architecture-2](./docs/system-architecture-2.jpeg)

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

## 🏃‍♂️ Running Guide (development environment)
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
✅ It will be available at: [http://localhost:5173](http://localhost:5173)

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

✅ It will be available at: [http://localhost:3000](http://localhost:3000)

## 💬 Contribution
We welcome contributions to MyChaty! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.