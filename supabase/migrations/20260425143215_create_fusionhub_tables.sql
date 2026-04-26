/*
  # FusionHub TechLab - Initial Schema

  1. New Tables
    - `ideas` - Stores submitted project ideas from students
      - `id` (uuid, primary key)
      - `name` (text) - Submitter's name
      - `year` (text) - Academic year (1st, 2nd, etc.)
      - `idea_title` (text) - Title of the idea
      - `description` (text) - Detailed description
      - `skills_required` (text) - Skills needed to build it
      - `votes` (integer) - Upvote count
      - `created_at` (timestamptz)
    - `contact_messages` - Stores contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow anyone to insert ideas and contact messages (public form)
    - Allow anyone to read ideas (public listing)
    - Allow authenticated users to update vote count
*/

CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  year text NOT NULL,
  idea_title text NOT NULL,
  description text NOT NULL,
  skills_required text NOT NULL DEFAULT '',
  votes integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ideas"
  ON ideas FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit ideas"
  ON ideas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can vote on ideas"
  ON ideas FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
