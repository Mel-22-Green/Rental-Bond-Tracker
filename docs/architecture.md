## Architecture Diagram
<img width="820" height="1187" alt="image" src="https://github.com/user-attachments/assets/5661abc7-d451-4a02-842a-a212df0487b6" />

### System Architecture Explanation

This diagram represents a **3-layer architecture** of the Rental Bond Tracker system.

The system is accessed by the **User (Tenant)** through a web browser (frontend). The frontend communicates securely with the backend using **HTTPS**.

### Application Layer (Node.js + Express)
The Application Layer acts as an **API Gateway**, responsible for receiving and processing all incoming requests from the frontend and routing them to the appropriate services.

### Core Services Layer
This layer consists of modular services, each handling a specific functionality:

- **Auth Service** – Handles user authentication and login
- **Property Service** – Manages property information
- **Inspection Service** – Handles inspection records
- **Document Service** – Manages file uploads and documents

### Data Layer
The system interacts with the following components for data storage:

- **MySQL Database** – Stores structured data such as users, bonds, and properties
- **File Storage / Cloud** – Stores uploaded documents and images

### External Services
The system can also integrate with external services such as:

- SMS services  
- Email services  
- Notification systems  


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

## Data Flow Diagram
