# RANT!

RANT! is a Social Media Full Stack Web Application designed for individuals to Rant.

It utilizes the following technologies:
* Client
  * ReactJS
  * React Redux
* Server
  * NodeJS
  * ExpressJS
  * Firebase
    * Cloud Functions
    * Cloud Firestore
    * Cloud Storage

All code is constructed using Typescript.

NOTE: The client code is not generated yet, we will do this once we finish the backend's primary structures.

## Prerequisites

### Technologies Used
* [ReactJS](https://reactjs.org/)
* [React Redux](https://redux.js.org/)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Firebase](https://firebase.google.com/)

### Commands

Execute these commands to ensure Rant can run properly.

#### ReactJS
```
npm install react --save
```

#### NodeJS
```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```
OR
```
brew install node
```

#### ExpressJS
```
npm install express --save
npm install @types/express --save
```

#### Firebase
```
npm install -g firebase-tools
firebase init
```

## Contributors

* **Advaith Nair** - *Project Manager and Full Stack Developer* - [Website](https://advaithnair.com)
* **Miles Gregg** - *Full Stack Developer* - [GitHub](https://github.com/MilesGregg)

## Contact
For questions, feel free to contact us at either [advaithnair2@gmail.com](mailto:advaithnair2@gmail.com) or [milesgregg3@gmail.com](mailto:milesgregg3@gmail.com)

