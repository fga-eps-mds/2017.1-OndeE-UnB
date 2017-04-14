# 2017.1 Onde É UnB

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
* Ps: em edição, caso não funcione essa etapa, tente rake db:create:all e entao rake db:migrate. Se quiser testar ainda mais, execute rails g scaffold Foo name:text description:text

Rode o servidor
```console
$ rails s
```
Abra seu navegador em localhost:8080


