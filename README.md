# HealthGuide AI

HealthGuide AI is a wellness-tracking portfolio project. The current MVP has a Next.js landing page, registration and login screens, an Express API, MongoDB user accounts, a protected starter dashboard, and private weight-progress entries.

The wellness calculator on the public page is a local BMI estimate. It is not an AI diagnosis or a treatment plan. Keep this distinction clear as the project grows.

## Run the project locally

### 1. Configure MongoDB

You can use a local MongoDB Community Server, or MongoDB Atlas:

1. Create an Atlas account and a free development cluster.
2. Create a database user and keep its password private.
3. Add your current development IP in Atlas Network Access. Avoid opening database access to every IP address.
4. Choose **Connect → Drivers** and copy the Node.js connection string.
5. Replace the username, password, and database name in the URI. If the password contains special characters, URL-encode it.

Atlas connection strings have this shape:

```text
mongodb+srv://<db-user>:<db-password>@<cluster-host>/healthguide?retryWrites=true&w=majority
```

Never put the database URI in frontend code or commit it to source control.

### 2. Configure the Express API

Open a terminal in the project root and run:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env`: put your MongoDB URI in `MONGODB_URI`, and replace `JWT_SECRET` with a private random secret. For example, generate one with Node.js:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep the secret output private. Then start the API:

```powershell
npm run dev
```

The API listens at `http://localhost:4000`. `GET http://localhost:4000/api/health` is a simple API health check.

### 3. Start the Next.js app

Open a second terminal in the project root:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend uses `http://localhost:4000` by default. If your API runs elsewhere, set `NEXT_PUBLIC_API_URL` in the root `.env.local` file. The API's `FRONTEND_ORIGIN` must match the frontend origin.

## How registration and sign-in work

1. A visitor opens `/register`, enters a name, email, password, and an initial wellness goal.
2. The frontend sends the form to `POST /api/auth/register`.
3. Express validates the fields, hashes the password with bcrypt, and stores the user in MongoDB. It returns an HTTP-only session cookie; it does not return the password or password hash.
4. `/login` sends credentials to `POST /api/auth/login`. The API verifies the password and issues the same kind of session cookie.
5. After authentication, the browser opens `/dashboard`. The dashboard calls `GET /api/auth/me` and redirects to `/login` if there is no valid session.
6. A signed-in user can record weight entries. The API associates each entry with the authenticated account, and the dashboard graph displays that account's entries.
7. **Sign out** calls `POST /api/auth/logout` to clear the cookie.

The API uses an HTTP-only cookie so browser JavaScript cannot read the session token. Passwords are hashed, and login endpoints have a rate limit. This is a learning MVP, not yet a complete production identity system: add email verification, password reset, account deletion, CSRF and deployment review, and security testing before a public launch.

## Current API routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Check whether the API is running |
| `POST` | `/api/auth/register` | Public, rate-limited | Create an account and start a session |
| `POST` | `/api/auth/login` | Public, rate-limited | Verify credentials and start a session |
| `POST` | `/api/auth/logout` | Session cookie | Clear the current session |
| `GET` | `/api/auth/me` | Session cookie | Return the current user's public profile |
| `GET` | `/api/weight-entries` | Session cookie | List the current user's weight entries |
| `POST` | `/api/weight-entries` | Session cookie | Save a weight entry for the current user |

Private route handlers must always filter records by the authenticated user's ID. Never accept an owner/user ID from the browser as authorization.

## Recommended path to a strong portfolio project

Build a small end-to-end feature at a time instead of starting with every proposed module:

1. **Finish the account basics:** test registration, login, logout, duplicate email, invalid input, and expired sessions; then implement email verification and password reset.
2. **Profile and onboarding:** let users set preferences, units, and goals; make sensitive fields optional and explain why they are collected.
3. **Wellness records:** implement one complete vertical slice at a time—activity first, then sleep, hydration, meals, and habits—with input validation and ownership checks.
4. **Dashboard from real data:** replace sample metrics with server-calculated summaries and charts; show empty, loading, and error states.
5. **AI summaries last:** calculate numbers in your API, send only the minimum necessary data to an AI provider, label AI output clearly, and never position it as diagnosis or treatment.
6. **Trust and quality:** add data export/deletion, privacy controls, keyboard/mobile accessibility, API tests, and deployment monitoring.

Recommended first logged-in pages: **Overview**, **Profile & goals**, **Activity**, **Sleep**, **Nutrition & hydration**, **Habits**, and **Settings**. Start with Overview and one tracker so you can complete and test the whole flow from form → API → MongoDB → dashboard before expanding.
