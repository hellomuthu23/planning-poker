
<h1>Planning Poker App</h1>

Free / Open source Scrum/Agile Planning Poker Web App to estimate user stories for the Agile/Scrum teams. Create session and invite team members to estimate user stories efficiently. Intuitive UI/UX for voting the story points, showing team members voting status with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Session Moderator has full control on revealing story points and restarting the session.

<div>
  
[![Build and Tests](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml)
[![Deploy to Firebase](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml)

</div>


## Home Page

<img src="docs/HomePage.jpg"   alt=""/>

## Active Session

<img src="docs/ActiveSession.jpg"   alt=""/>

## Features

1. Create new Session (Short Fibonacci, Fibonacci, T-Shirt, T-Shirt & Numbers, Custom)
2. Join Session
3. Invite Link
4. Session controller - Moderator (or all members if allowed) can Reveal and restart the session anytime.
5. Reveal - Reveal the cards for all users
6. Voting status - Users Cards show voting status using emojis - 👍 - Voting Done, 🤔 - Yet to Vote
7. Remove user from session
8. Delete Session - Moderator can delete the session completely

## Tech Stack

1. React 19 - Frontend
2. Material-UI 7 - UI Components
3. Firestore - Database

## How to run the app locally for development

Pre-req

- Node.js version 22.0 or higher.
- npm

1. Clone the repo

    ```bash
    git clone hhttps://github.com/rfoerthe/planning-poker.git
    ```

2. Run `npm install` command to install the required npm package.

3. Copy `.env.example` file as `.env` file and update your firebase connection data
4. Run `npm run dev` to start the app.
5. Access the app at `http://localhost:5173`.

## Creating docker container

0. pre-req: Docker installed in your machine


1. Build docker image

    ```bash
    docker build --secret id=myenv,src=.env -t planning-poker .
    ```

2. Running the container

   ```
   docker run -d -p 8080:80 --name planning-poker planning-poker
   ```

3. Access the app from local container using <http://localhost:8080>

## Development Guidelines

1. Keep it simple as much as possible
2. Add required unit tests
3. Use strong type always
4. Use functional and hooks based approach for components
5. Avoid adding new colors
6. Use css until we have scss in place
7. Don't duplicate code and use service folder to keep non-component/shared codes

## Pending features open to development

1. Add timer
2. Export options
3. Preserve history of voting and show it in session
4. Provide option to enter user story name

## Tech Debts

1. Add Semantic Release to generate changelog and release notes
2. Add missing unit tests for services
