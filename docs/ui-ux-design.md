# UI/UX Design - Rental Bond Tracker

---

## 1. Objective

The objective of this phase is to design a user-friendly, modern, and responsive interface for the Rental Bond Tracker system. The design focuses on simplicity, clarity, and ease of use for tenants managing their rental bonds, properties, inspections, and documents.

---

## 2. Design Principles

| Principle | Description |
|-----------|-------------|
| Glassmorphism | Transparent frosted glass effect with backdrop blur for modern, premium feel |
| Consistent Layout | Fixed sidebar navigation with collapsible menu for easy access |
| Responsive Design | Adapts to desktop, tablet, and mobile screen sizes |
| Visual Hierarchy | Clear headings, card-based layouts, color-coded status indicators |
| User-Friendly Forms | Simple, well-spaced input fields with icons and validation |
| Accessibility | WCAG 2.1 Level AA compliant, keyboard navigable |

---

## 3. Color Scheme

| Element | Color | Purpose |
|---------|-------|---------|
| Primary Gradient | #667eea to #764ba2 | Buttons, logos, highlights |
| Glass Background | rgba(255,255,255,0.08) | Cards and containers |
| Text Primary | #ffffff | Headings and labels |
| Text Secondary | rgba(255,255,255,0.7) | Subtitles and descriptions |
| Success (Paid) | #10b981 | Bond status badge |
| Warning (Pending) | #f59e0b | Bond status badge |
| Error (Refunded) | #ef4444 | Bond status badge |
| Danger Button | #dc2626 | Delete, Cancel actions |
| Info Button | #3b82f6 | Edit, View actions |

---

## 4. Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | Segoe UI / Inter | 24-28px | Bold |
| Subheadings | Segoe UI / Inter | 18-20px | Semi-bold |
| Body Text | Segoe UI / Inter | 14-16px | Regular |
| Labels | Segoe UI / Inter | 13-14px | Medium |
| Small Text | Segoe UI / Inter | 11-12px | Regular |

---

## 5. Screen Layout Structure

All pages share a common layout:

- Top Bar: Logo (left), User name and Logout button (right)
- Sidebar (left): Collapsible navigation menu with icons
- Main Content Area: Page-specific content
- Background: Full-screen video with dark overlay
- ChatBot: Fixed position button at bottom-right corner

---

## 6. Sidebar Navigation

| Icon | Menu Item | Route | Description |
|------|-----------|-------|-------------|
| 🏠 | Dashboard | /dashboard | Overview and statistics |
| 🏘️ | Properties | /properties | Manage rental properties |
| 💰 | Bonds | /bonds | Track bond payments |
| 📋 | Inspections | /inspections | Record inspections |
| 📄 | Documents | /documents | Manage uploaded files |
| 👤 | Profile | /profile | User account settings |

Documentation : https://docs.google.com/document/d/1Y-MASU4Ta8c-Wv80VFwmTJi2OadiOC1K/edit?usp=drive_link&ouid=109148095195788262529&rtpof=true&sd=true 


Balsamiq : https://docs.google.com/document/d/1dRLajeVu486wb1cwCoLiI4iSyQeuDUMS/edit?usp=drive_link&ouid=109148095195788262529&rtpof=true&sd=true

---

## 7. Screen Designs

### 7.1 Login Page

**Purpose:** User authentication

**Elements:**
- Logo icon (house)
- Title: "Rental Bond Tracker"
- Subtitle: "Manage your rental bonds with confidence"
- Email input field (with email icon)
- Password input field (with lock icon)
- Login button (gradient purple/blue)
- "Create Account" link
- "Forgot Password?" link

**Background:** Full-screen slow-motion video of residential area with dark overlay

---

### 7.2 Register Page

**Purpose:** New user account creation

**Elements:**
- Logo icon (house)
- Title: "Create Account"
- Subtitle: "Start tracking your rental bonds today"
- Full name input field (with user icon)
- Email input field (with email icon)
- Password input field (with lock icon)
- Confirm Password input field (with check icon)
- Phone input field (optional, with phone icon)
- Register button (gradient purple/blue)
- "Already have an account? Login" link

**Validation Rules:**
- Password must be at least 8 characters
- Passwords must match
- Email must be valid format
- All required fields marked with asterisk

---

### 7.3 Dashboard Page

**Purpose:** Overview of all activities and statistics

**Elements:**
- Welcome message: "Welcome back, {User Name}!"
- Subtitle: "Here's what's happening with your rentals today"

**Statistics Cards (4):**
- Properties Card: 🏘️ icon, total count, "Properties" label
- Active Bond Card: 💰 icon, amount in AUD, "Active Bond" label
- Inspections Card: 📋 icon, total count, "Inspections" label
- Documents Card: 📄 icon, total count, "Documents" label

**Quick Actions (4 buttons):**
- Add Property (➕ icon)
- Record Bond (💰 icon)
- Add Inspection (📸 icon)
- Upload Document (📁 icon)

**Recent Properties Section:**
- Section title: "Recent Properties"
- Grid of property cards (3 columns)
- Each card shows: property icon, address, landlord name, "View Details" button

**Recent Documents Section:**
- Section title: "Recent Documents"
- List of recent uploads
- Each row shows: file icon, file name, upload date

---

### 7.4 Properties Page

**Purpose:** Manage all rental properties

**Elements:**
- Page Title: "My Properties"
- Add Property button (top right)
- Property cards grid (3 columns)

**Property Card Elements:**
- Property icon (🏘️)
- Address (first line only)
- Landlord name
- Agent name (if available)
- Edit button
- Delete button

**Add/Edit Property Form Fields:**
- Address (text area, required)
- Landlord Name (text, required)
- Landlord Phone (text, optional)
- Landlord Email (email, optional)
- Agent Name (text, optional)
- Agent Phone (text, optional)
- Lease Start Date (date picker, optional)
- Lease End Date (date picker, optional)
- Current Residence (checkbox)
- Save button
- Cancel button

---

### 7.5 Bonds Page

**Purpose:** Track rental bond payments

**Elements:**
- Page Title: "Bonds"
- Record Bond button (top right)

**Bond List Table Columns:**
- Property Address
- Bond Amount
- Payment Date
- Reference Number
- Status (badge with color)
- Refund Amount (if applicable)
- Actions (Edit/Delete)

**Status Badge Colors:**
- Paid: Green (#10b981)
- Pending: Orange (#f59e0b)
- Refunded: Red (#ef4444)

**Add/Edit Bond Form Fields:**
- Property (dropdown, required)
- Bond Amount (number, required)
- Payment Date (date picker, required)
- Reference Number (text, optional)
- Status (dropdown: Paid/Pending/Refunded, required)
- Refund Amount (number, appears if status is Refunded)
- Refund Date (date picker, appears if status is Refunded)
- Save button
- Cancel button

---

### 7.6 Inspections Page

**Purpose:** Record property inspections

**Elements:**
- Page Title: "Inspections"
- Add Inspection button (top right)

**Inspection List Cards:**
- Inspection icon (based on type)
- Inspection Type (Entry/Routine/Exit)
- Inspection Date
- Property Address
- Condition Notes (preview)
- Rating (stars 1-5)
- View Photos button
- Edit button
- Delete button

**Add/Edit Inspection Form Fields:**
- Property (dropdown, required)
- Inspection Date (date picker, required)
- Inspection Type (dropdown: Entry/Routine/Exit, required)
- Condition Notes (text area, optional)
- Rating (star rating 1-5, optional)
- Photo Upload (file input, multiple files allowed)
- Save button
- Cancel button

---

### 7.7 Documents Page

**Purpose:** Manage uploaded tenancy documents

**Elements:**
- Page Title: "Documents"
- Upload Document button (top right)

**Document List Table Columns:**
- File Icon (📄 for PDF, 🖼️ for image, 📝 for DOCX)
- Document Title
- File Name
- Upload Date
- Associated Property
- Actions (Download/Delete)

**Upload Document Form Fields:**
- Document Title (text, required)
- Description (text area, optional)
- File (file picker, required)
- Associated Property (dropdown, optional)
- Associated Bond (dropdown, optional)
- Upload button
- Cancel button

**Supported File Types:**
- PDF (.pdf)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- Word (.docx)

**File Size Limit:** 10MB per file

---

### 7.8 Profile Page

**Purpose:** User account settings

**Elements:**
- Page Title: "My Profile"
- Avatar (initials in circle)
- User Name
- User Email

**Profile Information Display:**
- Full Name
- Email Address
- Phone Number
- Member Since (account creation date)
- Last Login

**Action Buttons:**
- Edit Profile
- Change Password
- Delete Account

**Edit Profile Form Fields:**
- Full Name (text, required)
- Email (email, required)
- Phone (text, optional)
- Save button
- Cancel button

**Change Password Form Fields:**
- Current Password (password, required)
- New Password (password, required, min 8 chars)
- Confirm New Password (password, required)
- Update Password button
- Cancel button

---

### 7.9 Admin Audit Logs Page (Admin Only)

**Purpose:** View all user activities for security

**Elements:**
- Page Title: "Audit Logs"
- Export button (CSV/PDF)

**Audit Logs Table Columns:**
- Timestamp
- User Name
- User Email
- Action Type (CREATE/READ/UPDATE/DELETE/LOGIN)
- Module (Property/Bond/Inspection/Document/User)
- Description
- IP Address

**Filters:**
- Date Range picker
- User dropdown
- Action Type dropdown
- Apply Filters button
- Reset Filters button

---

## 8. ChatBot Component

**Purpose:** AI-powered assistant to help tenants with queries

**Position:** Fixed button at bottom-right corner of all pages

**Chat Window Elements:**
- Header: Bot icon, "Rental Bond Assistant", "Online" status, Close button
- Messages area: Chat history with user and bot messages
- Suggested questions buttons (4)
- Input field: "Ask me anything about rental bonds..."
- Send button

**Suggested Questions:**
- "How much bond should I pay?"
- "How to add a property?"
- "What documents should I upload?"
- "How to get my bond refund?"

**Bot Response Examples:**
- Bond question: Explains 4-6 weeks rent, tracking in Bonds section
- Inspection question: Explains importance, photo uploads
- Property question: Explains how to add property
- Document question: Explains supported formats and limits
- Refund question: Explains status update process

---

## 9. Responsive Design Breakpoints

| Device | Screen Width | Layout Adjustments |
|--------|--------------|-------------------|
| Desktop | > 1024px | Full sidebar, 3-4 column grid |
| Tablet | 768px - 1024px | Collapsible sidebar, 2 column grid |
| Mobile | < 768px | Hamburger menu, 1 column grid |

---

## 10. Accessibility Features

| Feature | Implementation |
|---------|----------------|
| Keyboard Navigation | All interactive elements reachable via Tab key |
| Screen Reader Support | ARIA labels on all icons and buttons |
| High Contrast Mode | Alternative color scheme for visually impaired |
| Focus Indicators | Clear outline on focused elements |
| Alt Text | All images have descriptive alt text |
| Error Messages | Clear, descriptive error messages with suggestions |

---

## 11. UI Component Library

| Component | Description | Used In |
|-----------|-------------|---------|
| Button | Primary, secondary, danger variants | All pages |
| Card | Container with glass background | Dashboard, Properties |
| Input Field | Text, email, password, number, date | Forms |
| Dropdown | Select from options | Bonds, Inspections, Documents |
| Checkbox | Boolean selection | Add Property form |
| Radio Button | Single selection from options | Bond status (if not dropdown) |
| Table | Data display with sorting | Bonds, Documents, Audit Logs |
| Badge | Status indicators | Bond status |
| Modal | Popup confirmation | Delete actions |
| Toast | Temporary notification | Success/Error messages |
| Spinner | Loading indicator | Data fetching |
| Tooltip | Hover information | Icons and buttons |

---

## 12. Navigation Flow

---

## 13. File Structure for UI Components

---

## 14. Design Deliverables Checklist

| Deliverable | Status | Tool |
|-------------|--------|------|
| Login Page Wireframe | Completed | Balsamiq Cloud |
| Register Page Wireframe | Completed | Balsamiq Cloud |
| Dashboard Wireframe | Completed | Balsamiq Cloud |
| Properties Page Wireframe | Completed | Balsamiq Cloud |
| Add Property Form Wireframe | Completed | Balsamiq Cloud |
| Bonds Page Wireframe | Completed | Balsamiq Cloud |
| Add Bond Form Wireframe | Completed | Balsamiq Cloud |
| Inspections Page Wireframe | Completed | Balsamiq Cloud |
| Add Inspection Form Wireframe | Completed | Balsamiq Cloud |
| Documents Page Wireframe | Completed | Balsamiq Cloud |
| Profile Page Wireframe | Completed | Balsamiq Cloud |
| Audit Logs Page Wireframe | Completed | Balsamiq Cloud |
| Color Scheme | Completed | - |
| Typography System | Completed | - |
| Component Library | Completed | - |
| Navigation Flow | Completed | - |

---

**END OF UI/UX DESIGN**
