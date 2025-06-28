
<h1 align="center">Planning Poker App</h1>

Free / Open source Scrum/Agile Planning Poker Web App to estimate user stories for the Agile/Scrum teams. Create session and invite team members to estimate user stories efficiently. Intuitive UI/UX for voting the story points, showing team members voting status with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Session Moderator has full control on revealing story points and restarting the session.

<div align="center">
  
[![Build and Tests](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml)
[![Deploy to Firebase](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml)

</div>

## Live Site

- <https://planning-poker-agile.web.app/>

## Home Page

<img src="docs/HomePage.jpg"  />

## Active Session

<img src="docs/ActiveSession.jpg"  />

## Features

1. Create new Session(Fibonacci, Short Fibonacci, TShirt size or Custom)
2. Join Session
3. Invite Link
4. Share User story name/number with others using the board
5. Session controller - Moderator can Reveal and restart the session anytime.
6. Reveal - Reveal the cards for all users
7. Voting status - Users Cards show voting status using emojis - 👍 - Voting Done, 🤔 - Yet to Vote
8. Remove user from session
9. Delete Session - Moderator can delete the session completely
10. Dark Theme Support
11. Multiple language support
12. Mobile/Tablet screen support

## Tech Stack

1. React - Frontend
2. Tailwind CSS - For styling
3. Firestore - Database
4. Firebase - Hosting

## How to run the app locally for development

Pre-req

- Node.js version 16.0 or higher.
- Yarn
- Java JDK version 11 or higher.(for firestore db emulator)

1. Clone the repo

    ```bash
    git clone https://github.com/hellomuthu23/planning-poker.git
    ```

2. Run `yarn` command to install the required npm package.
3. Install the Firebase CLI

    ```bash
    RUN npm install -g firebase-tool
    ```

4. Start the firebase db emulator

    ```bash
    npm run start:emulator
    ```

5. Copy `.env.example` file as `.env` file and make sure `REACT_APP_USE_FIRESTORE_EMULATOR` is set to `true`
7. Run `yarn start` to start the app.
6. Access the app at `http://localhost:3000`.

## Creating docker container

pre-req

- docker desktop

1. Build the app using below command. Make sure `REACT_APP_USE_FIRESTORE_EMULATOR` env variable is set to true.

   ```bash
   npm run build
   ```

2. Build docker image

    ```bash
    docker build -t planning-poker .
    ```

3. Running the container

   ```
   docker run -it -p 8080:8080 -p 3000:3000  planning-poker
   ```

4. Wait for both emulator and app to start
5. Access the app from local container using <http://localhost:3000>

## Development Guidelines

1. Keep it simple as much as possible
2. Add required unit tests
3. Use strong type always
4. Use functional and hooks based approach for components
5. Avoid adding new colors
6. Use tailwind utility classes for styling the components
7. Don't duplicate code and use service folder to keep non-component/shared codes

## Pending features open to development

1. Add timer
2. Export options
3. Preserve history of voting and show it in session
4. Ask AI Option

## Tech Debts

1. Add Semantic Release to generate changelog and release notes
2. Add missing unit tests for services

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hellomuthu23)
