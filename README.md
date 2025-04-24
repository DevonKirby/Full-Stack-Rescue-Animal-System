# 🐾 Full Stack Rescue Animal System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing the intake, reservation, and service tracking of rescue animals.

---

## 📦 Features 

- Add, update, and delete rescue animals (dogs, monkeys) (WIP)
- Track animal status: trained, reserved, in service (WIP)
- RESTful API with MongoDB backend (WIP)
- React frontend with form handling and dynamic tables (WIP)
- Built with scalability and modularity in mind 

---

## 🛠️ Tech Stack

| Layer     | Tech                      |
|-----------|---------------------------|
| Frontend  | React, JavaScript, Fetch API |
| Backend   | Node.js, Express.js       |
| Database  | MongoDB, Mongoose ODM     |
| Dev Tools | VS Code, Postman, Git, GitHub |

---

## 🚀 Getting Started

### 📁 Clone the repo
```bash
git clone https://github.com/DevonKirby/full-stack-rescue-animal-system.git
cd full-stack-rescue-animal-system
```

### 🔧 Install dependencies

Server
```bash
cd server
npm install
```

Client
```bash
cd ../client
npm install
```

### 🌱 Set up your environment

Create a `.env` file inside the `/server` folder with:

- `MONGO_URI`: Your MongoDB connection string
- `PORT`: The port your backend will run on (default: 5000)