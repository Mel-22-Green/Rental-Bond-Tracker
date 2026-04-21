# Database & API Design

## 1. Objective  
The objective of this phase is to design a structured data model and define RESTful APIs that support the core functionalities of the Rental Bond Tracker system. This includes identifying key entities, defining relationships between them, and ensuring proper data validation for consistency and reliability.

---

## 2. Activities  

### 2.1 Define Database Schema  
Identify core entities required for the system and design relational tables to store tenancy, bond, and document data.

### 2.2 Define REST APIs  
Design API endpoints to allow communication between frontend and backend systems for CRUD operations.

### 2.3 Define Data Validation  
Establish validation rules to ensure data accuracy, completeness, and integrity.

---

## 3. Key Design Questions  

### 3.1 What entities exist?  
The system includes the following main entities:

- **Users**  
  Stores tenant account information (login credentials, profile details)

- **Properties**  
  Stores rental property details (address, landlord/agent info)

- **Bonds**  
  Tracks rental bond payments (amount, status, payment date)

- **Inspections**  
  Records property inspections (date, condition notes)

- **Documents**  
  Stores uploaded files (lease agreements, receipts, images)

---

### 3.2 What relationships exist?  

- One **User** can have multiple **Properties**  
- One **Property** can have one **Bond**  
- One **Property** can have multiple **Inspections**  
- One **Property** can have multiple **Documents**  
- One **Inspection** can have multiple **Documents**  

#### Relationship Summary:
- User → Property (1:N)  
- Property → Bond (1:1)  
- Property → Inspection (1:N)  
- Property → Document (1:N)  
- Inspection → Document (1:N)  

---

### 3.3 What APIs are required?  

The system requires RESTful APIs for managing users, properties, bonds, inspections, and documents.

---

## 4. Deliverables  

### 4.1 Database Schema (Example)

#### Users Table
- user_id (PK)
- name
- email (unique)
- password_hash
- created_at

#### Properties Table
- property_id (PK)
- user_id (FK)
- address
- landlord_name
- landlord_contact

#### Bonds Table
- bond_id (PK)
- property_id (FK)
- amount
- payment_date
- status

#### Inspections Table
- inspection_id (PK)
- property_id (FK)
- inspection_date
- notes

#### Documents Table
- document_id (PK)
- property_id (FK)
- inspection_id (FK, nullable)
- file_url
- file_type
- uploaded_at

---

### 4.2 API Specification 

#### User APIs
- POST /api/users/register  
- POST /api/users/login  
- GET /api/users/profile  

#### Property APIs
- POST /api/properties  
- GET /api/properties  
- GET /api/properties/{id}  
- PUT /api/properties/{id}  
- DELETE /api/properties/{id}  

#### Bond APIs
- POST /api/bonds  
- GET /api/bonds/{property_id}  
- PUT /api/bonds/{id}  

#### Inspection APIs
- POST /api/inspections  
- GET /api/inspections/{property_id}  
- PUT /api/inspections/{id}  
- DELETE /api/inspections/{id}  

#### Document APIs
- POST /api/documents  
- GET /api/documents/{property_id}  
- DELETE /api/documents/{id}  

---

### 4.3 Data Validation Rules 

- Email must be valid format and unique  
- Password must be at least 6 characters  
- Bond amount must be a positive number  
- Required fields cannot be empty  
- File uploads must be limited to allowed formats (PDF, JPG, PNG)  
- Dates must follow standard format (YYYY-MM-DD)  

---
