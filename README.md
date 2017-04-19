<p align="center"><a href="https://vuejs.org" target="_blank"><img width="340"src="http://i.imgur.com/MXSzQCq.jpg"></a></p>

<p align="center">
<a href="https://circleci.com/gh/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://circleci.com/gh/fga-gpp-mds/2017.1-OndeE-UnB.svg?style=shield&circle-token=:circle-token" alt="Build Status"></a>
<a href="https://codeclimate.com/github/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/codeclimate/github/fga-gpp-mds/2017.1-OndeE-UnB.svg" alt="Build Status"></a>
<a href="(https://github.com/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/badge/ruby-2.3.1-blue.svg"></a>
<a href="(https://github.com/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/badge/rails-5.0.2-blue.svg"></a>
<a href="http://www.gnu.org/licenses/agpl-3.0"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3"></a>
<a href="https://github.com/fga-gpp-mds"><img src="https://img.shields.io/badge/gpp--mds-2017.1-lightgrey.svg" alt="GPP/MDS 2017.1"></a>
</p>

# 2017.1 Onde É? UnB

## Sobre o Projeto

<p align="justify">O "Onde É? UnB" tem a finalidade de facilitar a localização, via mapa interativo, de algumas das instalações e estabelecimentos do Campus Darcy Ribeiro da UnB. A plataforma web é um serviço de localização dentro do campus que pretende auxiliar os diversos frequentadores da UnB a encontrar edifícios, departamentos e salas.</p>



## Instalação

Para contribuir com esse repositório é necessário a instalação do VirtualBox e Vagrant em um ambiente linux como o ubuntu.

Veja informações e resoluções de alguns problemas com Vagrant em https://pt.wikiversity.org/wiki/Vagrant_e_Docker

Faça clone ou download do repositório.

```console
$ git clone https://github.com/fga-gpp-mds/2017.1-LocalizacaoDarcy
```

Entre no arquivo clonado e execute o seguinte comando para fazer o boot na máquina virtual e executa os o que está definido no VagrantFile

```console
$ vagrant up
```

Após isso, entre na maquina virtual criada
```console
$ vagrant ssh
```

Agora já na máquina virtual criada entre no bash
```console
$ vim ~/.bashrc
```

E adicione a seguinte linha no final do arquivo para que na próxima vez que abrir com ssh já abra na pasta do projeto.

```console
cd /vagrant/darcyWeb
```

Para entrar na pasta, reinicie o vagrant ssh ou digite
```console
$ cd
$ cd vagrant/
```

Já na máquina virtual, configure o postgree com:

Entre no modo root
```console
$ sudo su
```
Abra o seguinte arquivo
```console
$ nano /etc/postgresql/9.5/main/pg_hba.conf
```

Altere as linhas do arquivo de:
```console
local all postgres peer
local all all peer
```

Para:
```console
local all postgres trust
local all all trust
```

Reinicie o postgree
```console
service postgresql reload
```

Ainda no modo root, entre com o usuário postgres
```console
su postgres
```

Entre no postgresql
```console
psql -U postgres
```

Crie o usuário vagrant e autorize-o a criar databases
```console
CREATE USER vagrant WITH createdb;
```

Saia do postgres
```console
\q
```

Saia do usuário postgres e root
```console
exit
exit
```

Entre na pasta do projeto em rails darcyWeb e execute
```console
rake db:setup
rake db:migrate
```

Rode o servidor
```console
$ rails s
```
Abra seu navegador em localhost:8080

## Licença

[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)


<p align="center">Grupo 2 - Gestão de Portifólios e Projetos de Software (GPP) / Métodos de Desenvolvimento de Software (MDS)<br /><br />
<a href="https://fga.unb.br" target="_blank"><img width="200"src="https://4.bp.blogspot.com/-0aa6fAFnSnA/VzICtBQgciI/AAAAAAAARn4/SxVsQPFNeE0fxkCPVgMWbhd5qIEAYCMbwCLcB/s1600/unb-gama.png"></a>
</p>
