create table funcionario_equipe (
    id_funcionario bigint not null,
    id_equipe bigint not null,

    primary key (id_funcionario, id_equipe),
    foreign key (id_funcionario) references funcionarios(id),
    foreign key (id_equipe) references equipes(id)
)