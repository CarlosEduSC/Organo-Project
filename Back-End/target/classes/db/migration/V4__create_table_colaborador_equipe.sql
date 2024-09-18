create table colaborador_equipe (
    id_colaborador bigint not null,
    id_equipe bigint not null,

    primary key (id_colaborador, id_equipe),
    foreign key (id_colaborador) references colaboradores(id),
    foreign key (id_equipe) references equipes(id)
)