-- Database: wildbook

-- DROP DATABASE wildbook;

--------------------

/*
CREATE DATABASE wildbook
    WITH 
    OWNER = wildbookadmin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
*/

--------------------

DROP TABLE IF EXISTS group_post CASCADE;
DROP TABLE IF EXISTS image_in_post CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE;
DROP TABLE IF EXISTS favorite CASCADE;
DROP TABLE IF EXISTS animal_found_in_image CASCADE;
DROP TABLE IF EXISTS follow_animal CASCADE;
DROP TABLE IF EXISTS follow_user CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS image CASCADE;
DROP TABLE IF EXISTS "location" CASCADE;
DROP TABLE IF EXISTS animal CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

--------------------

CREATE TABLE IF NOT EXISTS "user" (
	username text PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	fname text NOT NULL,
	lname text NOT NULL
);

CREATE TABLE IF NOT EXISTS animal (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	species text NOT NULL
);

-- I forgot to make animal.id SERIAL (a.k.a AUTO INCREMENT) and did not want to DROP TABLE
/*
CREATE SEQUENCE animal_id_seq;
SELECT SETVAL('animal_id_seq', COALESCE(MAX("id"), 0)) FROM animal;
ALTER TABLE animal ALTER COLUMN "id" SET DEFAULT NEXTVAL('animal_id_seq');
*/

CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	lat real NOT NULL,
	long real NOT NULL
);

-- I forgot to make location.id SERIAL (a.k.a AUTO INCREMENT) and did not want to DROP TABLE
/*
CREATE SEQUENCE location_id_seq;
SELECT SETVAL('location_id_seq', COALESCE(MAX("id"), 0)) FROM "location";
ALTER TABLE "location" ALTER COLUMN "id" SET DEFAULT NEXTVAL('location_id_seq');
*/

CREATE TABLE IF NOT EXISTS image (
	"id" serial PRIMARY KEY NOT NULL,
	url text NOT NULL,
	"timestamp" timestamp NOT NULL,
	lat real NOT NULL,
	long real NOT NULL,
	location_id int REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	username text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	is_uploaded_to_ibeis boolean NOT NULL
);

-- I forgot to make image.id SERIAL (a.k.a AUTO INCREMENT) and did not want to DROP TABLE
/*
CREATE SEQUENCE image_id_seq;
SELECT SETVAL('image_id_seq', COALESCE(MAX("id"), 0)) FROM image;
ALTER TABLE image ALTER COLUMN "id" SET DEFAULT NEXTVAL('image_id_seq');
*/

CREATE TABLE IF NOT EXISTS post (
	"id" serial PRIMARY KEY NOT NULL,
	username text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	location_id int REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	"timestamp" timestamp NOT NULL,
	"text" text
);

-- I forgot to make post.id SERIAL (a.k.a AUTO INCREMENT) and did not want to DROP TABLE
/*
CREATE SEQUENCE post_id_seq;
SELECT SETVAL('post_id_seq', COALESCE(MAX("id"), 0)) FROM post;
ALTER TABLE post ALTER COLUMN "id" SET DEFAULT NEXTVAL('post_id_seq');
*/

CREATE TABLE IF NOT EXISTS follow_user (
	follower_id text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	followee_id text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS follow_animal (
	follower_id text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	animal_id int REFERENCES animal("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS animal_found_in_image (
	image_id int REFERENCES image("id") ON DELETE CASCADE ON UPDATE CASCADE,
	animal_id int REFERENCES animal("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Favorite (
	post_id int REFERENCES Post("id") ON DELETE CASCADE ON UPDATE CASCADE,
	username text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "comment" (
	post_id int REFERENCES post("id") ON DELETE CASCADE ON UPDATE CASCADE,
	username text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	"timestamp" timestamp NOT NULL,
	"content" text NOT NULL,
	PRIMARY KEY (post_id, username, timestamp)
);

CREATE TABLE IF NOT EXISTS image_in_post (
	post_id int REFERENCES post("id") ON DELETE CASCADE ON UPDATE CASCADE,
	image_id int REFERENCES image("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS group_post (
	post_id int REFERENCES post("id") ON DELETE CASCADE ON UPDATE CASCADE,
	username text REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE
);

--------------------

INSERT INTO "user" (username, "password", fname, lname) VALUES
	('user1', 'abc123', 'Alex', 'Mark'),
	('user2', 'abc123', 'Brian', 'Brown'),
	('user3', 'abc123', 'Candice', 'Cage'),
	('user4', 'abc123', 'Dan', 'Dush'),
	('user5', 'abc123', 'Emily', 'Entrancata');

INSERT INTO animal (id, "name", species) VALUES
	(1, 'Zippy', 'zebra'),
	(2, 'Candy', 'cat'),
	(3, 'Leo', 'lion'),
	(4, 'Pete', 'penguin'),
	(5, 'Sharon', 'shark');

INSERT INTO "location" (id, "name", lat, long) VALUES
	(1, 'Yellowstone National Park', 42.576206, -108.6354753),
	(2, 'Lincoln Park Zoo', 41.9238938, -87.6362712),
	(3, 'University of Illinois at Chicago', 41.8749598, -87.6602953),
	(4, 'University of Chicago', 41.7886079, -87.600902),
	(5, 'Northwestern University', 42.0564594, -87.6774557);

INSERT INTO image ("id", url, timestamp, lat, long, location_id, username, is_uploaded_to_ibeis) VALUES
	(1, 'http://farm1.static.flickr.com/164/358144227_01e5544b79.jpg', '1990-01-01 13:23:45-07', 41.869356, -87.6500057, 1, 'user1', true),
	(2, 'http://www.pantherkut.com/wp-content/uploads/2007/04/2.jpg', '1990-01-01 13:27:45', 41.869356, -87.6500057, 1, 'user1', true),
	(3, 'http://farm1.static.flickr.com/44/142236307_9a364b60b4.jpg', '1990-01-21 13:23:45', 41.921515, -87.6497037, 2, 'user2', false),
	(4, 'http://www.junglewalk.com/animal-pictures/5/Dog-16009.jpg', '1990-03-24 13:23:45', 42.576206, -108.6354753, 3, 'user3', true),
	(5, 'http://farm1.static.flickr.com/154/441498601_2bfa17d40c.jpg', '1990-03-24 13:23:45', 42.576206, -108.6354753, 3, 'user3', false);

INSERT INTO post ("id", username, location_id, timestamp, text) VALUES
	(1, 'user1', 1, '1990-01-01 13:23:45', 'Hello from here'),
	(2, 'user3', 3, '1990-03-24 13:23:45', 'Hello from here'),
	(3, 'user1', 1, '1990-01-01 13:23:45', 'Hello from here'),
	(4, 'user1', 1, '1990-01-01 13:23:45', 'Hello from here'),
	(5, 'user1', 1, '1990-01-01 13:23:45', 'Hello from here');

INSERT INTO follow_user (follower_id, followee_id) VALUES
	('user1', 'user2'),
	('user1', 'user3'),
	('user3', 'user1'),
	('user4', 'user5'),
	('user3', 'user5');

INSERT INTO follow_animal (follower_id, animal_id) VALUES
	('user1', 1),
	('user1', 2),
	('user2', 2),
	('user3', 4),
	('user5', 5);

INSERT INTO animal_found_in_image (image_id, animal_id) VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(5, 4),
	(4, 5);

INSERT INTO favorite (post_id, username) VALUES
	(1, 'user2'),
	(1, 'user3'),
	(5, 'user4'),
	(2, 'user5'),
	(3, 'user3');

INSERT INTO "comment" (post_id, username, timestamp, content) VALUES
	(1, 'user5', '2000-01-01 09:33:20', 'Thanks for the post'),
	(1, 'user3', '2000-01-01 11:33:20', 'Thanks for the post'),
	(2, 'user2', '2000-01-01 23:33:20', 'Thanks for the post'),
	(3, 'user3', '2000-01-01 02:33:20', 'Thanks for the post'),
	(4, 'user3', '2000-01-01 10:33:20', 'Thanks for the post');

INSERT INTO image_in_post (post_id, image_id) VALUES
	(1, 1),
	(1, 2),
	(2, 3),
	(3, 4),
	(4, 5);

INSERT INTO group_post (post_id, username) VALUES
	(1, 'user1'),
	(1, 'user4'),
	(1, 'user5'),
	(2, 'user2'),
	(3, 'user3');


-----------------------
/* VIEW */
DROP VIEW IF EXISTS user_full;

CREATE OR REPLACE VIEW user_full AS SELECT 
  *, 
  ARRAY(SELECT DISTINCT "id" FROM post WHERE username = "user".username) 
    AS "posts",
  ARRAY(SELECT DISTINCT followee_id FROM follow_user WHERE follower_id = "user".username) 
    AS "following_users",
  ARRAY(SELECT DISTINCT follower_id FROM follow_user WHERE followee_id = "user".username) 
    AS "followers",
  ARRAY(SELECT DISTINCT animal_id FROM follow_animal WHERE follower_id = "user".username) 
    AS "following_animals",
  ARRAY(SELECT DISTINCT post_id FROM favorite WHERE username = "user".username) 
    AS "favorites",
  ARRAY(SELECT DISTINCT foo.location_id FROM
		(SELECT 
		   "location".id AS location_id, 
		   post.username AS username 
		 FROM "location"
		 	JOIN post ON "location".id = post.location_id
			JOIN "user" ON post.username = "user".username
		) foo
	   WHERE foo.username = "user".username) 
    AS "locations" 
FROM "user"; 

SELECT * FROM user_full;

-----

DROP VIEW IF EXISTS post_full;

CREATE OR REPLACE VIEW post_full AS SELECT 
  *, 
  ARRAY(SELECT DISTINCT foo.image_id FROM
		(SELECT 
		   image.id AS image_id, 
		   post.id AS post_id 
		 FROM image
			JOIN image_in_post ON image.id = image_in_post.image_id
			JOIN post ON image_in_post.post_id = post.id) foo
	   WHERE foo.post_id = post.id) 
    AS "images",
  ARRAY(SELECT DISTINCT foo.animal FROM
		(SELECT 
		   animal_found_in_image.animal_id AS animal, 
		   post.id AS post_id 
		 FROM animal_found_in_image
			JOIN image ON image.id = animal_found_in_image.image_id
			JOIN image_in_post ON image_in_post.image_id = image.id
		    JOIN post ON image_in_post.post_id = post.id
		) foo
	   WHERE foo.post_id = post.id) 
	AS "animals",
  ARRAY(SELECT DISTINCT foo.username FROM
		(SELECT 
		   "user".username AS username,
		   post.id AS post_id
		 FROM "user"
		   JOIN favorite ON "user".username = favorite.username
		   JOIN post ON favorite.post_id = post.id
		) foo
	   WHERE foo.post_id = post.id)
	AS "favorites"
FROM post; 

SELECT * FROM post_full;

-----

DROP VIEW IF EXISTS animal_full;

CREATE OR REPLACE VIEW animal_full AS SELECT
  *,
  ARRAY(SELECT DISTINCT foo.location FROM
	     (SELECT image.location_id AS "location", animal.id AS animal_id
		  FROM image
		    JOIN animal_found_in_image ON image.id = animal_found_in_image.image_id
		    JOIN animal ON animal_found_in_image.animal_id = animal.id
		 ) foo
	   WHERE foo.animal_id = animal.id)
    AS "locations",
  ARRAY(SELECT DISTINCT foo.post_id FROM
	     (SELECT post.id AS post_id, animal.id AS animal_id
		  FROM post
		    JOIN image_in_post ON post.id = image_in_post.post_id
		    /*JOIN image ON image_in_post.image_id = image.id*/
		    JOIN animal_found_in_image ON image_in_post.image_id = animal_found_in_image.image_id
		    JOIN animal ON animal_found_in_image.animal_id = animal.id
		 ) foo
	   WHERE foo.animal_id = animal.id)
    AS "posts"
FROM animal;

SELECT * FROM animal_full;

-----
