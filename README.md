# Multilang Frontend

## Overview

Multilang Frontend is an Angular application designed to interface with the Multilang Backend. It provides a user-friendly interface for managing multi-language projects, including languages, projects, translations, and URLs.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Build](#build)

## Prerequisites

- Angular: 17.3.8
- Node: 20.15.1
- Package Manager: npm 10.8.0

Used command: 
   ```bash
   ng new multilang-frontend --style=scss --routing=true --no-standalone --skip-tests
   ```
Used OS for development: Windows

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GalaaJS/multilang-frontend.git
   cd multilang-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a \`proxy.conf.json\` file in the root directory if you need to configure a proxy for API calls. Example:
   ```json
   {
     "/api": {
       "target": "http://localhost:3000",
       "secure": false
     }
   }
   ```

2. Update \`angular.json\` to include the proxy configuration:
   ```json
   "serve": {
     "options": {
       "proxyConfig": "proxy.conf.json"
     }
   }
   ```

## Usage

1. Start the development server:
   ```bash
   ng serve
   ```

2. The application will be available at \`http://localhost:4200\`.

## Project Structure

```
multilang-frontend/
├── .editorconfig
├── .gitignore
├── .hintrc
├── angular.json
├── package.json
├── package-lock.json
├── proxy.conf.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── src/
│   ├── app/
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── services/
│   │   ├── pages/
│   │   │   ├── language/
│   │   │   │   ├── language-edit/
│   │   │   │   ├── language-list/
│   │   │   │   ├── project/
│   │   │   │   ├── translation/
│   │   │   │   ├── url/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   ├── assets/
│   ├── environments/
├── .vscode/
    ├── launch.json
    └── settings.json
```

## Development

1. To generate a new component:
   ```bash
   ng generate component component-name
   ```

2. To generate a new service:
   ```bash
   ng generate service service-name
   ```

## Build

1. To build the project:
   ```bash
   ng build
   ```

2. The build artifacts will be stored in the \`dist/\` directory. Use the \`--prod\` flag for a production build.

