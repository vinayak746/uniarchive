# UniArchive

UniArchive is a library management platform designed to replace the current system at our university. It's a full-stack application built with React, TypeScript, and Tailwind CSS for the frontend, and Express.js, TypeScript, and MongoDB with Mongoose for the backend.

## Features

- **Book Management:** Add and delete books with details like ISBN, title, authors, genres, and copies.
- **User Management:** Manage user accounts with different roles (student, faculty, etc.).
- **Book Issuing and Returning:** Track book issues, due dates, and fines.
- **Search Functionality:** Search for books by title.
- **User Roles:** Implement different user roles with specific loan periods.
- **QR code based user checkin and checkout.**
- **And more (see `TODO.md` files).**

## Technology Stack

- **Frontend:**
  - Vite (React + TS)
  - Tailwind CSS
  - Lucide Icons
  - React Router (loaders and actions)
- **Backend:**
  - Express.js
  - TypeScript
  - Mongoose (MongoDB ODM)
  - JWT (JSON Web Tokens)
    Alright, here's a comprehensive README.md file for your UniArchive project, incorporating all the information we've discussed:

Markdown

# UniArchive

UniArchive is a library management platform designed to replace the current system at our university. It's a full-stack application built with React, TypeScript, and Tailwind CSS for the frontend, and Express.js, TypeScript, and MongoDB with Mongoose for the backend.

## Features

- **Book Management:** Add, edit, and delete books with details like ISBN, title, authors, genres, and copies.
- **User Management:** Manage user accounts with different roles (student, faculty, etc.).
- **Book Issuing and Returning:** Track book issues, due dates, and fines.
- **Search Functionality:** Search for books by title, author, or ISBN.
- **User Roles:** Implement different user roles with specific permissions.
- **QR code based book checkout.**
- **And more (see `TODO.md` files).**

## Technology Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router (loaders and actions)
- **Backend:**
  - Express.js
  - TypeScript
  - Mongoose (MongoDB ODM)
  - JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js and npm (or yarn). (Latest LTS version recommended)
- MongoDB (local or cloud-based).

### Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/mind0bender/uniarchive.git](https://github.com/mind0bender/uniarchive.git)
    cd uniarchive
    ```

2.  **Install dependencies:**

    ```bash
    cd server
    yarn # or npm install
    cd ../client
    yarn # or npm install
    ```

3.  **Environment variables:**

    - Create `.env` files in both the `server` and `client` directories based on the `.env.example` files.
    - Populate the `.env` files with the required environment variables.
    - Refer to the `.env.example` files in the `server` and `client` directories for the list of required variables and their expected formats.

4.  **Start the development servers:**

    - **Server:**

      ```bash
      cd ../server
      yarn dev # or npm run dev
      ```

      (Server runs on port 8080 by default)

    - **Client:**

      ```bash
      cd ../client
      yarn dev # or npm run dev
      ```

      (Client runs on port 5173 by default)

### Available Scripts

Please refer to the `package.json` files in both the `client` and `server` directories for a list of available scripts.

### Database Schema

The database schema is defined using Mongoose schemas in the `server/src/db/models` directory.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.
