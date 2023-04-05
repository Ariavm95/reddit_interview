# Reddit App Interview

This project mainly started for an interview, and I tried to keep it as simnple as possible to avoid any confusion when giving the presentation. The time to complete this was few hours.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 13](https://developer.apple.com/xcode)
- [Cocoapods](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react query](https://tanstack.com/query/v4/docs/react/overview) for data-fetching.

## Note

Note that you need to create a `.env` file in the project directory and add `API_BASE=https://api.reddit.com` to make it work.

## Run

- Go to your project's root folder and run `yarn`.

- run `npx pod-install`

- run `yarn start`

- Run the app by opening the ios and folder in xcode and Android sStudio. OR run `yarn ios` or `yarn android` to start your application!

## Usage

This is just simple app to show sub reddit posts, but some functionalities are not feasible because the endpoints are not completely public.

# Folder Structure

-`src`: This folder is the main container of all the code inside your application.

-`components`: Folder to store any common component that you use through your app.

-`pages`: Folder that contains all your application screens/features.

-`App.tsx`: Main component that starts your whole app.

-`index.js`: Entry point of your application as per React-Native standards.
