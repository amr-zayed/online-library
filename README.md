# BooksLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Tools

In this proejct, I used Tailwind for styling my components, Eslint for standardized coding and prettier to automatically format the code on saving file

## Files Structure

The different folders in the `app/` represents the different pages of the application. This case doesn't apply on the `app/shared/` folder. In it, you will find a bunch of compoennts, dataTypes, and data-access services - that access the backend through REST APIs- that are shared among all the other components of the applications.
In the root folder there is an `environments/` folder. This usually holds all the base urls for the backend and secrets that will allow the application to access the backend. I usually have 2 files one for development and one for production but this application is not deployed so there is no production file
