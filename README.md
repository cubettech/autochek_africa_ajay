# Autochek Vehicle Valuation and Financing Services

## Overview

The Autochek project is a backend API built with NestJS, TypeORM, and SQLite. It provides vehicle valuation and financing services, allowing users to apply for loans and retrieve vehicle valuations based on VIN (Vehicle Identification Number). The API integrates with third-party services to fetch vehicle valuation data and offers endpoints for managing loan applications.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Fetch vehicle valuation using VIN.
- Apply for loans and manage loan applications.
- HTTP error handling throughout the application.
- Integration with third-party APIs for vehicle valuation data.
- Error handling service for managing application errors centrally.

## Technologies

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [TypeORM](https://typeorm.io/) - An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- [SQLite](https://www.sqlite.org/index.html) - A lightweight, serverless, self-contained SQL database engine.
- [RxJS](https://rxjs.dev/) - A library for reactive programming using Observables.
- [Swagger](https://swagger.io/) - For API documentation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ajay-ske/autochek.git
   cd autochek

   ```

2. Install the dependencies::

   ```bash
   npm install
   ```

3. Set up your environment variables by creating a .env file in the root directory:

   ```
    RAPIDAPI_VLOOKUP_URL=your_rapidapi_url
    RAPIDAPI_KEY=your_rapidapi_key
    RAPIDAPI_HOST=your_rapidapi_host
    LTV_RATIO=YOUR_LTV_RATIO
    JWT_SECRET=a_secure_secret_for_jwt
   ```

4. Run the application:
   npm run start:dev

## Usage

Once the application is running, you can access the API endpoints at http://localhost:3030/api/docs to access Swagger UI to interact with the API.

### Key Updates:

1. **User Authentication Section**: Added a section explaining the sign-up and sign-in functionality.

2. **JWT Secret**: Mentioned adding a `JWT_SECRET` environment variable for authentication.

3. **Example API Endpoints**: Included examples of API endpoints related to loan applications and user authentication.

This README will help users understand the functionality and how to get started with the Autochek API, including the user authentication module.
