SYSTEM ARCHITECTURE (Rental Bond Tracker)
This system follows a 3-tier layered architecture consisting of Presentation Layer, Application Layer, and Data Layer.

Presentation Layer:
The user (tenant) interacts with the system through a web browser. The frontend web application provides the user interface and communicates with the backend via HTTPS for secure data transmission.

Application Layer:
The backend is built using Node.js and Express, acting as an API Gateway. It processes incoming requests and routes them to different core services:
- Auth Service: Handles user authentication and login
- Property Service: Manages property details
- Inspection Service: Handles inspection records
- Document Service: Manages file uploads and documents

Core services are modular and ensure separation of concerns within the system.

Data Layer:
The system uses a relational database (MySQL) to store structured data such as users, properties, and bonds. File storage (cloud or local) is used to store documents and images.

External Services:
The system can integrate with external services such as SMS, Email, and Notification systems for communication.

Data Flow:
- Downward arrows represent write/request operations
- Upward arrows represent read/response operations
- Horizontal arrows represent communication between services or external APIs
