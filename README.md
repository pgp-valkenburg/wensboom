# Wishing tree

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local setup

1. Create a [firebase project](https://firebase.google.com)
2. Create a realtime database
3. Copy the API data into an `.env.development.local` file (use `.env.example` as example)

4. setup local firebase tools

```
yarn global add firebase-tools
firebase emulators:start
yarn start
```

### Environment variables

checkout https://www.youtube.com/watch?v=vmLaZafaw9E for env file setup.

see `.env.example`

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```
