# 2017.1 Sistema de Localização no campus Darcy Ribeiro

## Instalação

Para contribuir com esse repositório é necessário a instalação do VirtualBox e Vagrant em um ambiente linux como o ubuntu.

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
Configure o postgree com:
```console
$ sudo su
$ nano /etc/postgresql/9.5/main/pg_hba.conf
```

Altere as linhas do arquivo de:
```console
local all postgres peer
local all all peer
```

Para:
```console
local   all postgres trust
local   all all trust
```

Reinicie o postgree
```console
service postgresql reload
```
Saia do modo root
```console
exit
```

Para entrar na pasta, reinicie o vagrant ssh ou digite
```console
$ cd
$ cd vagrant/
```

Rode o servidor
```console
$ rails s
```
Abra seu navegador em localhost:8080