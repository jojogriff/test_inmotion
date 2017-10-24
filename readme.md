# Movie Collection
This is the root directory of both a front end and backend app. This project relies on [yarn](https://yarnpkg.com/lang/en/docs/install/) and [mongodb](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) which can both be installed with [homebrew](https://brew.sh/). 


### Backend
To get the backend started, navigate to the `server` directory and run:
  ```
  yarn
  yarn start
  ```

  The backend relies on mongodb as it's persistence layer so please ensure to run the mongo daemon. If you have mongo installed run:

  ```
  mongod --dbpath ./data/db
  ```

Inside the `server` directory, you can run several commands:
  ```
  yarn start
  ```
  Starts the development server.

  ```
  yarn test
  ```
  Starts the mocha test runner.

  The tests are not guaranteed to run successfully every time. It is intentionally left this way for a test interview.

### Frontend
Inside the `client` directory, you can run several commands:

  ```
  yarn start
  ```
  Starts the development server.

  ```
  yarn run build
  ```
  Bundles the app into static files for production.

  ```
  yarn test
  ```
  Starts the test runner.

  ```
  yarn run eject
  ```
  Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:
  ```
  cd client
  yarn start
  ```
