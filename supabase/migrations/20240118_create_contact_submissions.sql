-- Create contact_submissions table with all required fields
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    company text,
    service_needed text,
    project_details text NOT NULL,
    page_url text,
    user_agent text,
    ip inet,
    status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'received', 'emailed', 'failed')),
    meta jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
    ON public.contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
    ON public.contact_submissions (status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
    ON public.contact_submissions (email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "No client access to contact_submissions" ON public.contact_submissions;

-- Create restrictive policy that blocks all client access
-- Only service role can bypass RLS and perform operations
CREATE POLICY "No client access to contact_submissions"
    ON public.contact_submissions
    FOR ALL
    TO public
    USING (false);

-- Grant necessary permissions to service role
-- Note: Service role automatically bypasses RLS, so no additional policies needed
GRANT ALL ON public.contact_submissions TO service_role;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Add comments for documentation
COMMENT ON TABLE public.contact_submissions IS 'Stores all contact form submissions from the website';
COMMENT ON COLUMN public.contact_submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN public.contact_submissions.created_at IS 'Timestamp when the submission was created';
COMMENT ON COLUMN public.contact_submissions.full_name IS 'Full name of the person submitting the form';
COMMENT ON COLUMN public.contact_submissions.email IS 'Email address of the submitter';
COMMENT ON COLUMN public.contact_submissions.phone IS 'Optional phone number';
COMMENT ON COLUMN public.contact_submissions.company IS 'Optional company name';
COMMENT ON COLUMN public.contact_submissions.service_needed IS 'Service category selected from dropdown';
COMMENT ON COLUMN public.contact_submissions.project_details IS 'Detailed project description';
COMMENT ON COLUMN public.contact_submissions.page_url IS 'URL of the page where form was submitted';
COMMENT ON COLUMN public.contact_submissions.user_agent IS 'Browser user agent string';
COMMENT ON COLUMN public.contact_submissions.ip IS 'IP address of the submitter (if available)';
COMMENT ON COLUMN public.contact_submissions.status IS 'Processing status: new, emailed, or failed';
COMMENT ON COLUMN public.contact_submissions.meta IS 'Additional metadata in JSON format';
