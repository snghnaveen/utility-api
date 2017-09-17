
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
```

- Without Docker

```sh
$ npm install
$ npm start
```
- With Docker 
```sh
$ sudo docker-compose up --build
```

Running Test
``` sh
$ npm test
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
    ]
}
```

### GET: `/api/news/newsoftheday`
#### Example
Example usage: `GET http://utility-api.herokuapp.com/api/news/newsoftheday`

Example result:
```json
{
    "status": 200,
    "category": "News Of The  Day",
    "message": [
        {
            "id": "_8nl6wps060",
            "headLine": "Reserved coach travellers can sleep from 10pm-6am: Railways",
            "articleBody": "According to a Railways circular, passengers in reserved coaches of trains will now only be allowed to sleep between 10 pm and 6 am. The provision comes in place to allow others to sit on seats for the remaining time, after officials reported issues between passengers over sleeping arrangements. The rule, however, exempts sick and disabled passengers, and pregnant ladies.",
            "url": "https://www.inshorts.com/en/news/reserved-coach-travellers-can-sleep-from-10pm6am-railways-1505643774888",
            "timestamp": "2017-09-17 11:55:01"
        },
        {
            "id": "_8nl6wps061",
            "headLine": "Rahul uses wrong rank in tweet for late Marshal Arjan Singh",
            "articleBody": "Congress Vice President Rahul Gandhi referred to late Marshal of the Indian Air Force Arjan Singh as \"Air Marshal Arjan Singh\", while condoling his death. He also misspelled \"deepest\" in his tweet, writing \"Deppeset\". Notably, Air Marshal is used for 3-star officers of the Air Force, while Marshal Singh was India's only 5-star-ranked IAF officer.",
            "url": "https://www.inshorts.com/en/news/rahul-uses-wrong-rank-in-tweet-for-late-marshal-arjan-singh-1505636684101",
            "timestamp": "2017-09-17 11:55:01"
        }
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
    ]
}
```

### (optional query param)
- items : number of items expected in message (1 to 60), default is 10

### Example CURL
```sh
curl -i -X GET http://utility-api.herokuapp.com/api/joke/jokeoftheday?items=4
```
# Todo
* Add more utility

# Contributing
Pull Request most welcome!!!