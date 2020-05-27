# Examination system frontend
This repo contains UI part for [examination system with hyperledger](https://github.com/cyproto/examination-system_with_hyperledger-fabric.git "examination system with hyperledger").
Written in angular 8 with versions as follows:
- **angular/cli:** 8.3.12
- **angular/core:** 8.2.11
- **angular/compiler:** 8.2.11
- **node:** v10.15.2
- **npm:** 5.8.0

## Running the app:
- Clone this repo.
```bash
git clone https://github.com/cyproto/examination-system_frontend.git
cd examination-system_frontend
npm install
ng serve
```

- To use it only as a standalone angular app without hyperledger just remove the api calls and initialize `questionsData` using data pulled from firebase. Commit for [reference](https://github.com/cyproto/examination-system_frontend/commit/c6ca8b1edc0744e3d2a49cd086fd26d74578739a#diff-2d2ba86cb65d1f22eb69d8ff6b8f1f04L61 "reference").

## Working: 
<img src="https://i.imgur.com/7uM88gH.png)" width="350">

- Currently Login/ Signup part is handled with angular, a new document is creadted everytime new user signs up. 
- While taking test the questions are pulled from firebase and are pseudo randomly selected from the set.
- After submitting test, the responses are stored in firebase as welll as it gives a call to node api `sendResult`  which can be seen  [here](https://github.com/cyproto/examination-system_with_hyperledger-fabric/blob/master/exam_result/javascript/app.js#L61 "here").
- After submitting he test user will be logged out automatically.
- To view the result he/she has to login with the same account. The result will be pull from `getResult` api which can be referred [here](https://github.com/cyproto/examination-system_with_hyperledger-fabric/blob/master/exam_result/javascript/app.js#L19 "here").

## Key features:
- All basic validations in signup and login page.
- Display error if account with email already exists, passoword is wrong, etc.
- Save selected qustions to database while taking test in case the user disconnects.
- Save elapsed time while taking test in case of disconnection.
- Minimistic and Material UI.
- Generation of certificates with QR code to verify integrity of the result.
- Logout user if reload/refresh is clicked.
- Disabled copy, paste and inspect element.

## Screens:
#### Signup
![img](https://i.imgur.com/lDrVTam.png)
#### Login
![img](https://i.imgur.com/gkVThej.png)
#### Instructions page
![img](https://i.imgur.com/ehlEXba.png)
#### Test panel
![img](https://i.imgur.com/9IGoKQo.png)
#### Result
![img](https://i.imgur.com/I7Qzo0s.png)
#### Result overview
![img](https://i.imgur.com/qQ95Hgr.png)
#### Generated certificate PDF
![img](https://i.imgur.com/lRKeJjF.png)
#### Misc
![img](https://i.imgur.com/281P6cD.png)