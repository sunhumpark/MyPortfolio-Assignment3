# COMP229 Assignment 3

## Windows PowerShell setup
Open this folder (the one containing server.js) in VS Code. Use Node.js 22.12+ and a running MongoDB instance, or use your Atlas connection string.

1. `npm install`
2. `Copy-Item .env.example .env`
3. Edit .env: set MONGODB_URI, a long random JWT_SECRET, ADMIN_EMAIL and a private ADMIN_PASSWORD (8+ characters). Keep PORT=3000. Never commit .env.
4. `node seed-admin.js` (creates/updates the specified administrator in MongoDB; use a dedicated assignment database).
5. `cd client`
6. `npm install`
7. `npm run dev`
8. Open http://localhost:5173/ (or the Vite URL shown).

## Test and screenshots
- Sign up with a different email, sign in, verify role user and read-only pages.
- Sign out, sign in with the admin credentials from .env.
- On Contact, Education and Projects, add a record, edit it, refresh to verify persistence, then delete it. Capture each action and MongoDB results. Add your own real portfolio entries; the new database starts empty.
- Sign out and verify protected Contact records are not displayed. Test a write API without authentication (401) and as a normal user (403).
- GitHub: commit source, not .env or node_modules. Submit ZIP, repository URL, and a Word document of your actual screenshots.

## Changes
Existing Home/About/Services and public assets retained. Education, Projects and Contact now use a shared CRUD component with React state and API calls. Signup/Signin use a shared AuthForm; auth.jsx manages session via HTTP-only JWT cookie. Backend verifies admin role against MongoDB on each write. Contact reads require login; Projects/Education reads are public. Bulk-delete routes removed for safety. Admin is pre-created via seed script rather than committing a plaintext password. Vite proxy forwards /api to port 3000. Old GitHub Pages deployment workflow removed because static hosting alone cannot run the backend.

## Verification limitations
Source syntax checked; dependency installation, MongoDB integration and browser tests must be performed on your computer. No screenshots or GitHub push have been fabricated.
