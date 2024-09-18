create table usuarios (
    id bigint not null auto_increment unique,
    nome varchar(100) not null unique,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    ativo tinyint not null,

    primary key(id)
);