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