# UGC.AI — AI-Powered UGC Ad Generator

Generate studio-quality UGC video ads using AI avatars — without hiring creators, booking studios, or waiting weeks.

---

## Tech Stack

**Frontend**
- React 19 + Vite + TypeScript
- Tailwind CSS + Framer Motion
- Clerk (authentication + billing)
- Axios

**Backend**
- Node.js + Express 5 + TypeScript
- Prisma ORM + PostgreSQL (Neon)
- Clerk Express (JWT auth + webhooks)
- Google Gemini AI (image generation)
- Cloudinary (media storage)
- Multer (file uploads)
- Sentry (error monitoring)

---

## Features

- AI image generation from product + model photos
- AI video generation from generated images
- Credit-based system (deduct on generation, refund on failure)
- Clerk authentication with Google OAuth
- Subscription plans (Free / Pro / Premium) via Clerk Billing
- Webhook-based credit updates on plan purchase
- Community gallery of published generations
- Download generated images and videos
- Publish / unpublish projects

---

## Project Structure

```
UGC project/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Navbar, Footer, ProjectCard, UploadZone etc.
│   │   ├── pages/           # Home, Generator, Result, Community, MyGenerations, Plans
│   │   ├── configs/         # Axios config
│   │   ├── assets/          # Images, dummy data
│   │   └── types/           # TypeScript types
│   └── .env
│
└── server/                  # Express backend
    ├── controllers/         # projectController, userController, clerk webhook
    ├── routes/              # projectRoutes, userRoutes
    ├── middlewares/         # auth (protect)
    ├── configs/             # Prisma, Multer, Cloudinary, Google AI, Sentry
    ├── prisma/              # Schema + migrations
    └── .env
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or Neon account)
- Clerk account
- Google AI Studio API key
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/syedtamimnsu/ugc-ai.git
cd ugc-ai
```

### 2. Setup the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL="postgresql://..."
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
CLOUDINARY_URL=cloudinary://...
GOOGLE_CLOUD_API_KEY="..."
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run server
```

### 3. Setup the client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_BASEURL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Start the client:

```bash
npm run dev
```

---

## Environment Variables

### Server

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Clerk webhook signing secret |
| `CLOUDINARY_URL` | Cloudinary connection URL |
| `GOOGLE_CLOUD_API_KEY` | Google AI Studio API key |

### Client

| Variable | Description |
|---|---|
| `VITE_BASEURL` | Backend server URL |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

---

## API Endpoints

### User
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/credits` | Get user credits |
| GET | `/api/user/projects` | Get all user projects |
| GET | `/api/user/projects/:projectId` | Get project by ID |
| PUT | `/api/user/projects/:projectId/publish` | Toggle publish status |

### Project
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/project/create` | Create project + generate image (costs 5 credits) |
| POST | `/api/project/video` | Generate video from image (costs 10 credits) |
| GET | `/api/project/published` | Get all published projects |
| DELETE | `/api/project/:projectId` | Delete project |

### Webhook
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/clerk` | Clerk webhook (user sync + payment credit update) |

---

## Credit System

| Action | Credits |
|---|---|
| Sign up | 20 free credits |
| Generate image | -5 credits |
| Generate video | -10 credits |
| Pro plan | +80 credits |
| Premium plan | +240 credits |

Credits are refunded automatically if generation fails.

---

## Deployment

### Webhook Setup (Clerk)
1. Deploy your server
2. Go to Clerk Dashboard → Webhooks → Add endpoint
3. Set URL to `https://your-server.com/api/clerk`
4. Subscribe to: `user.created`, `user.updated`, `user.deleted`, `subscription.updated`, `paymentAttempt.updated`

---

## Author

**Syed Tamim**
- GitHub: [@syedtamimnsu](https://github.com/syedtamimnsu)
- Email: syedtamim167@gmail.com

---

## License

MIT
