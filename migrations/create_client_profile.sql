-- Create client_profile table
CREATE TABLE IF NOT EXISTS client_profile (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  state VARCHAR(100) NOT NULL,
  
  -- Authentication
  password_hash VARCHAR(255) NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Account status
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_client_profile_email ON client_profile(email);
CREATE INDEX IF NOT EXISTS idx_client_profile_phone ON client_profile(phone);
CREATE INDEX IF NOT EXISTS idx_client_profile_state ON client_profile(state);
CREATE INDEX IF NOT EXISTS idx_client_profile_created_at ON client_profile(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_client_profile_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_client_profile_timestamp_trigger ON client_profile;
CREATE TRIGGER update_client_profile_timestamp_trigger
BEFORE UPDATE ON client_profile
FOR EACH ROW
EXECUTE FUNCTION update_client_profile_timestamp();
