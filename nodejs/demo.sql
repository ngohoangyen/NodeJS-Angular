Create Database ql_ban_hang;
use ql_ban_hang;

Create Table category
(
    id int primary key AUTO_INCREMENT,
    name varchar(100) NOT NULL UNIQUE,
    status tinyint default '1'
);

Create Table product
(
    id int primary key AUTO_INCREMENT,
    name varchar(150) NOT NULL UNIQUE,
    price float NOT NULL,
    sale_price float default '0',
    image varchar(200) null,
    category_id int NOT NULL,
    content text NULL,
    status tinyint default '1',
    FOREIGN KEY (category_id) REFERENCES category(id)
);

Create Table account
(
    id int primary key AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role varchar(100) NULL default 'customer',
    creaed_at timestamp NULL default CURRENT_TIMESTAMP,
    Last_login timestamp NULL default CURRENT_TIMESTAMP
);


Create Table favourite
(
    id int primary key AUTO_INCREMENT,
    account_id int NOT NULL,
    product_id int NOT NULL,
    creaed_at timestamp NULL default CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO category(name, status) VALUES
('Túi xách', 1),
('Áo nam', 1),
('Áo bà ba', 1),
('Ti vi', 0),
('Quạt điện', 0),
('Điều hòa', 0),
('Tủ lạnh', 0),
('Máy Bơm', 0),
('Máy giặt', 0),
('Lioa', 0),
('Máy sấy', 0),
('Bếp ga', 0),
('Chảo chống dính', 0),
('Máy xay sinh tố', 0)