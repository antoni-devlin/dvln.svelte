-- dev_posts table
CREATE TABLE IF NOT EXISTS dev_posts (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  title TEXT,
  body TEXT,
  slug TEXT,
  updated_at TIMESTAMP,
  publishing_status TEXT,
  excerpt TEXT,
  );