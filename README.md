# threeflows-blockly
Experimenting with a blocks-based editor for Teacher Moments scenarios (http://github.com/mit-teaching-systems-lab/threeflows)

## Demo
See [https://threeflows-blockly.herokuapp.com/](https://threeflows-blockly.herokuapp.com/).

![Demo](docs/demo.png)

## Setup
```
$ psql
CREATE TABLE programs (
  id serial primary key,
  user_key text,
  xml text,
  timestamp timestamp
);
```
## Run locally
```
$ npm install
$ npm run dev
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).