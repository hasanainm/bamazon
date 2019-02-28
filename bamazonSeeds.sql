drop database if exists bamazonApp_db;

create database bamazonApp_db;

use bamazonApp_db;

create table products (
item_id integer(30) auto_increment not null,
product_name varchar(100) not null,
department_name varchar(100) not null,
price Decimal(10,2) not null,
stock_quantity integer(10) not null,
primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("Xbox", "Gaming", 299.99, 100),
("Ps4", "Gaming", 299.99, 70),
("CamelBack Hydration Pack", "Fitness", 59.99, 60),
("In-ground Basketball Hoop System 2.0", "Sports and Outdoors", 999.99, 35),
("Over-head beats by Dr.Dre", "Electronics", 199.99, 15),
("Hair Straightner", "Beauty and Personal Care", 75.99, 45),
("MacBook Pro 13 in.", "Electronics", 1299.99, 70),
("Messi Jersey", "Clothing", 120.00, 55),
("Ronaldo Jersey", "Clothing", 150.00, 75),
("Samsung Refrigerator", "Appliances", 1600.00, 65);

select * from products;
