--CREATE TABLE users (
--    id BIGSERIAL PRIMARY KEY,
--    user_name VARCHAR(50),
--    password VARCHAR(200),
--    email VARCHAR(100),
--    first_name VARCHAR(50).
--    last_name VARCHAR(50),
--    gender VARCHAR(10),
--    address VARCHAR(100),
--    phone_number VARCHAR(10),
--    role VARCHAR(10),
--    is_deleted INT
--);

--INSERT INTO users (user_name, pass_word, email, first_name, last_name, address, phone_number, gender, role, is_deleted)
--    VALUES ('David Malan', '12345', 'david@mail.com', 'david', 'malan', '145 Avenue', '093455443', 'Male', 'Admin', 0);
--INSERT INTO users (user_name, pass_word, email, first_name, last_name, address, phone_number, gender, role, is_deleted)
--    VALUES ('david malan2', '12345', 'david2@mail.com', 'david2', 'malan2', '145 Avenue', '093455443', 'Male', 'Admin', 0);
--INSERT INTO users (user_name, pass_word, email, first_name, last_name, address, phone_number, gender, role, is_deleted)
--    VALUES ('david malan3', '12345', 'david3@mail.com', 'david3', 'malan3', '145 Avenue', '093455443', 'Male', 'Admin', 0);
--INSERT INTO users (user_name, pass_word, email, first_name, last_name,address, phone_number, gender, role, is_deleted)
--    VALUES ('david malan4', '12345', 'david4@mail.com', 'david3', 'malan4','145 Avenue', '093455443', 'Male', 'Admin', 0);

--INSERT INTO products (name, description, price, image_link, average_rating, category, current_quantity, is_featured)
--    VALUES ('pro1', 'description 1', 45.3, 'https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg', 4.5, 'Book', 5, 1);
--
--INSERT INTO categories (name, description)
--    VALUES ('Book', 'category des');

--CREATE TABLE products (
--    id BIGSERIAL PRIMARY KEY,
--    name VARCHAR(50),
--    description TEXT,
--    price DOUBLE(10, 2),
--    image_link VARCHAR(500),
--    average_rating DOUBLE(5,1),
--    is_featured INT,
--    current_quantity INT
--);
--
--CREATE TABLE categories (
--    id BIGSERIAL PRIMARY KEY,
--    name VARCHAR(50),
--    description TEXT
--);

INSERT INTO users (user_name, pass_word, email, first_name, last_name) VALUES ('David Malan', '12345', 'david@mail.com', 'david', 'malan');
INSERT INTO users (user_name, pass_word, email, first_name, last_name) VALUES ('David Malan1', '12345', 'david1@mail.com', 'david', 'malan');
INSERT INTO users (user_name, pass_word, email, first_name, last_name) VALUES ('David Malan2', '12345', 'david2@mail.com', 'david', 'malan');
INSERT INTO users (user_name, pass_word, email, first_name, last_name) VALUES ('David Malan3', '12345', 'david3@mail.com', 'david', 'malan');


--INSERT INTO products (id, name, description, price, image, rating, is_featured, current_quantity) VALUES (1,'pro1','des1',45.5,'just a image',4.5,1,10);
--INSERT INTO products (id, name, description, price, image, rating, is_featured, current_quantity) VALUES (2,'pro2','des1',45.5,'just a image',4.5,1,10);
--INSERT INTO products (id, name, description, price, image, rating, is_featured, current_quantity) VALUES (3,'pro3','des1',45.5,'just a image',4.5,1,10);
--INSERT INTO products (id, name, description, price, image, rating, is_featured, current_quantity) VALUES (4,'pro4','des1',45.5,'just a image',4.5,1,10);
--
--INSERT INTO categories (id, name, description) VALUES (1,'cate1','des1');
--INSERT INTO categories (id, name, description) VALUES (2,'cate2','des1');
--INSERT INTO categories (id, name, description) VALUES (3,'cate3','des1');
--INSERT INTO categories (id, name, description) VALUES (4,'cate4','des1');