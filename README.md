# 💰 Expense Tracker

A **full-stack expense management application** built with **React, Next.js, Tailwind (Shadcn UI), Clerk, Drizzle ORM, Neon, and PostgreSQL**.  
This app enables users to securely track, categorize, and analyze their expenses with real-time data visualization.

---

## 🚀 Features

- ✅ **CRUD Operations** – Add, update, and delete expenses  
- 📊 **Analytics Dashboard** – Bar chart visualization of spending patterns  
- 🗂 **Budget Categorization** – Track expenses by categories like food, rent, travel, etc.  
- 🔐 **Authentication & Authorization** – Powered by [Clerk.com](https://clerk.com)  
- ⚡ **Modern Stack** – Next.js App Router, Tailwind CSS with Shadcn components  
- 🗄 **Database Layer** – PostgreSQL hosted on Neon with type-safe queries via Drizzle ORM  

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js 14 (App Router), TailwindCSS, Shadcn UI  
- **Authentication:** Clerk  
- **Backend & API:** Next.js API routes  
- **Database:** PostgreSQL (Neon)  
- **ORM:** Drizzle ORM (type-safe queries + migrations)  
- **Charts:** Recharts  

---

## ⚙️ Installation & Setup

```bash
### 1. Clone the Repository
   
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker

### 2. Install Dependencies

npm install


### 3. Set Environment Variables
Create a .env.local file in the root and add:

DATABASE_URL=your_neon_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key


### 4. Run Database Migrations

npx drizzle-kit migrate


### 5. Start Development Server

npm run dev
