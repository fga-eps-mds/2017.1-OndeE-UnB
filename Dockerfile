FROM ruby:2.3.1

RUN mkdir -p /darcyWeb

RUN apt-get update

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y git curl automake build-essential bison
RUN apt-get install -y libpq-dev libssl-dev libtool libcurl4-openssl-dev
RUN apt-get install -y libyaml-dev libreadline-dev libxml2-dev libxslt1-dev
RUN apt-get install -y libffi-dev libffi-dev libgdbm-dev libncurses5-dev
RUN apt-get install -y libsqlite3-dev sqlite3 zlib1g-dev
RUN apt-get install -y python-software-properties

RUN gem install bundler
RUN gem install nokogiri -v '1.6.8'
RUN gem install rails
RUN apt-get autoremove
RUN apt-get autoclean
RUN apt-get update

WORKDIR /darcyWeb

ADD Gemfile /darcyWeb/Gemfile
ADD Gemfile.lock /darcyWeb/Gemfile.lock

RUN bundle install
ADD . /darcyWeb