# RANT!

RANT! is a Social Media Full Stack Web Application designed for individuals to Rant.

## Technology Overview
It utilizes the following technologies:
* Client
  * ReactJS
  * Material UI
  * Axios
  * DayJS
  * JWT
* Server
  * NodeJS
  * ExpressJS
  * Firebase
    * Cloud Functions
    * Cloud Firestore
    * Cloud Storage

All code is constructed using Typescript.

## Prerequisites

### Technologies Used
* [ReactJS](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Axios](https://github.com/axios/axios)
* [DayJS](https://github.com/iamkun/dayjs)
* [JWT](https://jwt.io/)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Firebase](https://firebase.google.com/)

### Commands

Execute these commands to ensure Rant can run properly.

#### ReactJS
```
npm install react --save
```

#### Material UI
```
npm install @material-ui/core --save
npm install @material-ui/icons --save
npm install @material-ui/lab --save
```

#### Axios
```
npm install axios --save
```

#### DayJS
```
npm install dayjs --save
```

#### JWT
```
npm install jwt-decode --save
npm install @types/jwt-decode --save
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
## Directory

### Client
* **public** - details for publishing the page
* **src** - contains main React code (tsx components)
  * **assets** - assets for the project
    * **images** - various static images for the site (such as logo)
    * **themes** - themes for Material UI
  * **context** - Redux-style global storage using React Context API
    * **actions** - functions for global storage
  * **pages** - files containing components for each page
    * **components** - micro-components used for each main page

### Server
* **functions** - Firebase Cloud Functions default directory
  * **src** - primary TS files
    * **handlers** - ExpressJS route handlers (stores functions to be executed)
    * **util** - utilities to support the handlers
    * *customRequest.d.ts* - additional user property for ExpressJS Request type (used for LogIn)
    * *index.ts* - main file for ExpressJS API and Firebase Cloud Functions

## Contributors

* **Advaith Nair** 
    * *Project Manager*
    * *Full Stack Developer*
    * [Website](https://advaithnair.com)

## Contact
For questions, feel free to contact me at [advaithnair2@gmail.com](mailto:advaithnair2@gmail.com)