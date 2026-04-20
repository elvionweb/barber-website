# EliteCuts Fullstack MERN Application

A complete Barber Shop management and booking system built using MongoDB, Express, React, Node.js + Vite. Includes robust logic for managing dynamic un-conflicting bookings, loyalty point accumulation, physical product e-commerce checking out natively to WhatsApp, AI-native localized smart chatbots, SEO structure mappings, comprehensive admin controls, and Node cron job background email tasks.

## Setup Instructions

### 1. Backend Server Setup
From the project root:
```bash
cd server
npm install
```
Start the backend logic on port 5000:
```bash
npm run dev
```

### 2. Frontend React Client Setup
Open a new terminal at the project root:
```bash
npm install
npm run dev
```

### 3. Environment Contexts
Make sure you establish both `.env` matrices. Defaults are injected via `server/.env` and `src/.env`.

**`server/.env` Requirements:**
- `PORT=5000`
- `MONGO_URI` (Points optimally to 127.0.0.1 instead of localhost string representation)
- `JWT_SECRET`
- `EMAIL_USER` & `EMAIL_PASS` (Requires generating an App Password via Google Security for SMTP logic to run).
- `CLIENT_URL=http://localhost:5173`

**`src/.env` Requirements:**
- `VITE_API_URL=http://localhost:5000`

## API Endpoints Architecture

| Method | Endpoint | Description | Auth Config |
|--------|----------|-------------|-------------|
| GET | `/api/appointments/slots` | Time mapping logic weeding out booked elements | Public |
| GET | `/api/appointments/walkin-status` | Aggregates daily barber constraints | Public |
| POST | `/api/appointments/waitlist` | Overloads Waitlist collection locally | Public |
| POST | `/api/appointments` | Executes booking logic and natively sends emails | Public |
| PUT | `/api/appointments/:id/reschedule` | Modifies existing states and re-verifies collisions | Protected |
| GET | `/api/admin/stats` | Root KPI mapping logic for BarChart representation | Admin |
| POST | `/api/chat` | Basic logic mapping AI interactions safely | Public |
| POST | `/api/loyalty/redeem` | Safe 100 pt deduction logic | Protected |
| POST | `/api/giftcards/purchase` | Constructs 12-char strings mapped via Mail transporter | Public |

## Admin Interactivity
A seeder automates DB injection logic. Check `server/index.js` for `seedBarbers` and explicit logic handling. 
To access `AdminDashboard`:
1. Use default Admin Credentials generated initially via Seeder endpoints or manually construct standard `User` inputs with `role: admin`.
2. Login normally mapping `/login`
3. Navigate to `/admin`.
