DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   username VARCHAR(225) not null UNIQUE,
   email VARCHAR(255) UNIQUE,
   password VARCHAR(255) not null,
   about VARCHAR(255),
   facebookID VARCHAR(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts(
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   url TEXT,
   post TEXT,
   imageurl TEXT,
   total_comments INTEGER,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   post_id INTEGER NOT NULL,
   comment_id INTEGER,
   comment TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites(
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   posts_id INTEGER NOT NULL
);
