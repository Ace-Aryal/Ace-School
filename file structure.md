├── public/
│   └── index.html
│
├── src/
│   ├── assets/               # Static assets (images, icons, PDFs)
│   ├── components/           # Reusable UI components (Button, Modal, Navbar, etc.)
│   ├── features/             # Redux slices and feature-specific logic
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── AuthService.js
│   │   ├── students/
│   │   │   ├── studentSlice.js
│   │   │   └── StudentService.js
│   │   ├── attendance/
│   │   ├── fees/
│   │   ├── timetable/
│   │   ├── exams/
│   │   ├── notices/
│   │   └── library/
│   │
│   ├── pages/                # Page-level components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Students.jsx
│   │   ├── Attendance.jsx
│   │   ├── Exams.jsx
│   │   └── NotFound.jsx
│   │
│   ├── layouts/              # Layouts like AppLayout, AdminLayout
│   │   └── AppLayout.jsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useAppwrite.js
│   │
│   ├── appwrite/             # Appwrite configuration & services
│   │   ├── appwriteConfig.js
│   │   └── functions/        # Optional: serverless function wrappers
│   │
│   ├── redux/                # Redux store setup
│   │   └── store.js
│   │
│   ├── routes/               # React Router config
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatDate.js
│   │   └── generateInvoice.js
│   │
│   ├── styles/               # Global styles, Tailwind config
│   │   └── index.css
│   │
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Vite entry point
│   └── index.js              # (if using CRA instead of Vite)
│
├── .env                     # Environment variables
├── tailwind.config.js       # TailwindCSS configuration
├── vite.config.js           # Vite configuration
└── package.json
