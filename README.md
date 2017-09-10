
Utility API
======
An API to for Jokes, Quotes and Facts.

# Features

* Jokes for the day 
* Quotes for the day
* Facts for the day

### Requirements

- npm


### Installation
```sh
$ git clone git@github.com:snghnaveen/utility-api.git
$ cd utility-api
$ npm install
$ NODE_ENV=development node index.js
```
Running Test
``` sh
$ ./node_modules/mocha/bin/mocha tests/test-script.js
```

# API Usage
### API Base URL: `http://utility-api.herokuapp.com/`


### GET: `/api/fact/factoftheday`
#### Example
Example usage: `GET http://utility-api.herokuapp.com/api/fact/factoftheday`

Example result:
```json
{
    "status": 200,
    "category": "Fact Of the day",
    "message": [
        "Research indicates that babies who suck on pacifiers are more prone to ear aches.",
        "Jean -Claude Van Damme learned to speak English by watching the cartoon 'The Flintstones.",
        "A hard working adult sweats up to 4 gallons per day. Most of the sweat evaporates before a person realizes it's there, though!"
    ]
}
```


### GET: `/api/quote/quoteoftheday`
#### Example
Example usage: `GET http://utility-api.herokuapp.com/api/quote/quoteoftheday`

Example result:
```json
{
    "status": 200,
    "category": "Quote Of the day",
    "message": [
        "The end of labor is to gain leisure.",
        "Ultimately, we wish the joy of perfect union with the person we love.",
        "Art is the proper task of life.",
        "You're only here for a short visit. Don't hurry, don't worry. And be sure to smell the flowers along the way.",
        "If all the cars in the United States were placed end to end, it would probably be Labor Day Weekend."
    ]
}
```


### GET: `/api/joke/jokeoftheday`
#### Example
Example usage: `GET http://utility-api.herokuapp.com/api/joke/jokeoftheday`

Example result:
```json
{
    "status": 200,
    "category": "Joke Of the day",
    "message": [
        "Q: Why did the one armed man cross the road? A: To get to the second hand shop.",
        "Why can't designated hitters bake pancakes? They also forget the batter.",
        "Why did the strawberry cross the road?  Because it's mama was in a jam!",
        "Q: What do you call a pig that does karate? A: A pork chop.",
        "Q: How many politicians does it take to change a light bulb? A: Two: one to change it and another one to change it back again."
    ]
}
```
# Todo
* Add more utility

# Contributing
Pull Request most welcome!!!