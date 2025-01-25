# TerraCustos

## Overview

TerraCustos is a project aimed at providing real-time disaster reporting and visualization. The project leverages Mapbox for map visualization and Supabase for backend services. Users can report disasters, view disaster reports, and get real-time updates on disaster events.

## Our Team

Team Half Alive: Tawsif Mayaz and Abeer Das

## Features

- Real-time disaster reporting
- Map visualization using Mapbox
- User authentication and authorization
- Integration with Supabase for backend services
- Fetching disaster events from external APIs

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Supabase account
- Mapbox account

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tawsifrm/OEC2025.git
   cd OEC2025
   ```

2. Install dependencies for the client:

   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```bash
   cd ../server
   npm install
   ```

## Usage

### Starting the Client

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Start the client application:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Starting the Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Start the server application:

   ```bash
   node app.js
   ```

3. The server will be running on [http://localhost:3000](http://localhost:3000).

## Client-Side Components

The client-side application is built using Create React App. It includes the following main components:

- `MapPage.jsx`: Contains the main map functionality using Mapbox and Supabase.
- `supabaseclient.js`: Configures the Supabase client for the project.
- `AddReportModal.jsx`: Component for adding new disaster reports.
- `ReportDisplay.jsx`: Component for displaying disaster reports.
- `ReportDetailModal.jsx`: Component for displaying detailed information about a disaster report.

### Client-Side Dependencies

The client-side application has the following dependencies:

- `@supabase/auth-ui-react`
- `@supabase/supabase-js`
- `@tailwindcss/postcss`
- `cra-template`
- `mapbox-gl`
- `postcss-cli`
- `react`
- `react-dom`
- `react-modal`
- `react-router-dom`
- `react-scripts`
- `web-vitals`

### Client-Side Scripts

The client-side application includes the following scripts:

- `start`: Starts the client application.
- `build`: Builds the client application for production.
- `test`: Launches the test runner.
- `eject`: Ejects the Create React App configuration.

## Server-Side Components

The server-side application is built using Express. It includes the following main components:

- `app.js`: Sets up a basic Express server.

### Server-Side Dependencies

The server-side application has the following dependencies:

- `express`

## Documentation

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Supabase Documentation](https://supabase.io/docs)

## Contact Information

For any questions or inquiries, please contact the project maintainers:

- Tawsif Rahman: [tawsifmayaz@gmail.com](mailto:tawsimayaz@gmail.com)
- Abeer Das: [abeerdas647@gmail.com](mailto:abeerdas647@gmail.com)
