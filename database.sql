DROP DATABASE ecommerce;
USE ecommerce;

SELECT * FROM users;
DELETE FROM users;

SELECT * FROM products;
DELETE FROM products;

SELECT * FROM categories;
DELETE FROM categories;

SELECT * FROM categories_products;
DELETE FROM categories_products;
INSERT INTO categories (category_id, description, name)
	VALUES (1, "WATER DESCRIPTION", "WATER")
		,(1, "GROUND DESCRIPTION", "GROUND")
        ,(1, "FIRE DESCRIPTION", "FIRE")
        ,(1, "WIND DESCRIPTION", "WIND");

SELECT * FROM products;
DELETE FROM products;

SELECT * FROM products;
DELETE FROM products;