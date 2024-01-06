# Interview Scheduler

Scheduler is a single-page app (SPA) made with React and tested using Storybook, Jest, and Cypress. It allows users to manage appointments with a host of interviewers.

This project was created solely for gaining experience with React and various testing frameworks. It is currently deployed [here](https://enchanting-pixie-b32c29.netlify.app/) via Netlify and Railway.app.

## Final Product

!["A view of booked appointments"](https://github.com/adam-kowalczuk/scheduler/blob/master/docs/appointment-hover.png?raw=true)
!["Book an appointment with this simple form"](https://github.com/adam-kowalczuk/scheduler/blob/master/docs/appointment-form.png?raw=true)
!["Careful, you must enter your name and select an interviewer"](https://github.com/adam-kowalczuk/scheduler/blob/master/docs/appointment-form-error.png?raw=true)
!["Maybe you need to cancel your appointment"](https://github.com/adam-kowalczuk/scheduler/blob/master/docs/confirm.png?raw=true)
!["Uh oh! Looks like there was an error cancelling your appointment"](https://github.com/adam-kowalczuk/scheduler/blob/master/docs/error.png?raw=true)

## Dependencies

- axios: 0.20.0
- classnames: 2.2.6
- normalize.css: 8.0.1
- react: 16.9.0
- react-dom: 16.9.0
- react-hooks: 1.0.1
- react-scripts: 3.4.4

## Dev Dependencies

- @babel/core: 7.4.3
- @storybook/addon-actions: 5.0.10
- @storybook/addon-backgrounds: 5.0.10
- @storybook/addon-links: 5.0.10
- @storybook/addons: 5.0.10
- @storybook/react: 5.0.10
- @testing-library/jest-dom: 4.0.0
- @testing-library/react: 8.0.7
- @testing-library/react-hooks: 1.1.0
- babel-loader: 8.1.0
- eslint-plugin-cypress: 2.13.2
- prop-types: 15.8.1
- react-test-renderer: 16.9.0
- sass: 1.53.0

## Getting Started

Clone this repository onto your local device and install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running PostgreSQL Database

Fork and clone the [Scheduler_API](https://github.com/lighthouse-labs/scheduler-api) database and follow that README for configuration.

Both servers run concurrently, and requests are proxied from Webpack to the API server.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
