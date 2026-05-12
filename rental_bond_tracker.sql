-- Drop all existing tables (CASCADE removes dependencies)
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.documents CASCADE;
DROP TABLE IF EXISTS public.inspection_photos CASCADE;
DROP TABLE IF EXISTS public.inspections CASCADE;
DROP TABLE IF EXISTS public.bonds CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
--
-- COMPLETE DATABASE SCHEMA FOR RENTAL BOND TRACKER
-- 
--

-- ============================================
-- TABLE 1: users
-- ============================================

CREATE TABLE IF NOT EXISTS public.users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_pic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- ============================================
-- TABLE 2: properties
-- ============================================

CREATE TABLE IF NOT EXISTS public.properties (
    property_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    landlord_name VARCHAR(100) NOT NULL,
    landlord_phone VARCHAR(20),
    landlord_email VARCHAR(100),
    agent_name VARCHAR(100),
    agent_phone VARCHAR(20),
    lease_start DATE,
    lease_end DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE 3: bonds
-- ============================================

CREATE TABLE IF NOT EXISTS public.bonds (
    bond_id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES public.properties(property_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    reference_no VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Pending',
    refund_amount DECIMAL(10,2),
    refund_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (status IN ('Paid', 'Pending', 'Refunded'))
);

-- ============================================
-- TABLE 4: inspections (with photo_path column - ONE photo per inspection)
-- ============================================

CREATE TABLE IF NOT EXISTS public.inspections (
    inspection_id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES public.properties(property_id) ON DELETE CASCADE,
    inspection_date DATE NOT NULL,
    inspection_type VARCHAR(20) NOT NULL,
    condition_notes TEXT,
    photo_path VARCHAR(500),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (inspection_type IN ('Entry', 'Routine', 'Exit'))
);

-- ============================================
-- TABLE 5: documents
-- ============================================

CREATE TABLE IF NOT EXISTS public.documents (
    document_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES public.properties(property_id) ON DELETE SET NULL,
    bond_id INTEGER REFERENCES public.bonds(bond_id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE 6: audit_logs
-- ============================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(user_id) ON DELETE SET NULL,
    action_type VARCHAR(20) NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON public.properties(user_id);
CREATE INDEX IF NOT EXISTS idx_bonds_property_id ON public.bonds(property_id);
CREATE INDEX IF NOT EXISTS idx_bonds_status ON public.bonds(status);
CREATE INDEX IF NOT EXISTS idx_inspections_property_id ON public.inspections(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(timestamp);

-- ============================================
-- AUTO-UPDATE TRIGGER for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_users_updated_at ON public.users;
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE TEST DATA
-- ============================================

INSERT INTO public.users (full_name, email, password, phone) 
VALUES ('John Tenant', 'john@example.com', MD5('password123'), '0412345678')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.properties (user_id, address, landlord_name, landlord_phone, agent_name, lease_start, lease_end, is_current)
SELECT 1, '123 Main Street, Melbourne VIC 3000', 'Robert Landlord', '0399991111', 'Real Estate Agency', '2026-01-01', '2027-01-01', TRUE
WHERE NOT EXISTS (SELECT 1 FROM public.properties WHERE address = '123 Main Street, Melbourne VIC 3000');

INSERT INTO public.bonds (property_id, amount, payment_date, reference_no, status)
SELECT 1, 2400.00, '2026-01-05', 'BOND001234', 'Paid'
WHERE NOT EXISTS (SELECT 1 FROM public.bonds WHERE property_id = 1);

INSERT INTO public.inspections (property_id, inspection_date, inspection_type, condition_notes, photo_path, rating)
SELECT 1, '2026-03-15', 'Routine', 'Property in good condition, minor wear and tear', '/uploads/inspections/sample_photo.jpg', 4
WHERE NOT EXISTS (SELECT 1 FROM public.inspections WHERE property_id = 1);

-- ============================================
-- VERIFY ALL TABLES
-- ============================================

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;