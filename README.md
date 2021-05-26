# Podexpress

Codebase for Podexpress' web application.\
Copyright (C) 2021 by Podexpress AB

## Table of contents
* [Technologies](#technologies)
* [Installation](Installation)
* [#Local start](Local start)
* [Commit progress](Commit progress)
* [Other scripts](Other scripts)

## Technologies <a name="technologies"></a>
* React v17.0.1
* Node v14.2.0
* Various packages (see [https://github.com/williamfriefeldt/podexpress/blob/test/package.json](package.json))

## Installation <a name="installation"></a>
1. Clone the project (how to [https://git-scm.com/docs/git-clone](clone))
2. As package manager we use `yarn`. If you have `yarn`, skip to step X.
3. Install `yarn` [https://classic.yarnpkg.com/en/docs/install#windows-stable](here).
4. Enter the project in your terminal or [https://code.visualstudio.com/](VSC).
5. Install all packages with `yarn install` 
6. Create a file at the root of the project called `.env`.
7. Add all environment variables needed.

## Local start
First, checkout the dev branch and use `git pull` to get the latest code.
### Start frontend
Use `yarn start-client` to start the frontend application running on [http://localhost:3000](http://localhost:3000).
### Start backend
Use `yarn start-server` to start node server running on [http://localhost:5000](http://localhost:5000).
Endpoint for sending email is [http://localhost:5000/send_email](http://localhost:5000/send_mail).
### Start both
Use `yarn start` to start both front- and backend.

## Commit progress
Development is **always** made from branch `dev`. \
To test new development, use branch `test`. This branch should **only** be used to merge from `dev`.\
For production, use branch `main`. This branch should **only** be used to merge from `test`.

### Dev branch
1. Start from `dev`. If the branch is even with main go to step 3.
2. Type `git checkout main`, `git pull`, `git checkout dev`, `git merge main`, `git push` to update `dev` from `main`.
3. For larger changes, create a new branch from `dev`, make changes on this branch, merge it to `dev` and then close branch.
4. When done, type `git add *`, `git commit -m "[Message]"`. Keep the message short but clear. Finally, `git push`.

### Test branch
1. Start from `test`. If the branch is even with main go to step 3.
2. Type `git checkout main`, `git pull`, `git checkout test`, `git merge main`, `git push` to update `test` from `main`.
3. Type `git merge dev`, `git push` to update `test` with latest form `dev`.

### Main branch
Type `git checkout main`, `git pull`, `git merge test`, `git push` to update `main` with latest form `test`.

## Other scripts
Check `scripts` in [https://github.com/williamfriefeldt/podexpress/blob/test/package.json](package.json)) for available scripts.
### `yarn test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
