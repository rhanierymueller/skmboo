create database dbCliente;

create table cliente(
id int auto_increment,
nome varchar(100) not null,
data_cadastro date not null,
cpf_cnpj varchar(14) not null,
data_nascimento date not null,
tipo char(1) not null,
telefone varchar (40),
email varchar(40),
cep varchar(10),
logradouro varchar(50),
numero varchar (10),
bairro varchar(10),
complemento varchar(20),
cidade varchar(40),
uf char(2),
primary key(id)
)

select * from cliente
