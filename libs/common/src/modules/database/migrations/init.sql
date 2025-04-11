-- користувачі з прив'язкою до номера
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- JWT токени, що зберігаються для користувачів
CREATE TABLE IF NOT EXISTS auth_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- основна таблиця з AMI подіями
CREATE TABLE IF NOT EXISTS call_events (
  id SERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  caller_id TEXT,
  callee_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  raw_data JSONB NOT NULL
);