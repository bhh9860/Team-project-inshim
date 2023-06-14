create database inshim;
show databases;
use inshim;
show tables;

CREATE TABLE (
	userinfo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id VARCHAR(20) NOT NULL,
	user_pw VARCHAR(20) NOT NULL,
	user_name VARCHAR(20) NOT NULL,
	user_country VARCHAR(20) NOT NULL,
    user_salt VARCHAR(255) NOT NULL
);

CREATE TABLE route (
	route_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	route_city VARCHAR(20) NOT NULL,
	route_day VARCHAR(20) NOT NULL
);

CREATE TABLE detail_essay (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    detail_Etitle TEXT NOT NULL,
    detail_Ecomment TEXT NOT NULL,
    detail_city VARCHAR(30) NOT NULL,
    detail_day VARCHAR(30) NOT NULL,
    F_route_id INT NOT NULL,
    regdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookmark (
    userinfo_id INT NOT NULL,
    route_id INT NOT NULL
);

CREATE TABLE detail (
    detail_route_id INT NOT NULL PRIMARY KEY,
    detail_comment TEXT NOT NULL
);

desc userinfo;



select * from userinfo;
select * from route;
select * from fav;
select * from detail;
select * from essay;

desc detail;
desc fav;

drop table detail;
drop table route;
drop table userinfo;
drop table essay;
drop table fav;