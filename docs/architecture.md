## Technology Stack

### Frontend
- React.js (for building user interface and forms)

### Backend
- Node.js with Express.js (for API development and business logic)

### Database
- PostgreSQL (for storing structured tenancy data)

### Authentication
- JSON Web Token (JWT) for secure login and session management

### Deployment (optional)
- Vercel (Frontend)
- Render / Railway (Backend & Database)

---

## Component Description

### 1. Frontend (React Application)
Handles user interaction, including forms for bond tracking, property details, inspections, and document uploads. It communicates with the backend through RESTful APIs and displays data on the dashboard.

### 2. Backend (Node.js / Express Server)
Processes client requests, handles business logic, and manages communication between the frontend and database. It includes API endpoints for users, bonds, properties, inspections, and documents.

### 3. Authentication Service
Manages user registration and login. Uses JWT to verify user identity and protect secured routes.

### 4. Database (PostgreSQL)
Stores all system data, including user accounts, bond records, property details, inspection reports, and uploaded documents in a structured relational format.

### 5. Application Logic Layer
Handles core functionalities such as bond tracking, property management, inspection recording, and document storage.
