# Chatify 💬

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) featuring Socket.IO for instant messaging, JWT authentication, and a beautiful UI powered by TailwindCSS and DaisyUI.

![Chatify](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Management** - Browse and chat with registered users
- 🖼️ **Image Sharing** - Upload and share images via Cloudinary integration
- 📧 **Email Notifications** - Email verification using Resend
- 🛡️ **Rate Limiting & Security** - Protected with Arcjet security middleware
- 🎨 **Modern UI** - Sleek interface with TailwindCSS and DaisyUI
- 🔔 **Message Notifications** - Real-time notification sounds
- ⌨️ **Keyboard Sound Effects** - Optional typing sound feedback
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Theme** - Eye-friendly dark mode interface

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool
- **Zustand** - Lightweight state management
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Lucide React** - Icon library
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Socket.IO** - WebSocket server for real-time features
- **JWT** - Secure token-based authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image upload and management
- **Resend** - Transactional email service
- **Arcjet** - Security and rate limiting
- **Cookie Parser** - HTTP cookie parsing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kushagragarg15/chatify-.git
cd chatify-
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the **backend** directory (a template is provided at `backend/.env.example`):

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Email Configuration (optional — signup works without it, the
# welcome email is just skipped if RESEND_API_KEY is unset)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_email@domain.com
EMAIL_FROM_NAME=Chatify

# Arcjet Security (optional — requests just skip bot/rate-limit checks if unset)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=production

# Client URL (for CORS) — the deployed frontend's origin
CLIENT_URL=http://localhost:5173
```

For local development you don't need a frontend `.env` — `frontend/src/lib/axios.js`
and `useAuthStore.js` already default to `http://localhost:3000` in dev mode.
For deployment (frontend on Vercel, backend on Render), set
`VITE_API_URL`/`VITE_SOCKET_URL` — see `frontend/.env.example` and Deployment
below.

### 4. Start the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Production Mode

See [Deployment](#-deployment) below — the frontend deploys to Vercel and
the backend to Render as separate services. To sanity-check a production
build locally instead:

```bash
# Build frontend
cd frontend
npm run build
npm run preview   # serves dist/ at http://localhost:4173

# Start backend, pointing CLIENT_URL at the preview origin above
cd backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
chatify/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/           # Email templates and handlers
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplates.js
│   │   ├── lib/              # Utility libraries
│   │   │   ├── db.js         # Database connection
│   │   │   ├── cloudinary.js # Image upload config
│   │   │   ├── socket.js     # Socket.IO setup
│   │   │   ├── resend.js     # Email service
│   │   │   └── arcjet.js     # Security config
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── arcjet.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js         # Application entry point
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets
│   │   ├── sounds/           # Notification and keyboard sounds
│   │   └── *.png             # Images
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatsList.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useKeyboardSound.js
│   │   ├── lib/              # Utilities
│   │   │   └── axios.js
│   │   ├── pages/            # Page components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── store/            # Zustand state management
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/message/contacts` - Get all users available to chat with
- `GET /api/message/chats` - Get users you've already exchanged messages with
- `GET /api/message/:id` - Get messages with a specific user
- `POST /api/message/send/:id` - Send a message to a user

### Health
- `GET /api/health` - Liveness/readiness check for uptime monitors and hosting platforms

### WebSocket Events
- `connect` / `disconnect` - Socket lifecycle (authenticated via the `token` cookie)
- `newMessage` - Emitted to the recipient when a message is sent
- `getOnlineUsers` - Broadcast list of currently online user IDs

## 🎨 Features in Detail

### Real-time Communication
Messages are delivered instantly using Socket.IO WebSockets. Users can see who's online in real-time.

### Image Sharing
Users can upload and share images directly in chat. Images are stored on Cloudinary for fast delivery.

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- Rate limiting with Arcjet
- CORS protection

### User Experience
- Loading skeletons for better perceived performance
- Toast notifications for user feedback
- Keyboard sound effects (toggleable)
- Message notification sounds
- Responsive grid layout

## 🚢 Deployment

The app deploys as two separate services:

- **Frontend** (Vite/React static build) → **Vercel**
- **Backend** (Express API + Socket.IO) → **Render**

CORS and the auth cookie are already configured for this cross-origin setup
(`CLIENT_URL` on the backend, `VITE_API_URL`/`VITE_SOCKET_URL` on the
frontend). See `DEPLOYMENT.md` for full, step-by-step instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- MongoDB for database
- Cloudinary for image hosting
- Resend for email services
- Arcjet for security features

## 📧 Contact

Kushagra Garg - [@kushagragarg15](https://github.com/kushagragarg15)

Project Link: [https://github.com/kushagragarg15/chatify-](https://github.com/kushagragarg15/chatify-)

---

⭐ If you find this project useful, please consider giving it a star!
