
# What's Streaming?

What's Streaming? is an application that allows users to view content options available on their favorite streaming platforms!


## Introduction

Introducing "What's Streaming?" - your one-stop-shop for finding the latest and greatest entertainment available on various streaming platforms. Have you ever found yourself scrolling through endless streaming apps searching for something to watch? With entertainment companies creating their own platforms, it's becoming increasingly difficult to keep track of what content is available where. That's where "What's Streaming?" comes in. Our app allows users to filter through the content currently available on each platform in one place, making it easy to find your next binge-worthy show or movie. We started this project because we too found ourselves frustrated with the constant search for new content across multiple streaming providers. We believe that "What's Streaming?" will simplify the process for others who are tired of the endless scrolling. Thank you for checking out our project and we hope it helps you find your next favorite show or movie!
## Tech Stack

**Client:** React, Redux, MUI, MUI-Material, Font Source, Axios, Day JS, Formik, React-Router-Dom, Swiper, Yup, Toastify

**Server:** Node, Express, Axios, BCrypt JS, Cookie-Parser, Cors, DotEnv, Mongoose, Nodemon, Json Web Token


## Features

- Light/dark mode toggle
- Full swiping functionality for mobile
- Filter through Top-Rated or Popular categories
- Filter through Movies or TV content types
- User sign-up and login
- User reviews guarded by protected routes
- Users can "heart" their favorite content and add it to their favorites list


## Authors

- [@b-richardson](https://www.github.com/b-richardson)


## Deployment

To run this project locally you'll need to create a .env folder in the root of the /server directory. 

Using the example.env as guidance, fill in your own keys for the project.

What you'll need:
```bash
  mongodb url
  port 
  jsonwebtoken secret
  the movie database url
  the movie database api key
```



## Example.env

MONGODB_URL="your-mongo-connection-url-here",

PORT=5000,

TOKEN_SECRET="your-token-secret",

TMDB_BASE_URL=https://api.themoviedb.org/3/,

TMDB_KEY=

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```
Open a split terminal

Go to the server directory in terminal A

```bash
  my-project> cd server
```
Go to the client directory in terminal B

```bash
  my-project> cd client
```
Install dependencies in both

```bash
  npm install
```

Start the server in terminal A

```bash
  node index.js
```
Start the front-end in terminal B

```bash
  npm start
```


## Screenshots

![](https://res.cloudinary.com/dtorad1cb/image/upload/v1680710571/whats-streaming-demo1_jipzqv.png)

![](https://res.cloudinary.com/dtorad1cb/image/upload/v1680710570/whats-streaming-demo2_hsthar.png)

![](https://res.cloudinary.com/dtorad1cb/image/upload/v1680710571/whats-streaming-demo3_qaaauu.png)
## Roadmap/Project Status

- Currently Working On
    - Filtering by streaming provider
    - General performance optimizations
    - Addition of new filtering: Genres, What your friends are watching 

- Future Additions & Implimentations
    - Changing the UI color theme to match the theme of the currently viewing straming provider. (i.e. Netflix = Red, Prime Video = Light Blue, Hulu = Green)
    - Accessability for screen-readers
    - Friends lists
    - Friend recommended lists


## Acknowledgements

elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)

 - [The Movie Database API](https://www.themoviedb.org/)

