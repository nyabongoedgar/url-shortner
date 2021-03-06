# URL Shortner
This project contains source code for an application that takes a long url and creates a short url that can redirect to the long url.

## Technologies
__Backend__ - _Node js_

__Frontend__ - _React js_

__Database__ - _MongoDB_

## Set up

1. Clone the repository `url-shortner`:
   ```
    $ git clone https://github.com/nyabongoedgar/url-shortner.git
   ```

2. In the terminal, run 
 ``` 
 $ make setup
 ```
   This will build our docker containers for both the backend and the frontend

4. To start and attach the containers for our services, run
```
$ make server 
```

7. To run tests, run 
```
$ make test
```

## How to use the application

`When all the docker containers are running;`
- _Navigate to localhost:3000_
- _Paste a long url in the form provided_
- _Copy the short url generated and paste it in a new tab and observer the redirection._
- _You can also try to change the short code, a 404 page will be presented._

## Approach

```
Backend
```

_Technologies_
- I felt confident to use a package named `shortid` which creates amazingly short non-sequential url-friendly unique ids.
- Short id can generate any number of ids without duplicates, even millions per day.
- Short id also, by default uses 7-14 url-friendly characters: A-Z, a-z, 0-9, _-

_Database_
- MongoDB was used on the backend, simply because as a NOSQL database, we are guaranteed of faster lookup operations

_Server Clustering_
- A clustering technique was used on the backend to enable the creation of child processes (workers) that run simultaneously and share the same server port hence taking advantage of multiprocesser servers.

```
Frontend
```
- Our application is based on react js.

_Caching layer_

- With the caching layer, our application from the frontend point of view could really be so performant given that at times, all it has to do is hit the cache, pick the long url and redirect.

- We used react query on the frontend to simplify state management and introduce a caching layer which would in turn speed up our api lookup operations since some requests will hit the cache.

## Assumptions

- We assume that we have no user authentication on the platform, therefore the links are not unique to a particular user.
- We also assume that we are not accomodating needs for vanity urls.