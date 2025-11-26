# ThinkMinnt Foundation Website

A modern, full-stack website for ThinkMinnt Foundation - a Section 8 Non-Profit Organization dedicated to Education, Innovation, and Child Development.

![ThinkMinnt Foundation](src/assets/logo.jpg)

## 🌟 Features

### Frontend
- **Modern React Application** built with Vite
- **Responsive Design** using Tailwind CSS
- **Dark Mode** toggle with persistent theme
- **Smooth Animations** powered by Framer Motion
- **Interactive Components**:
  - Custom cursor
  - Scroll animations
  - Page transitions
  - Testimonials carousel
  - Newsletter signup
  - Impact dashboard with animated counters

### Backend
- **Node.js/Express** REST API
- **SQLite Database** for data persistence
- **Admin Dashboard** with analytics
- **Features**:
  - Contact form submissions
  - Donation tracking
  - Job applications with resume upload
  - Newsletter subscriber management
  - CSV data export
  - JWT authentication

## 📁 Project Structure

```
thinkmint-foundation/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── context/        # React context (Theme)
│   └── assets/         # Images and static files
├── server/
│   ├── index.js        # Express server
│   ├── routes.js       # API routes
│   ├── db.js           # Database schema
│   └── uploads/        # Uploaded files (resumes)
└── database.db         # SQLite database
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tejaschaudhari131/Thinkminnt.git
cd Thinkminnt
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development servers**

In one terminal (Backend):
```bash
npm run server
```

In another terminal (Frontend):
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

### Admin Access
- **URL:** `/login`
- **Username:** `admin`
- **Password:** `ThinkMinnt2024!`

## 📦 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start Express backend server
- `npm run dev:all` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React (icons)

### Backend
- Express.js
- Better-SQLite3
- JSON Web Tokens (JWT)
- Multer (file uploads)
- CORS

## 📊 Database Schema

The application uses SQLite with the following tables:
- `contacts` - Contact form submissions
- `donations` - Donation records
- `applications` - Job applications
- `careers` - Job listings
- `programs` - Foundation programs
- `subscribers` - Newsletter subscribers

## 🔒 Security

- JWT-based authentication for admin routes
- Password-protected admin dashboard
- Secure file upload handling
- CORS configuration
- Input validation

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables if needed

### Backend (Render/Railway)
1. Push to GitHub
2. Connect your repository
3. Set start command: `node server/index.js`
4. Configure environment variables

## 📝 Legal Information

- **CIN:** U85500PN2024NPL235880
- **Licence No:** 162020
- **PAN:** AALCT4053G
- **TAN:** PNET19764D
- **Registration:** Registrar of Companies (ROC), Pune

## 📧 Contact

- **Email:** info@thinkminnt.com
- **Phone:** +91 91393 92550
- **Address:** S No. 89/1, 89/2, Shop No. Namo Developers, Mohamadwadi, Pune City, Pune – 411060

## 👥 Contributors

- **Mr. Tejaram Rameshkumar Choudhari** - Director / Founder
- **Mr. Aditya Rajkumar Joshi** - Director / Founder

## 📄 License

This project is proprietary and confidential. All rights reserved by ThinkMinnt Foundation.

## 🙏 Acknowledgments

Built with ❤️ for making a difference in education and child development.

---

**© 2024 ThinkMinnt Foundation. All rights reserved.**
