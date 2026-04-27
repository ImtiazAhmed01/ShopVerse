# Odyssey E-Commerce Assessment

A high-performance, modern e-commerce web application prototype built using Next.js (App Router). This assessment task demonstrates best practices in layout design, state management, complex API integration, and mock Firebase authentication.

## ✨ Key Features

- **Modern Tech Stack**: Built with Next.js 15 App Router, React 19, and Tailwind CSS v4.
- **Premium Design System**: Glassmorphism UI, cohesive spacing, and micro-hover animations using purely Tailwind utilities.
- **Mock Authentication Engine**: A robust mock of Firebase Auth using Context API and `localStorage` to simulate asynchronous sign-in, sign-up, and persistent sessions.
- **Products API**: Integrates with the [Fake Store API](https://fakestoreapi.com/) for rich, realistic product mock data.
- **Advanced Filtering**: Client-side filtering by category and sorting by price/rating.
- **Protected Routes**: Client-side protected route middleware ensuring only logged-in users can add or manage custom products.
- **Local Persistence**: Any products added manually are saved in `localStorage` and merged seamlessly alongside external API products on the main store page.

## 🚀 Setup & Installation

1. Ensure you have Node.js 18+ installed.
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛣️ Route Summary

### Public Pages
- `/` - Landing Page (Hero, Trending Products, Categories, Testimonials)
- `/about` - About Page (Mission statement, Tech stack)
- `/products` - Browse All Products (Search, Filter, Sort)
- `/products/[id]` - Product Detail View
- `/login` - Authentication Login Form
- `/register` - Authentication Sign-up form

### Protected Pages
- `/products/add` - Form to create a new custom product.
- `/products/manage` - Dashboard table to view and delete custom created products.

## 📡 API Usage

This application strictly relies on the REST API provided by [fakestoreapi.com](https://fakestoreapi.com/).

| Method | Endpoint | Description | Side |
|--------|----------|-------------|------|
| `GET`  | `/products` | Fetch all products list (Server/Client) | Server-Side Fetch |
| `GET`  | `/products?limit=4` | Fetch featured products for Landing | Server-Side Fetch |
| `GET`  | `/products/[id]` | Fetch single product info detail | Server-Side Fetch |
| `GET`  | `/products/category/[cat]` | Fetch related items by matching category | Server-Side Fetch |

---

*Note: For the actual Firebase integration, you simply need to initialize the real config in a utility file and replace the mock function calls in `src/context/AuthContext.tsx` with the real Firebase async methods (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, etc.) The rest of the app will instantly plug into the live data.*
