# Planning Poker App

Free / Open source Scrum/Agile Planning Poker Web App to estimate user stories for the Agile/Scrum teams. Create session and invite team members to estimate user stories efficiently. Intuitive UI/UX for voting the story points, showing team members voting status with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Session Moderator has full control on revealing story points and restarting the session.

## Live Site 
- https://planning-poker-agile.web.app/

## Home Page

<img src="docs/HomePage.jpg"  />

## Active Session

<img src="docs/ActiveSession.jpg"  />


## Features

1. Create new Session
2. Join Session
3. Invite Link
4. Session controller - Moderator can Reveal and restart the session anytime.
5. Reveal - Reveal the cards for all users
6. Voting status - Users Cards show voting status using emojis - 👍 - Voting Done, 🤔 - Yet to Vote

## Tech Stack

1. React - Frontend
2. Material-ui - UI Components
3. Firestore - Database
4. Firebase - Hosting

## Pending features open to development

1. Support for custom voting options - T-Shirt sizes
2. Remove a user in session
3. Add timer
4. Export options
5. Preserve history of voting and show it in session
6. Provide option to enter user story name
7. Make the default Session name random
8. Delete Session

## Tech Depts

1. Add Semantic Release to generate changelog and release notes
2. Add Github workflow for running unit tests in PR and Master pipelines
3. Add Linter
4. Add Prettier
5. Add cookie notice
