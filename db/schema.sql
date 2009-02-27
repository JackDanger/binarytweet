create table users (name varchar(36) not null primary key);
create table tweets (text varchar(140) not null, user varchar(36) not null, id int(13) not null primary key)