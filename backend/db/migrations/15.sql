\c :database;

ALTER TABLE course
  ADD COLUMN embedding vector(1536);

CREATE EXTENSION vector;

CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));