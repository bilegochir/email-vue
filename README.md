# VueJS frontend application for EmailApp

> Email service that accepts the necessary information and sends emails

## How to run on your local machine

``` bash

# make sure server application running
# set the server API port (default: 3000)

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How to deploy to the Heroku server

``` bash

# install heroku CLI

# create production files (/dist)
npm run build

# Log in using the email address and password you used when creating your Heroku account:
heroku login

# update the remote’s details
heroku git:remote -a email-app-bilegochir

# add to git
git add .
git commit -m 'Commit message'

# now deploy your code
git push heroku master

# restart heroku server (optional)
heroku restart

# open the deployed application
heroku open

```

## TODO list

- [ ] Create service file to handle API services
- [ ] Need more testing on input validation
- [ ] Able to attach file
