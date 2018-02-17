FROM ruby:2.4.3
RUN apt-get update
RUN apt-get install -y apt-utils git build-essential libpq-dev curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install -y yarn
RUN mkdir /campusmap
ADD .
WORKDIR /campusmap
RUN gem install bundler
RUN bundle package --all
