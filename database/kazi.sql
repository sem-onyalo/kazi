create table association (
  id serial primary key,
  create_timestamp timestamp default current_timestamp not null,
  update_timestamp timestamp default current_timestamp not null,
  key varchar(50) not null,
  name varchar(50) not null,
  alias varchar(20) not null,
  is_public boolean default FALSE not null
);

create table association_usr (
    id serial primary key,
    association_id int not null,
    usr_id int not null
);

create table component (
  id serial primary key,
  create_timestamp timestamp default current_timestamp not null,
  update_timestamp timestamp default current_timestamp not null,
  key varchar(50) not null,
  name varchar(50) not null,
  type smallint default 1 not null
); -- insert into component (key, name, type) values ('attendance', 'Attendance', 1), ('volunteer', 'Volunteer', 1), ('location', 'Location', 1), ('event', 'Event', 1), ('check', 'Check', 1), ('feedback', 'Feedback', 0), ('messaging', 'Messaging', 1), ('winloss', 'Win-Loss', 1);

create table component_attendance (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  usr_id int not null,
  is_attending boolean not null
);

create table component_check (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  usr_id int not null,
  is_checked boolean not null
);

create table component_event (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  event_date date not null,
  event_time time not null
);

create table component_feedback (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  usr_id int not null,
  details text not null
);

create table component_feedback_settings (
  id serial primary key,
  directory_id int references directory(id) on delete cascade
);

create table component_location (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  location varchar(1024) not null
);

create table component_messaging (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  usr_id int not null,
  message varchar(1024) not null,
  create_timestamp timestamp default current_timestamp not null
);

create table component_volunteer (
  id serial primary key,
  task_id int not null,
  usr_id int not null,
  item_id int references component_volunteer_item(id) on delete cascade
);

create table component_volunteer_item (
  id serial primary key,
  directory_id int references directory(id) on delete cascade,
  name varchar(50) not null
);

create table component_winloss (
  id serial primary key,
  task_id int references task(id) on delete cascade,
  state smallint not null
);

create table directory (
  id serial primary key,
  create_timestamp timestamp default current_timestamp not null,
  update_timestamp timestamp default current_timestamp not null,
  association_id int not null,
  parent_id int default 0 not null,
  key varchar(50) not null,
  name varchar(50) not null,
  is_public boolean default FALSE not null
);

create table directory_component (
  id serial primary key,
  directory_id int not null,
  component_id int not null,
  component_order int not null,
  constraint uk_directoryid_componentid unique(directory_id, component_id)
);

create table task (
    id serial primary key,
    create_timestamp timestamp default current_timestamp not null,
    update_timestamp timestamp default current_timestamp not null,
    directory_id int not null,
    name varchar(255) not null
);

create table task_component (
  id serial primary key,
  task_id int not null,
  component_id int not null,
  constraint uk_taskid_componentid unique(task_id, component_id)
);

create table usr (
    id serial primary key,
    create_timestamp timestamp default current_timestamp not null,
    update_timestamp timestamp default current_timestamp not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    username varchar(20) not null,
    password varchar(255) not null,
    auth_token varchar(255) null,
    user_role smallint default 3 not null
);

create table usr_role (
  id int primary key,
  name varchar(20)
); --insert into usr_role (id, name) values (1, 'SUPER_ADMIN'), (2, 'ADMIN'), (3, 'USER');
