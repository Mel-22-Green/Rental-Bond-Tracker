# Requirements Gathering

## User Personas

### 1. Primary User: Tenant (Renter)
- **Age:** 18–40  
- **Tech level:** Basic to intermediate  

**Goals:**
- Track rental bond payments and refunds  
- Store documents (lease, receipts)  
- Record inspection details  

**Pain Points:**
- Losing documents  
- Disputes during bond claims  
- Lack of transparency  

---

### 2. Secondary User: Property Manager / Landlord (Optional Future User)

**Goals:**
- View tenant records  
- Verify bond and inspection data  

---

## Functional Requirements

### Core Features
- User registration, login, and profile management  
- Property management (add/edit/delete properties)  
- Rental bond tracking (amount, status, refund)  
- Inspection record management (notes, photos)  
- Document upload and storage  
- Dashboard with summary and quick actions  

### Examples
- The system shall allow tenants to register and log in  
- The system shall allow tenants to add and manage properties  
- The system shall allow tenants to track bond payments and refunds  
- The system shall allow tenants to upload and manage documents  
- The system shall display dashboard summaries  

---

## Non-Functional Requirements

### Performance
- Pages load within 3 seconds  
- API response within 500ms  

### Security
- Password encryption  
- HTTPS communication  
- Protection against SQL injection & XSS  

### Usability
- Easy to use (no training required)  
- Responsive design (mobile, tablet, desktop)  

### Reliability
- 99.5% uptime  
- Daily backups  

### Scalability & Maintainability
- Supports growing users  
- Code stored in GitHub  

---

## User Stories

### Account Management
- As a tenant  
- I want to create an account  
- So that I can access my rental data  

### Property Management
- As a tenant  
- I want to add my rental property  
- So that I can manage my lease information  

### Bond Tracking
- As a tenant  
- I want to record my bond payment  
- So that I can track refund status  

### Inspection Records
- As a tenant  
- I want to upload inspection photos  
- So that I can provide proof of property condition  

### Document Storage
- As a tenant  
- I want to upload lease documents  
- So that I can keep them safe and accessible  

---

## Acceptance Criteria

### Example 1: User Registration
- User can enter email and password  
- System validates input  
- Account is created successfully  
- Error shown if email already exists  

### Example 2: Add Property
- User enters property details  
- System saves data correctly  
- Property appears in list view  

### Example 3: Record Bond
- User enters bond amount and date  
- System stores and displays bond status  
- User can update status (Paid, Pending, Refunded)  

### Example 4: Upload Document
- User uploads file (PDF, PNG, etc.)  
- File size must be ≤ 10MB  
- Document is saved and viewable  
