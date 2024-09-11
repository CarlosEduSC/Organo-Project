create table funcionarios (
    id bigint not null auto_increment unique,
    nome varchar(45) not null unique,
    cargo varchar(30) not null,
    email varchar(30) unique,
    telefone varchar(13) not null unique,

    primary key (id)
);