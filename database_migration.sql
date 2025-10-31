-- Migration script to add links and hashtags columns to news_posts table
-- Run this in your Supabase SQL Editor

-- Add links column (array of text)
ALTER TABLE news_posts
ADD COLUMN IF NOT EXISTS links TEXT[];

-- Add hashtags column (array of text)
ALTER TABLE news_posts
ADD COLUMN IF NOT EXISTS hashtags TEXT[];

-- Optional: Set default values for existing rows
UPDATE news_posts
SET links = ARRAY[]::TEXT[] WHERE links IS NULL;

UPDATE news_posts
SET hashtags = ARRAY[]::TEXT[] WHERE hashtags IS NULL;

