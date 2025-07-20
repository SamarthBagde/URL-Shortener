# URL-Shortener 🔗

# 🔗 URL Shortener (MERN + Redis)

A minimal, full-stack URL Shortener application built with the MERN stack and Redis caching.

## 🚀 Features

- Shorten long URLs to compact aliases
- Redirect short URLs to original destinations
- Redis caching for a performance boost
- RESTful API with Node.js, Express, and MongoDB
- JWT-based authentication
- Fully containerized using Docker and Docker Compose

---

## 🛠 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | React.js + Vite                  |
| Backend     | Node.js + Express.js             |
| Database    | MongoDB Atlas                    |
| Caching     | Redis                            |

---

## 📦 Setup Instructions
### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd URL-Shortener
```

### 2. Configure Environment Variables

Create `backend/.env`:

```env
PORT=3001
DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/DB1?retryWrites=true&w=majority
DATABASE_PASSWORD=<your-db-password>
JWT_SECRET_KEY=<your-secret>
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Create or update `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3001/api
```

### 3. Build & Start Using Docker

```bash
docker compose up -d
```

This starts:
- `frontend` at: `http://localhost:5173`
- `backend` at: `http://localhost:3001/api`
- `redis` on default port `6379`


 
