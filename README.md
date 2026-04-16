# Enterprise-Grade Dynamic Portfolio & Blog Platform

This repository contains the source code for a comprehensive, enterprise-grade personal portfolio and blog platform. It is a full-stack application built with a modern tech stack, featuring a dynamic content management system powered by a dedicated admin dashboard and a Supabase backend.

**[➡️ View Live Demo](https://portfolio-fady-fathey.vercel.app/)**

![Project Screenshot](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop)

---

## ✨ Core Features

This project is more than just a static portfolio; it's a complete content platform with a robust set of features designed for scalability and ease of management.

-   ✅ **Enterprise-Ready UI/UX:** A modern, clean, and professional design built with **Tailwind CSS** and **shadcn/ui**, providing a premium, SaaS-like user experience.
-   ✅ **100% Responsive Design:** Flawless viewing and interaction across all devices, from mobile phones to desktop monitors.
-   ✅ **Comprehensive Admin Dashboard:** A secure, authenticated dashboard to manage every dynamic aspect of the site.
-   ✅ **Dynamic Project Management:** Full CRUD (Create, Read, Update, Delete) functionality for portfolio projects, including image uploads and featured status toggling.
-   ✅ **Dynamic Blog Management:** Full CRUD functionality for blog posts, with rich text editing, image uploads, and a draft/published system.
-   ✅ **Dynamic Site-Wide Content:** Manage content for all major sections (Hero, About, etc.) directly from the admin dashboard without touching the code.
-   ✅ **Custom Display Ordering:** Control the sort order of projects and blog posts to curate how content is presented to users.
-   ✅ **Integrated CV Management:** A dedicated section in the dashboard to upload and update a PDF resume, with a live preview and download link on the main site.
-   ✅ **Full Supabase Integration:** Leverages the power of Supabase for:
    -   **Authentication:** Secure admin login.
    -   **Database:** PostgreSQL database for all dynamic content.
    -   **Storage:** Manages all media uploads (project images, blog assets, CV file).
    -   **APIs:** Instant, real-time data fetching and updates.
-   ✅ **High-Performance & SEO-Ready:**
    -   Built with **Vite** for a fast development experience and optimized production builds.
    -   Optimized image loading to ensure fast page speeds.
    -   SEO-friendly with proper meta tags, structured data (schema.org), and a `robots.txt` file.
-   ✅ **Clean & Scalable Codebase:** Written in **TypeScript** with a component-based architecture and custom hooks for maintainability and future expansion.

---

## 🛠️ Tech Stack

This project is built using a modern, robust, and scalable technology stack.

-   **Frontend:** React.js, TypeScript, Vite
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Routing:** React Router DOM
-   **State Management:** TanStack Query (React Query) for server state management
-   **Backend (BaaS):** Supabase (PostgreSQL Database, Auth, Storage)
-   **Form Management:** React Hook Form
-   **Linting & Formatting:** ESLint

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally for development.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone [https://github.com/FadyFathey/fady-maher-universe.git](https://github.com/FadyFathey/fady-maher-universe.git)
cd fady-maher-universe
```

### 2. Install Dependencies

Install the required project dependencies.

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

This project requires a connection to a Supabase project.

1.  Sign up for a free account at [supabase.com](https://supabase.com/).
2.  Create a new project.
3.  Go to **Project Settings > API**.
4.  Find your **Project URL** and **`anon` (public) key**.
5.  Update the connection details in the Supabase client file:

    ```typescript
    // src/integrations/supabase/client.ts

    const SUPABASE_URL = "YOUR_SUPABASE_URL";
    const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_ANON_KEY";
    ```

    *Note: For a production setup, it is highly recommended to use environment variables (`.env` file) for these keys.*

### 4. Set Up Supabase Database

You will need to set up the database tables that the application uses. You can find the schema details within the Supabase types file (`src/integrations/supabase/types.ts`) or run the SQL statements from your Supabase project's SQL Editor to create the `projects`, `blogs`, and `site_sections` tables.

### 5. Run the Development Server

Start the local development server.

```bash
npm run dev
# or
yarn dev
```

The application will now be running at `http://localhost:8080`.

---

## 🔐 Admin Access

-   To access the admin dashboard, navigate to `/admin-login`.
-   The default admin credentials are set within the `AdminLogin.tsx` component. For a production environment, you should implement a more secure authentication check, potentially based on user roles within your Supabase project.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
