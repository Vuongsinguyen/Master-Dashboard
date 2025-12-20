-- Supabase Database Schema for Master Dashboard

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assignee TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  submit_time TIMESTAMP WITH TIME ZONE NOT NULL,
  evaluation TEXT NOT NULL CHECK (evaluation IN ('Love', 'Like', 'Normal', 'Dislike', 'Hate')),
  staff TEXT,
  issues_group TEXT,
  issues JSONB DEFAULT '[]'::jsonb,
  customer TEXT,
  customer_type TEXT,
  location TEXT,
  channel TEXT,
  response_time INTEGER,
  resolved BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'Medium',
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks (allow all operations for authenticated users)
CREATE POLICY "Allow all operations for authenticated users on tasks" ON tasks
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for feedbacks (allow all operations for authenticated users)
CREATE POLICY "Allow all operations for authenticated users on feedbacks" ON feedbacks
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for user_settings (users can only access their own settings)
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_start_date ON tasks(start_date);
CREATE INDEX IF NOT EXISTS idx_tasks_end_date ON tasks(end_date);
CREATE INDEX IF NOT EXISTS idx_feedbacks_company ON feedbacks(company);
CREATE INDEX IF NOT EXISTS idx_feedbacks_submit_time ON feedbacks(submit_time);
CREATE INDEX IF NOT EXISTS idx_feedbacks_evaluation ON feedbacks(evaluation);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();