# Phonebook App Backend – Full Stack Open, Part 3

This repository contains the backend for the Phonebook app from [Full Stack Open](https://fullstackopen.com/en/).

The backend is built with **Node.js** and **Express**, and it also serves a production build of the React frontend created in Part 2 of the course.

---

## 🔗 Live App

📍 **Deployed on Render**:  
👉 [https://phonebook-backend-j8qc.onrender.com](https://phonebook-backend-j8qc.onrender.com)

This app serves both:
- The frontend (React build copied to `/dist`)
- The backend API under `/api/persons`

🕒 **Note:** This app is hosted on Render’s free tier.  
The server “sleeps” when inactive, so the **first visit after a while may return a 502 error**.  
If that happens, wait a few seconds and **refresh the page**.

---

## 📦 Technologies Used

- Node.js
- Express
- Morgan (for logging)
- Vite (frontend build tool)
- Axios (used in frontend)
- Render (deployment platform)

---

## 🚀 Development

To run the app locally:

### 1. Clone the repository
```bash
git clone https://github.com/Akiz-Ivanov/phonebook-backend
cd phonebook-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the backend

```bash
npm start
```

### 4. View the app

If the dist/ folder is present, visit http://localhost:3001 to see the frontend.

API endpoints are available under:
http://localhost:3001/api/persons

## ⚙️ Deployment Notes

The production build of the frontend is copied into the backend repo using the script:

```bash
npm run build:ui
```

This runs vite build in the frontend repo and copies the output dist/ folder into this backend repo.

A combined deploy + commit script is also available:

```bash
npm run deploy:full
```

## 🛠 API Testing

This repository includes a `requests/` folder compatible with the 
[Human REST Client VS Code extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

It contains ready-to-run `.http` files for testing the API endpoints directly from within VS Code.

## ✅ Exercise Coverage
This project covers the following Full Stack Open exercises:

3.9 – Connect frontend to backend

3.10 – Deploy backend to Render

3.11 – Serve production frontend from backend