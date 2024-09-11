create table equipes (
    id bigint not null auto_increment unique,
    nome varchar(45) not null unique,
    cor_primaria varchar(7) not null,
    cor_secundaria varchar(7) not null,

    primary key (id)
);