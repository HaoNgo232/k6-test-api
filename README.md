# K6 Test API

Express API với TypeScript + Prisma + PostgreSQL để kiểm thử hiệu năng bằng K6.

## 📋 Requirements

- Node.js >= 18
- K6 (để chạy performance tests)

**Note:** SQLite được sử dụng, không cần cài đặt database riêng!

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment (Optional)

Copy `.env.example` to `.env` nếu cần customize:

```bash
cp .env.example .env
```

**Note:** SQLite không cần DATABASE_URL configuration. Database file sẽ được tạo tự động tại `./dev.db`

### 3. Setup database

Generate Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

Seed test user:

```bash
npm run prisma:seed
```

### 4. Start server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Authentication
```
POST /api/auth/login
Body: { "username": "testuser", "password": "testpassword" }
Response: { "token": "jwt-token" }
```

### Items CRUD

**Create Item**
```
POST /api/items
Headers: Authorization: Bearer <token>
Body: { "title": "...", "description": "...", "status": "active" }
```

**Get All Items**
```
GET /api/items?page=1&limit=20
Headers: Authorization: Bearer <token>
```

**Get Item by ID**
```
GET /api/items/:id
Headers: Authorization: Bearer <token>
```

**Update Item**
```
PUT /api/items/:id
Headers: Authorization: Bearer <token>
Body: { "title": "...", "description": "...", "status": "updated" }
```

**Delete Item**
```
DELETE /api/items/:id
Headers: Authorization: Bearer <token>
```

## 🧪 Running K6 Performance Tests

### Install K6

**macOS:**
```bash
brew install k6
```

**Linux:**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows:**
```bash
choco install k6
```

### Run Tests

Đảm bảo API đang chạy, sau đó:

```bash
k6 run k6-test.js
```

Với custom BASE_URL:

```bash
k6 run -e BASE_URL=http://192.168.1.100:3000/api k6-test.js
```

## 📁 Project Structure

```
k6-test-api/
├── src/
│   ├── modules/
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── index.ts
│   │   └── items/             # Items CRUD module
│   │       ├── items.service.ts
│   │       ├── items.controller.ts
│   │       └── index.ts
│   ├── prisma/                # Prisma service
│   │   └── prisma.service.ts
│   ├── middleware/            # Express middlewares
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── config/                # Configuration
│   │   └── env.config.ts
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
├── k6-test.js                 # K6 performance test
├── .env                       # Environment variables
└── package.json
```

## 🔧 Development

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio
npx prisma studio
```

### Test User Credentials

- Username: `testuser`
- Password: `testpassword`

## 📊 K6 Test Scenarios

Script bao gồm 4 kịch bản test:

1. **Smoke Test** - 5 users trong 1 phút (kiểm tra cơ bản)
2. **Load Test** - Tăng dần lên 50 users (tải bình thường)
3. **Stress Test** - Tăng dần lên 300 users (test scaling)
4. **Spike Test** - Đột biến lên 500 users (test khả năng chịu tải đột ngột)

## 📝 Notes

- API sử dụng JWT authentication đơn giản (không hash password)
- Phù hợp cho testing và development, không dùng cho production
- Cấu trúc folder theo pattern NestJS để dễ maintain và debug
