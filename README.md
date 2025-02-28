# Idea Repository

A web application for storing and retrieving software project ideas. Built with Node.js, Express, and MongoDB Atlas.

## Features

- Submit new project ideas with:
  - Name
  - Difficulty rating (1-10)
  - Authors
  - Description
- Retrieve random project ideas
- Modern, responsive user interface
- Cloud-based MongoDB storage

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier)

### Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Deployment

This application is deployed on Render.com. To deploy your own instance:

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Add your environment variables (MONGODB_URI)
5. Deploy!

## Project Roadmap

### Mid-game Features
- Worldwide hosting for app ideas
- Competition system
- Bounty marketplace
- Team formation platform

### Late-game Features
- AI-powered idea generator
- Automated app builder
- Advanced recommendation system

## API Endpoints

- `GET /api/ideas/random` - Get a random idea
- `POST /api/ideas` - Submit a new idea
- `GET /api/ideas` - Get all ideas

## Database Schema

Ideas are stored with the following structure:
```javascript
{
    ideaName: String,
    ideaDifficulty: Number (1-10),
    ideaAuthors: [String],
    ideaDescription: String,
    createdAt: Date,
    // Future fields
    category: String,
    tags: [String],
    bounty: {
        amount: Number,
        currency: String,
        active: Boolean
    },
    teamSize: {
        min: Number,
        max: Number
    }
}
