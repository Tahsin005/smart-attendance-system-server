# Smart Attendance System Server

The robust backend engine powering the Smart Attendance System. Built with the high-performance [Bun](https://bun.sh/) runtime and [Express](https://expressjs.com/), following a clean Repository-Service-Handler architectural pattern.

## Key Features

- **Identity-Verified Authentication**: JWT-based secure access for Employees and Administrators.
- **Geospatial Processing**: Specialized endpoints for real-time location ingestion and history retrieval.
- **Automated Duty Cycles**: Logic for managing active work sessions, duty commencement, and termination.
- **Asset Management**: Integrated with Cloudinary for secure storage of verification selfie assets.
- **Administrative API**: Comprehensive routes for workforce registration, log auditing, and live session monitoring.
- **High-Performance Runtime**: Leveraging Bun's native speed for fast API response times.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express.js](https://expressjs.com/) (v5.x)
- **Database**: SQLite (local `attendance.sqlite`)
- **Storage**: [Cloudinary](https://cloudinary.com/) (Selfie verification storage)
- **Authentication**: JsonWebToken (JWT)
- **File Handling**: Multer

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- Cloudinary account for media storage.

### Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_super_secret_key
DATABASE_URL=attendance.sqlite

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Installation & Execution

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run in development mode (watch mode):
   ```bash
   npm run dev
   ```

3. Start production server:
   ```bash
   npm run start
   ```

## Architecture

The server follows a modular architecture to ensure scalability and testability:

- **`/handlers`**: Request handling and response formatting.
- **`/services`**: Core business logic and coordination of repositories.
- **`/repositories`**: Direct database interactions and query definitions.
- **`/middleware`**: Security, authentication, and file processing logic.
- **`/routes`**: API endpoint definitions.
- **`/config`**: Database and third-party service initializations.
