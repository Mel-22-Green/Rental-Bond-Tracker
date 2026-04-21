# API Specification - Rental Bond Tracker

---

## 1. Objective

The objective of this phase is to define RESTful APIs that enable communication between the frontend (React) and backend (Node.js/Express) systems. The APIs support all CRUD operations for users, properties, bonds, inspections, and documents.

---

## 2. Base Information

| Item | Value |
|------|-------|
| Base URL (Development) | http://localhost:5000/api |
| Base URL (Production) | https://rental-bond-tracker.onrender.com/api |
| Response Format | JSON |
| Authentication | JWT Bearer Token |

---

## 3. Authentication Header

For all protected endpoints, include this header:

Authorization: Bearer <your_jwt_token>

---

## 4. Response Codes

| Status Code | Meaning |
|-------------|---------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid input or validation error |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Authenticated but not authorized |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Server error |

---

## 5. Common Response Formats

Success Response:
{
    "message": "Operation completed successfully",
    "data": {}
}

Error Response:
{
    "error": "Error description here"
}

---

## 6. Authentication APIs

### 6.1 Register User

Create a new tenant account.

| Field | Value |
|-------|-------|
| Endpoint | /auth/register |
| Method | POST |
| Auth Required | No |

Request Body:
{
    "full_name": "John Tenant",
    "email": "john@example.com",
    "password": "12345678",
    "phone": "0412345678"
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| full_name | string | Yes | User's full name |
| email | string | Yes | Valid email address (must be unique) |
| password | string | Yes | Minimum 8 characters |
| phone | string | No | Contact number |

Success Response (201 Created):
{
    "message": "User registered successfully",
    "user": {
        "user_id": 1,
        "full_name": "Aayush Tenant",
        "email": "Aayush@example.com"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | Email already registered |
| 400 | Password must be at least 8 characters |
| 500 | Server error |

---

### 6.2 Login User

Authenticate a user and receive JWT token.

| Field | Value |
|-------|-------|
| Endpoint | /auth/login |
| Method | POST |
| Auth Required | No |

Request Body:
{
    "email": "Aayush@example.com",
    "password": "12345678"
}

Success Response (200 OK):
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "user_id": 1,
        "full_name": "Aayush Tenant",
        "email": "Aayush@example.com"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 401 | Invalid email or password |
| 500 | Server error |

---

### 6.3 Logout User

Invalidate user session.

| Field | Value |
|-------|-------|
| Endpoint | /auth/logout |
| Method | POST |
| Auth Required | Yes |

Success Response (200 OK):
{
    "message": "Logged out successfully"
}

---

### 6.4 Change Password

Change user password.

| Field | Value |
|-------|-------|
| Endpoint | /auth/change-password |
| Method | PUT |
| Auth Required | Yes |

Request Body:
{
    "current_password": "old123456",
    "new_password": "new123456"
}

Success Response (200 OK):
{
    "message": "Password changed successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 401 | Current password is incorrect |
| 400 | New password must be at least 8 characters |
| 500 | Server error |

---

### 6.5 Forgot Password

Request password reset link.

| Field | Value |
|-------|-------|
| Endpoint | /auth/forgot-password |
| Method | POST |
| Auth Required | No |

Request Body:
{
    "email": "Aayush@example.com"
}

Success Response (200 OK):
{
    "message": "Password reset link sent to your email"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Email not found |
| 500 | Server error |

---

### 6.6 Reset Password

Reset password using token from email.

| Field | Value |
|-------|-------|
| Endpoint | /auth/reset-password |
| Method | POST |
| Auth Required | No |

Request Body:
{
    "token": "reset_token_from_email",
    "new_password": "new123456"
}

Success Response (200 OK):
{
    "message": "Password reset successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | Invalid or expired token |
| 400 | Password must be at least 8 characters |
| 500 | Server error |

---

## 7. Property APIs

### 7.1 Get All Properties

Get all properties for the logged-in user.

| Field | Value |
|-------|-------|
| Endpoint | /properties |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
[
    {
        "property_id": 1,
        "user_id": 1,
        "address": "123 Main Street, Melbourne VIC 3000",
        "landlord_name": "Jane Smith",
        "landlord_phone": "0412345678",
        "landlord_email": "jane@email.com",
        "agent_name": "Real Estate Agency",
        "agent_phone": "0398765432",
        "lease_start": "2026-01-01",
        "lease_end": "2027-01-01",
        "is_current": true,
        "created_at": "2026-04-01T10:00:00Z"
    }
]

---

### 7.2 Get Single Property

Get a specific property by ID.

| Field | Value |
|-------|-------|
| Endpoint | /properties/{id} |
| Method | GET |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Property ID |

Success Response (200 OK):
{
    "property_id": 1,
    "user_id": 1,
    "address": "123 Main Street, Melbourne VIC 3000",
    "landlord_name": "Aayush Bhandari",
    "landlord_phone": "0412345678",
    "landlord_email": "Aayush@email.com",
    "agent_name": "Real Estate Agency",
    "agent_phone": "0398765432",
    "lease_start": "2026-01-01",
    "lease_end": "2027-01-01",
    "is_current": true,
    "created_at": "2026-04-01T10:00:00Z"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Property not found |
| 403 | You do not have access to this property |

---

### 7.3 Add Property

Add a new property.

| Field | Value |
|-------|-------|
| Endpoint | /properties |
| Method | POST |
| Auth Required | Yes |

Request Body:
{
    "address": "123 Main Street, Melbourne VIC 3000",
    "landlord_name": "Aayush Bhandari",
    "landlord_phone": "0412345678",
    "landlord_email": "Aayush@email.com",
    "agent_name": "Real Estate Agency",
    "agent_phone": "0398765432",
    "lease_start": "2026-01-01",
    "lease_end": "2027-01-01",
    "is_current": true
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| address | string | Yes | Property address |
| landlord_name | string | Yes | Landlord full name |
| landlord_phone | string | No | Landlord contact number |
| landlord_email | string | No | Landlord email address |
| agent_name | string | No | Property agent name |
| agent_phone | string | No | Agent contact number |
| lease_start | date | No | Lease start date (YYYY-MM-DD) |
| lease_end | date | No | Lease end date (YYYY-MM-DD) |
| is_current | boolean | No | Current residence flag |

Success Response (201 Created):
{
    "message": "Property added successfully",
    "property": {
        "property_id": 1,
        "address": "123 Main Street, Melbourne VIC 3000",
        "landlord_name": "Aayush Bhandari"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | Address is required |
| 400 | Landlord name is required |
| 500 | Server error |

---

### 7.4 Update Property

Update an existing property.

| Field | Value |
|-------|-------|
| Endpoint | /properties/{id} |
| Method | PUT |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Property ID |

Request Body:
{
    "address": "456 New Street, Melbourne VIC 3000",
    "landlord_name": "Aayush Bhandari Updated",
    "is_current": false
}

Success Response (200 OK):
{
    "message": "Property updated successfully",
    "property": {
        "property_id": 1,
        "address": "456 New Street, Melbourne VIC 3000",
        "landlord_name": "Aayush Bhandari Updated"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Property not found |
| 403 | You do not have access to this property |
| 500 | Server error |

---

### 7.5 Delete Property

Delete a property.

| Field | Value |
|-------|-------|
| Endpoint | /properties/{id} |
| Method | DELETE |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Property ID |

Success Response (200 OK):
{
    "message": "Property deleted successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Property not found |
| 403 | You do not have access to this property |
| 400 | Cannot delete property with active bond |
| 500 | Server error |

---

## 8. Bond APIs

### 8.1 Get All Bonds

Get all bonds for the logged-in user.

| Field | Value |
|-------|-------|
| Endpoint | /bonds |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
[
    {
        "bond_id": 1,
        "property_id": 1,
        "property_address": "123 Main Street, Melbourne",
        "amount": 2000.00,
        "payment_date": "2026-01-15",
        "reference_no": "BOND123456",
        "status": "Paid",
        "refund_amount": null,
        "refund_date": null,
        "created_at": "2026-01-15T10:00:00Z"
    }
]

---

### 8.2 Get Bond by Property

Get bond for a specific property.

| Field | Value |
|-------|-------|
| Endpoint | /bonds/property/{property_id} |
| Method | GET |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| property_id | integer | Property ID |

Success Response (200 OK):
{
    "bond_id": 1,
    "property_id": 1,
    "amount": 2000.00,
    "payment_date": "2026-01-15",
    "reference_no": "BOND123456",
    "status": "Paid",
    "refund_amount": null,
    "refund_date": null
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Bond not found for this property |

---

### 8.3 Add Bond

Record a new bond payment.

| Field | Value |
|-------|-------|
| Endpoint | /bonds |
| Method | POST |
| Auth Required | Yes |

Request Body:
{
    "property_id": 1,
    "amount": 2000.00,
    "payment_date": "2026-01-15",
    "reference_no": "BOND123456",
    "status": "Paid"
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| property_id | integer | Yes | Associated property ID |
| amount | decimal | Yes | Bond amount in AUD (positive number) |
| payment_date | date | Yes | Date bond was paid (YYYY-MM-DD) |
| reference_no | string | No | Bond reference number |
| status | string | Yes | Paid, Pending, or Refunded |

Success Response (201 Created):
{
    "message": "Bond recorded successfully",
    "bond": {
        "bond_id": 1,
        "property_id": 1,
        "amount": 2000.00,
        "status": "Paid"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | Amount must be positive |
| 400 | Invalid status value |
| 404 | Property not found |
| 500 | Server error |

---

### 8.4 Update Bond Status

Update the status of a bond.

| Field | Value |
|-------|-------|
| Endpoint | /bonds/{id}/status |
| Method | PUT |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Bond ID |

Request Body:
{
    "status": "Refunded",
    "refund_amount": 2000.00,
    "refund_date": "2026-12-15"
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | string | Yes | Paid, Pending, or Refunded |
| refund_amount | decimal | If status=Refunded | Amount refunded |
| refund_date | date | If status=Refunded | Date of refund |

Success Response (200 OK):
{
    "message": "Bond status updated successfully",
    "bond": {
        "bond_id": 1,
        "status": "Refunded",
        "refund_amount": 2000.00,
        "refund_date": "2026-12-15"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Bond not found |
| 400 | Refund amount required when status is Refunded |
| 500 | Server error |

---

### 8.5 Delete Bond

Delete a bond record.

| Field | Value |
|-------|-------|
| Endpoint | /bonds/{id} |
| Method | DELETE |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Bond ID |

Success Response (200 OK):
{
    "message": "Bond deleted successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Bond not found |
| 403 | You do not have access to this bond |
| 500 | Server error |

---

## 9. Inspection APIs

### 9.1 Get All Inspections

Get all inspections for the logged-in user.

| Field | Value |
|-------|-------|
| Endpoint | /inspections |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
[
    {
        "inspection_id": 1,
        "property_id": 1,
        "property_address": "123 Main Street, Melbourne",
        "inspection_date": "2026-03-15",
        "inspection_type": "Routine",
        "condition_notes": "Property in good condition",
        "rating": 4,
        "created_at": "2026-03-15T10:00:00Z",
        "photos": [
            {
                "photo_id": 1,
                "photo_path": "/uploads/photo1.jpg"
            }
        ]
    }
]

---

### 9.2 Get Inspections by Property

Get inspections for a specific property.

| Field | Value |
|-------|-------|
| Endpoint | /inspections/property/{property_id} |
| Method | GET |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| property_id | integer | Property ID |

Success Response (200 OK):
[
    {
        "inspection_id": 1,
        "inspection_date": "2026-03-15",
        "inspection_type": "Routine",
        "condition_notes": "Property in good condition",
        "rating": 4
    }
]

---

### 9.3 Add Inspection

Create a new inspection record.

| Field | Value |
|-------|-------|
| Endpoint | /inspections |
| Method | POST |
| Auth Required | Yes |

Request Body:
{
    "property_id": 1,
    "inspection_date": "2026-03-15",
    "inspection_type": "Routine",
    "condition_notes": "Property in good condition",
    "rating": 4
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| property_id | integer | Yes | Associated property ID |
| inspection_date | date | Yes | Date of inspection (YYYY-MM-DD) |
| inspection_type | string | Yes | Entry, Routine, or Exit |
| condition_notes | string | No | Detailed condition notes |
| rating | integer | No | Rating from 1 to 5 |

Success Response (201 Created):
{
    "message": "Inspection recorded successfully",
    "inspection": {
        "inspection_id": 1,
        "property_id": 1,
        "inspection_date": "2026-03-15",
        "inspection_type": "Routine"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | Invalid inspection type |
| 400 | Rating must be between 1 and 5 |
| 404 | Property not found |
| 500 | Server error |

---

### 9.4 Update Inspection

Update an existing inspection record.

| Field | Value |
|-------|-------|
| Endpoint | /inspections/{id} |
| Method | PUT |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Inspection ID |

Request Body:
{
    "condition_notes": "Updated condition notes",
    "rating": 5
}

Success Response (200 OK):
{
    "message": "Inspection updated successfully",
    "inspection": {
        "inspection_id": 1,
        "condition_notes": "Updated condition notes",
        "rating": 5
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Inspection not found |
| 403 | You do not have access to this inspection |
| 500 | Server error |

---

### 9.5 Delete Inspection

Delete an inspection record.

| Field | Value |
|-------|-------|
| Endpoint | /inspections/{id} |
| Method | DELETE |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Inspection ID |

Success Response (200 OK):
{
    "message": "Inspection deleted successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Inspection not found |
| 403 | You do not have access to this inspection |
| 500 | Server error |

---

### 9.6 Upload Inspection Photo

Upload a photo for an inspection.

| Field | Value |
|-------|-------|
| Endpoint | /inspections/{id}/photos |
| Method | POST |
| Auth Required | Yes |
| Content-Type | multipart/form-data |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Inspection ID |

Request Body (FormData):
{
    "photo": (file)
}

Success Response (201 Created):
{
    "message": "Photo uploaded successfully",
    "photo": {
        "photo_id": 1,
        "photo_path": "/uploads/inspections/photo1.jpg"
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | No file uploaded |
| 400 | File type not supported |
| 400 | File size exceeds 10MB limit |
| 404 | Inspection not found |
| 500 | Server error |

---

### 9.7 Delete Inspection Photo

Delete a photo from an inspection.

| Field | Value |
|-------|-------|
| Endpoint | /inspections/photos/{photo_id} |
| Method | DELETE |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| photo_id | integer | Photo ID |

Success Response (200 OK):
{
    "message": "Photo deleted successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Photo not found |
| 403 | You do not have access to this photo |
| 500 | Server error |

---

## 10. Document APIs

### 10.1 Get All Documents

Get all documents for the logged-in user.

| Field | Value |
|-------|-------|
| Endpoint | /documents |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
[
    {
        "document_id": 1,
        "user_id": 1,
        "property_id": 1,
        "property_address": "123 Main Street, Melbourne",
        "title": "Lease Agreement",
        "file_name": "lease_2026.pdf",
        "file_path": "/uploads/documents/lease_2026.pdf",
        "file_type": "application/pdf",
        "file_size": 1024000,
        "uploaded_at": "2026-04-01T10:00:00Z"
    }
]

---

### 10.2 Get Documents by Property

Get documents for a specific property.

| Field | Value |
|-------|-------|
| Endpoint | /documents/property/{property_id} |
| Method | GET |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| property_id | integer | Property ID |

Success Response (200 OK):
[
    {
        "document_id": 1,
        "title": "Lease Agreement",
        "file_name": "lease_2026.pdf",
        "uploaded_at": "2026-04-01T10:00:00Z"
    }
]

---

### 10.3 Upload Document

Upload a document.

| Field | Value |
|-------|-------|
| Endpoint | /documents/upload |
| Method | POST |
| Auth Required | Yes |
| Content-Type | multipart/form-data |

Request Body (FormData):
{
    "title": "Lease Agreement",
    "description": "Annual lease document",
    "property_id": 1,
    "bond_id": null,
    "file": (file)
}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Document title |
| description | string | No | Document description |
| property_id | integer | No | Associated property ID |
| bond_id | integer | No | Associated bond ID |
| file | file | Yes | The file to upload |

Success Response (201 Created):
{
    "message": "Document uploaded successfully",
    "document": {
        "document_id": 1,
        "title": "Lease Agreement",
        "file_name": "lease_2026.pdf",
        "file_path": "/uploads/documents/lease_2026.pdf",
        "file_size": 1024000
    }
}

Error Responses:
| Status | Message |
|--------|---------|
| 400 | No file uploaded |
| 400 | File type not supported |
| 400 | File size exceeds 10MB limit |
| 400 | Title is required |
| 500 | Server error |

**Supported File Types:**
- PDF (.pdf)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- Word (.docx)

**File Size Limit:** 10MB per file

---

### 10.4 Download Document

Download a document file.

| Field | Value |
|-------|-------|
| Endpoint | /documents/download/{id} |
| Method | GET |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Document ID |

Success Response:
Returns the file as download attachment.

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Document not found |
| 403 | You do not have access to this document |
| 500 | Server error |

---

### 10.5 Delete Document

Delete a document.

| Field | Value |
|-------|-------|
| Endpoint | /documents/{id} |
| Method | DELETE |
| Auth Required | Yes |

URL Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Document ID |

Success Response (200 OK):
{
    "message": "Document deleted successfully"
}

Error Responses:
| Status | Message |
|--------|---------|
| 404 | Document not found |
| 403 | You do not have access to this document |
| 500 | Server error |

---

## 11. Dashboard APIs

### 11.1 Get Dashboard Statistics

Get summary statistics for the dashboard.

| Field | Value |
|-------|-------|
| Endpoint | /dashboard/stats |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
{
    "properties_count": 2,
    "active_bond_amount": 2000.00,
    "inspections_count": 3,
    "documents_count": 5
}

---

### 11.2 Get Recent Items

Get recent properties and documents for the dashboard.

| Field | Value |
|-------|-------|
| Endpoint | /dashboard/recent |
| Method | GET |
| Auth Required | Yes |

Success Response (200 OK):
{
    "recent_properties": [
        {
            "property_id": 1,
            "address": "123 Main Street, Melbourne",
            "landlord_name": "Jane Smith"
        }
    ],
    "recent_documents": [
        {
            "document_id": 1,
            "title": "Lease Agreement",
            "uploaded_at": "2026-04-01T10:00:00Z"
        }
    ],
    "upcoming_inspections": [
        {
            "inspection_id": 1,
            "property_address": "123 Main Street, Melbourne",
            "inspection_date": "2026-05-15"
        }
    ]
}

---

## 12. Audit APIs (Admin Only)

### 12.1 Get Audit Logs

Get all system audit logs. (Admin access only)

| Field | Value |
|-------|-------|
| Endpoint | /audit/logs |
| Method | GET |
| Auth Required | Yes (Admin) |

Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| user_id | integer | Filter by user ID |
| action_type | string | Filter by action type |
| start_date | date | Filter by start date |
| end_date | date | Filter by end date |
| limit | integer | Number of records (default 100) |
| offset | integer | Pagination offset |

Success Response (200 OK):
{
    "total": 150,
    "logs": [
        {
            "log_id": 1,
            "user_id": 1,
            "user_name": "John Tenant",
            "user_email": "john@example.com",
            "action_type": "LOGIN",
            "module": "Authentication",
            "description": "User logged in successfully",
            "ip_address": "192.168.1.1",
            "timestamp": "2026-04-01T10:00:00Z"
        }
    ]
}

---

### 12.2 Export Audit Logs

Export audit logs as CSV or PDF. (Admin access only)

| Field | Value |
|-------|-------|
| Endpoint | /audit/logs/export |
| Method | GET |
| Auth Required | Yes (Admin) |

Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| format | string | csv or pdf (default csv) |
| start_date | date | Filter by start date |
| end_date | date | Filter by end date |

Success Response:
Returns file as download attachment (CSV or PDF).

---

## 13. API Summary Table

| Module | Method | Endpoint | Auth | Description |
|--------|--------|----------|------|-------------|
| Auth | POST | /auth/register | No | Register user |
| Auth | POST | /auth/login | No | Login user |
| Auth | POST | /auth/logout | Yes | Logout user |
| Auth | PUT | /auth/change-password | Yes | Change password |
| Auth | POST | /auth/forgot-password | No | Request reset |
| Auth | POST | /auth/reset-password | No | Reset password |
| Property | GET | /properties | Yes | Get all properties |
| Property | GET | /properties/{id} | Yes | Get single property |
| Property | POST | /properties | Yes | Add property |
| Property | PUT | /properties/{id} | Yes | Update property |
| Property | DELETE | /properties/{id} | Yes | Delete property |
| Bond | GET | /bonds | Yes | Get all bonds |
| Bond | GET | /bonds/property/{id} | Yes | Get bond by property |
| Bond | POST | /bonds | Yes | Add bond |
| Bond | PUT | /bonds/{id}/status | Yes | Update bond status |
| Bond | DELETE | /bonds/{id} | Yes | Delete bond |
| Inspection | GET | /inspections | Yes | Get all inspections |
| Inspection | GET | /inspections/property/{id} | Yes | Get by property |
| Inspection | POST | /inspections | Yes | Add inspection |
| Inspection | PUT | /inspections/{id} | Yes | Update inspection |
| Inspection | DELETE | /inspections/{id} | Yes | Delete inspection |
| Inspection | POST | /inspections/{id}/photos | Yes | Upload photo |
| Inspection | DELETE | /inspections/photos/{id} | Yes | Delete photo |
| Document | GET | /documents | Yes | Get all documents |
| Document | GET | /documents/property/{id} | Yes | Get by property |
| Document | POST | /documents/upload | Yes | Upload document |
| Document | GET | /documents/download/{id} | Yes | Download document |
| Document | DELETE | /documents/{id} | Yes | Delete document |
| Dashboard | GET | /dashboard/stats | Yes | Get stats |
| Dashboard | GET | /dashboard/recent | Yes | Get recent items |
| Audit | GET | /audit/logs | Admin | Get audit logs |
| Audit | GET | /audit/logs/export | Admin | Export audit logs |

---

## 14. Validation Rules Summary

| Field | Validation Rule |
|-------|-----------------|
| Email | Must be valid email format and unique |
| Password | Minimum 8 characters |
| Phone | Optional, valid Australian format if provided |
| Bond Amount | Must be a positive number |
| Payment Date | Cannot be in the future |
| Status | Must be 'Paid', 'Pending', or 'Refunded' |
| File Upload | Max 10MB, allowed types: PDF, JPEG, PNG, DOCX |
| Address | Cannot be empty |
| Landlord Name | Cannot be empty |
| Inspection Date | Cannot be in the future |
| Inspection Type | Must be 'Entry', 'Routine', or 'Exit' |
| Rating | Must be between 1 and 5 |

---

**END OF API SPECIFICATION**
