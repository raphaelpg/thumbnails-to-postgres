CREATE DATABASE thumbnails_to_postgres;

CREATE TABLE images(
  image_id SERIAL PRIMARY KEY,
  image_url TEXT
);

CREATE TABLE thumbnails(
  thumbnail_id SERIAL PRIMARY KEY,
  image_id INT,
  thumbnail_url TEXT
);