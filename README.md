# Multilang Frontend

## Overview

Multilang Frontend is an Angular application designed to interface with the Multilang Backend. It provides a user-friendly interface for managing multi-language projects, including languages, projects, translations, and URLs.

## Features

1. The system allows you to register and edit projects. Additionally, you can add users to projects. This feature enables the system to send `email` notifications to the subscribed users.
2. There is a section for managing URLs.
3. There is a section for registering strings. You can link URLs and projects to the strings. When deleting a string, its status will be set to inactive. An `email` will be sent to users associated with the projects that use the string.
4. There is a section for user registration. From here, users can also manage the projects they have access to.
5. The language JSON is sent to the client. During this process, it is compressed and minified. This reduces the bandwidth usage.
6. A test `email` account was created at galaa.multilang@gmail.com. `Emails` are sent from this account to users when a string is marked as inactive.

## Prerequisites

- Node: 20.16.0
- Package Manager: npm 10.8.0

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
   npm start
   ```

2. The application will be available at `http://localhost:4200`.