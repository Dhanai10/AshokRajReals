# 🏠 Prestige Estates — Full-Stack Real Estate Website

A professional luxury real estate platform built with React, Node.js/Express, Supabase (PostgreSQL), and Cloudinary for image hosting.

---

## 📁 Project Structure

```
realestate/
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js / .css
│   │   │   ├── PropertyCard.js / .css
│   │   │   └── SearchFilter.js / .css
│   │   ├── pages/
│   │   │   ├── Home.js / .css
│   │   │   ├── Contact.js / .css
│   │   │   ├── AdminLogin.js / .css
│   │   │   └── AdminDashboard.js / .css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── backend/                    # Node.js + Express API
│   ├── routes/
│   │   ├── properties.js
│   │   ├── contact.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── propertiesController.js
│   │   ├── contactController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── supabase.js
│   │   └── cloudinary.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── database/
    └── schema.sql              # Supabase SQL schema + seed data
```

---

## ⚙️ Setup: Third-Party Services

### 1. Supabase (Free Database)

1. Go to [supabase.com](https://supabase.com) → Create a free account
2. Create a new project (choose a region close to you)
3. Go to **SQL Editor** → paste the contents of `database/schema.sql` → Run
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`

### 2. Cloudinary (Free Image Hosting)

1. Go to [cloudinary.com](https://cloudinary.com) → Create a free account
2. From the **Dashboard**, copy:
   - **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

---

## 🚀 Running Locally

### Backend Setup

```bash
cd backend
npm install

# Copy and fill in your credentials
cp .env.example .env
# Edit .env with your Supabase and Cloudinary keys

npm run dev     # Starts on http://localhost:5000
```

**Backend `.env`:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend Setup

```bash
cd frontend
npm install

# Copy and configure environment
cp .env.example .env
# The default proxy setting handles local dev automatically

npm start       # Starts on http://localhost:3000
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 Deploying for Free

### Deploy Backend → Render.com (Free)

1. Push your entire project to a GitHub repository
2. Go to [render.com](https://render.com) → Sign up free
3. Click **New → Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Add all environment variables from your `.env` file in the **Environment** tab
7. Click **Create Web Service** — you'll get a URL like `https://your-api.onrender.com`

### Deploy Frontend → Netlify (Free)

1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Click **Add new site → Import an existing project**
3. Connect GitHub repo
4. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-api.onrender.com/api`
6. Click **Deploy site**

> **Important:** After deploying, also update `FRONTEND_URL` in your Render backend environment to your Netlify URL to allow CORS.

---

## 🔐 Admin Access

- URL: `/admin/login`
- Username: `admin`
- Password: `admin`

> To change credentials, set `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables in your backend.

---

## 🗄️ Database Schema

### `properties` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto) |
| property_type | VARCHAR | 'House' or 'Land' |
| city | VARCHAR | City name |
| sqft | INTEGER | Square footage |
| description | TEXT | Property description |
| image_url | TEXT | Cloudinary image URL |
| created_at | TIMESTAMPTZ | Created timestamp |

### `contacts` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto) |
| name | VARCHAR | Sender's name |
| email | VARCHAR | Sender's email |
| message | TEXT | Message content |
| created_at | TIMESTAMPTZ | Submission timestamp |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | Get all properties (supports filters) |
| POST | `/api/properties` | Upload new property (multipart/form-data) |
| DELETE | `/api/properties/:id` | Delete a property |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |
| POST | `/api/auth/login` | Admin login |

**Property filter query params:**
```
GET /api/properties?city=Miami&propertyType=House&minSqft=1000&maxSqft=5000
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Image Storage | Cloudinary |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Deployment | Netlify (frontend) + Render (backend) |
