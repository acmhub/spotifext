# Spotifext

A Spotify clone made with Spotify API, NextAuth, Recoil, Middleware and TailwindCSS.

## Demo

![alt text](https://i.imgur.com/rV8UHiL.png)

## Features

-   Real playback based on Spotify API
-   Login functionality with JWT OAuth
-   Authenticated routes based on middleware
-   Debounce functionality to prevent spamming Spotify API
-   Recoil to manage playlist/song state
-   Fully responsive

## How to run locally

Thanks to the Spotify API developer to use this app you will need the following:

-   A Spotify Premium Account
-   The real Spotify app running in the background
-   A Spotify developer account and app created

#

Clone the project

```bash
  git clone https://github.com/acmhub/spotifext
```

Go to the project directory

```bash
  cd spotifext
```

Install dependencies

```bash
  npm install
```

Go to

```
https://developer.spotify.com/dashboard/
```

Login with your (premium) spotify account, create a new app and copy the `Client ID` and `Client Secret`.

Open 'edit settings' and add to `Redirect URI's` the following(this may differ based on your local enviroment):

```
http://localhost:3000/api/auth/callback/spotify
```

Open the project directory and create a .env file consisting of:

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_ID=previously_copied_client_id
NEXT_PUBLIC_CLIENT_SECRET=previously_copied_client_secret
JWT_SECRET=my_jwt_secret_value
```

Open the real spotify client on your device of choosing.

Start the server and enjoy your music

```bash
  npm run dev
```
