# 2017.1 Sistema de Localização no campus Darcy Ribeiro

README.md em desenvolvimento

Para contribuir com esse repositório é necessário a instalação do VirtualBox e Vagrant.

Faça clone ou download do repositorio

git clone <url>

Entre no arquivo e execute:

vagrant up

Após isso, entre na máquina virtual:

vagrant ssh

Abra o bash:

vim ~/.bashrc

Insira essa linha no final do arquivo para que na próxima vez que abrir com ssh já abra na pasta do projeto.

cd /vagrant/darcyWeb

Configure o postgree com:

sudo su
cd
nano /etc/postgresql/9.5/main/pg_hba.conf

Altere as linhas:
local	all	postgres	peer
local	all	all	peer

Para:

local	all	postgres	trust
local	all	all	trust

E reinicie o postgree:

service postgresql reload

Saia do modo root:

exit

Entre na pasta do projeto e digite:
bundle install
rake db:migrate
rails s

O seu site deverá estar rodando em localhost:8080
