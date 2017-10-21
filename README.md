<p align="center"><img width="300" src="https://s11.postimg.org/wvguvenmb/Captura_de_tela_de_2017-06-05_17-22-56.png"></p>

<p align="center">
<a href="https://circleci.com/gh/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://circleci.com/gh/fga-gpp-mds/2017.1-OndeE-UnB.svg?style=shield&circle-token=:circle-token" alt="Build Status"></a>
<a href="https://codeclimate.com/github/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/codeclimate/github/fga-gpp-mds/2017.1-OndeE-UnB.svg" alt="Build Status"></a>
<a href='https://coveralls.io/github/fga-gpp-mds/2017.1-OndeE-UnB?branch=devel'><img src='https://coveralls.io/repos/github/fga-gpp-mds/2017.1-OndeE-UnB/badge.svg?branch=devel' alt='Coverage Status' /></a>
<a href="(https://github.com/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/badge/ruby-2.3.3-blue.svg"></a>
<a href="(https://github.com/fga-gpp-mds/2017.1-OndeE-UnB"><img src="https://img.shields.io/badge/rails-5.1.4-blue.svg"></a>
<a href="http://www.gnu.org/licenses/agpl-3.0"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3"></a>
<a href="https://github.com/fga-gpp-mds"><img src="https://img.shields.io/badge/gpp--mds-2017.1-lightgrey.svg" alt="GPP/MDS 2017.1"></a>
</p>

# Onde É? UnB

## Sobre o Projeto

<p align="justify">O "Onde É? UnB" tem a finalidade de facilitar a localização, via mapa interativo, de algumas das instalações e estabelecimentos do Campus Darcy Ribeiro da UnB. A plataforma web é um serviço de localização dentro do campus que pretende auxiliar os diversos frequentadores da UnB a encontrar edifícios, departamentos e salas.</p>

## Links do Site / Deploy Contínuo

* [Site Oficial](https://ondeeunb-prod.herokuapp.com/)
* [Ambiente de Homologação](https://ondeeunb-dev.herokuapp.com/)

## Instalação

Para contribuir com esse repositório é necessário a instalação do Docker e Docker Compose.

Faça clone ou download do repositório.

```console
$ git clone git@github.com:OndeEUnB/OndeEUnB.git
```

Entre na pasta do projeto e suba o ambiente. A primeira vez pode demorar.
```console
$ docker-compose up
```

Em outra aba do terminal, configure o banco de dados.
```console
$ docker-compose run web rails db:setup
```

Instale os pacotes JavaScript.
```console
$ docker-compose run web yarn install
```

Abra seu navegador em localhost:3000

## Instruções Adicionais

Sempre que alterar o Gemfile, atualize a imagem.
```console
$ docker-compose build
```

## Principais Features

O projeto OndeÉ?UnB tem como principais features:

* Traçar Rotas
* Tutorial da aplicação
* Gerenciamento de Edifícios, Salas, Administradores e Plantas
* Compartilhar Localização
* Visualizar Lanchonetes, Banheiros, Paradas de Ônibus, Bicicletários, Pontos de Informação e Por Satélite.
* Pesquisas otimizadas com autocomplete
* Sidebar com informações de Edifícios e Salas


## Documentação do Projeto

Visualize a documentação na nossa [wiki](https://github.com/fga-gpp-mds/2017.1-OndeE-UnB/wiki).

## Licença

[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)


<p align="center">Grupo 2 - Gestão de Portifólios e Projetos de Software (GPP) / Métodos de Desenvolvimento de Software (MDS)<br /><br />
<a href="https://fga.unb.br" target="_blank"><img width="200"src="https://4.bp.blogspot.com/-0aa6fAFnSnA/VzICtBQgciI/AAAAAAAARn4/SxVsQPFNeE0fxkCPVgMWbhd5qIEAYCMbwCLcB/s1600/unb-gama.png"></a>
</p>
