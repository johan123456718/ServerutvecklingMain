use serverutveckling;
create database serverutveckling;

create user 'user'@'%' identified by 'ThePassword';

grant all on serverutveckling.* to 'user'@'%';

SET GLOBAL time_zone = '+7:00';

-- safety boi
/*revoke all on serverutveckling.* from 'user'@'%';*/
grant select, insert, delete, update, create on serverutveckling.* to 'user'@'%';

select * from user;

create table users(
username varchar(255) not null ,
password varchar(255) not null,
UUID char(36) NOT NULL,
primary key(UUID)
);

create table log_post(
ID int auto_increment,
sender varchar(36) NOT NULL,
reciever varchar(36) NOT NULL,
title varchar(255),
description text(65535),
_date Date NOT NULL,
foreign key(sender) references users(UUID),
foreign key(reciever) references users(UUID),
primary key(ID)
);


/*'Emil', '79b96b90-d080-4e88-a989-2b344f1fcac5' */

/* 'Johan', 'fa40e3a8-254d-49d3-9d58-571eb8b2603f' */

/* 'Berit', '875c4fdc-d6ec-4322-bf25-92dd0e9acc10' */


insert into log_post (
sender, reciever, title, description, 
_date) 
values(
'fa40e3a8-254d-49d3-9d58-571eb8b2603f', 
'79b96b90-d080-4e88-a989-2b344f1fcac5',
'Viktig information',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Vivamus nulla urna, sollicitudin id accumsan sed, tincidunt 
quis magna. Praesent quis dui ex.',
curdate()
);


insert into log_post (
sender, reciever, title, description, _date ) 
values 
('875c4fdc-d6ec-4322-bf25-92dd0e9acc10',
 'fa40e3a8-254d-49d3-9d58-571eb8b2603f',
 'Titel bre',
 'Jag svär på gud',
 curdate());


create table message(
ID int auto_increment,
sender char(36) NOT NULL,
reciever char(36) NOT NULL,
body text(512),
_date Date NOT NULL,
is_read boolean default false,
foreign key(sender) references users(UUID),
foreign key(reciever) references users(UUID),
primary key(ID)
);

insert into message (
sender, reciever, body, _date) 
values (
'875c4fdc-d6ec-4322-bf25-92dd0e9acc10',
 'fa40e3a8-254d-49d3-9d58-571eb8b2603f',
 'Body jao walla habibi tammam',
 curdate());
 
