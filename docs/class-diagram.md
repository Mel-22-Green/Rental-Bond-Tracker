# Class Diagram - Rental Bond Tracker

---

## Overview

The Class Diagram shows the static structure of the Rental Bond Tracker system, including classes, attributes, methods, and the relationships between them. This diagram helps understand how different parts of the system are organized and how they interact with each other.

---

## Diagram Placeholder

**Image:** `![Class Diagram]`
<img width="927" height="634" alt="image" src="https://github.com/user-attachments/assets/b51f9a0d-3c2c-49fe-80b3-da0f7bc44fb6" />



---

## Class Details

### 1. User Class

The User class represents tenant accounts in the system.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| user_id | int | Unique identifier for the user |
| full_name | string | User's full name |
| email | string | Login email address |
| password | string | MD5 encrypted password |
| phone | string | Contact phone number |
| created_at | datetime | Account creation timestamp |
| updated_at | datetime | Last update timestamp |
| last_login | datetime | Last login timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| register() | bool | Creates a new user account |
| login() | object | Authenticates user and returns session |
| updateProfile() | bool | Updates user profile information |
| changePassword() | bool | Changes user password |
| deleteAccount() | bool | Deletes user account permanently |

---

### 2. Property Class

The Property class represents rental property details.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| property_id | int | Unique identifier for the property |
| user_id | int | Foreign key referencing User |
| address | string | Property street address |
| landlord_name | string | Name of the landlord |
| landlord_phone | string | Landlord contact number |
| landlord_email | string | Landlord email address |
| agent_name | string | Property agent name |
| agent_phone | string | Agent contact number |
| lease_start | date | Lease start date |
| lease_end | date | Lease end date |
| is_current | bool | Flag for current residence |
| created_at | datetime | Record creation timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| addProperty() | bool | Adds a new property to the system |
| editProperty() | bool | Updates existing property details |
| deleteProperty() | bool | Removes a property from the system |
| getProperties() | array | Retrieves all properties for a user |

---

### 3. Bond Class

The Bond class represents rental bond payment records.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| bond_id | int | Unique identifier for the bond |
| property_id | int | Foreign key referencing Property |
| amount | decimal | Bond amount in Australian dollars |
| payment_date | date | Date the bond was paid |
| reference_no | string | Bond reference number |
| status | string | Current status (Paid/Pending/Refunded) |
| refund_amount | decimal | Amount refunded (if applicable) |
| refund_date | date | Date of refund (if applicable) |
| created_at | datetime | Record creation timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| recordBond() | bool | Records a new bond payment |
| updateStatus() | bool | Updates bond status |
| getBondHistory() | array | Retrieves bond history for a user |

---

### 4. Inspection Class

The Inspection class represents property inspection records.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| inspection_id | int | Unique identifier for the inspection |
| property_id | int | Foreign key referencing Property |
| inspection_date | date | Date the inspection was conducted |
| inspection_type | string | Type (Entry/Routine/Exit) |
| condition_notes | text | Detailed condition notes |
| rating | int | Rating from 1 to 5 |
| created_at | datetime | Record creation timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| createInspection() | bool | Creates a new inspection record |
| uploadPhotos() | bool | Uploads photos for the inspection |
| getInspections() | array | Retrieves inspections for a property |

---

### 5. InspectionPhoto Class

The InspectionPhoto class represents photos attached to inspections.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| photo_id | int | Unique identifier for the photo |
| inspection_id | int | Foreign key referencing Inspection |
| photo_path | string | Path or URL to the stored photo |
| uploaded_at | datetime | Upload timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| uploadPhoto() | bool | Uploads a photo to the inspection |
| deletePhoto() | bool | Deletes a photo from the inspection |

---

### 6. Document Class

The Document class represents uploaded tenancy documents.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| document_id | int | Unique identifier for the document |
| user_id | int | Foreign key referencing User |
| property_id | int | Foreign key referencing Property |
| bond_id | int | Foreign key referencing Bond |
| title | string | Document title |
| description | text | Optional document description |
| file_name | string | Original file name |
| file_path | string | Storage path or URL |
| file_type | string | MIME type of the file |
| file_size | int | File size in bytes |
| uploaded_at | datetime | Upload timestamp |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| uploadDocument() | bool | Uploads a document to storage |
| downloadDocument() | file | Downloads a document file |
| deleteDocument() | bool | Deletes a document from storage |

---

### 7. AuditLog Class

The AuditLog class records system activities for security.

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| log_id | int | Unique identifier for the log |
| user_id | int | Foreign key referencing User |
| action_type | string | Type of action (CREATE/READ/UPDATE/DELETE/LOGIN) |
| module | string | Module where action occurred |
| description | text | Human readable description |
| ip_address | string | Client IP address |
| user_agent | text | Browser and device information |
| timestamp | datetime | When the action occurred |

**Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| logActivity() | bool | Logs a user activity |
| getAuditLogs() | array | Retrieves audit logs for a user |
| exportLogs() | file | Exports logs as CSV or PDF |

---

## Class Relationships

The diagram shows the following relationships between classes:

| Relationship | Type | Description |
|--------------|------|-------------|
| User → Property | One to Many | One user can have multiple properties |
| User → Document | One to Many | One user can upload multiple documents |
| User → AuditLog | One to Many | One user can have multiple log entries |
| Property → Bond | One to One | One property has one bond record |
| Property → Inspection | One to Many | One property can have multiple inspections |
| Property → Document | One to Many | One property can have multiple documents |
| Inspection → InspectionPhoto | One to Many | One inspection can have multiple photos |

---

## Relationship Notation

| Symbol | Meaning |
|--------|---------|
| 1 | Exactly one instance |
| * (asterisk) | Zero or many instances |
| 0..1 | Zero or one instance (optional) |
| Solid Line | Required relationship |
| Dashed Line | Optional relationship |

---

## File Location

Once uploaded, the class diagram image will be stored at:
`/docs/diagrams/class-diagram.png`

---

## Tool Used

The Class Diagram was created using **draw.io (diagrams.net)** , the same tool used for other system diagrams including DFDs, ERD, and sequence diagrams.

---

**END OF CLASS DIAGRAM**
