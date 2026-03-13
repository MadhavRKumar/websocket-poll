# websocket-poll

This is a simple Next.js and Typescript application using Websockets. You can
create a poll and share the link with others to vote and see the results update
in real-time.

## Setup

Once cloned, run `npm install` to install dependencies.

## Usage

Run `npm start` to start the development server. The app will be available at `http://localhost:3000`.

## Limitations

- The app does not persist data, so all polls and votes will be lost when the server restarts.
- There's no way to find existing polls, so if you lose the link to a poll, you won't be able to access it again.
- The app does not handle authentication, so anyone with the poll link can vote and see results.
- The app does not prevent duplcicate votes. So users can vote mutliple times.
- No validation is performed on the poll setup, so users can create polls with invalid options or no options at all.
- Cannot be deployed on Vercel currently since they do not support Websockets.

## Future Improvements

- Implement a database to persist polls and votes.
- Add valdation for poll creation to ensure that polls have valid options and a question.
- Better UI/UX for adding options to the poll instead of using a new line to separate options.
- Add user authentication to restrict access to polls and results.
- Implement a mechanism to prevent duplicate votes like using a cookie based ID.
- Allow polls to be closed either manually or by a specified end time.
- Presence indicators to show how many users are currently viewing the poll.
- Add automated tests, linting, type checking, and a pipeline.
