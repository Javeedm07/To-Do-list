# Modern Todo List Application

A modern, responsive todo list application built with Node.js, Express, and PostgreSQL. Features a clean interface with real-time task management capabilities.

## Features

- ✨ Clean, modern user interface
- ✅ Create, read, update, and delete tasks
- 🔄 Real-time updates
- 📱 Responsive design for all devices
- 🎯 Input validation and error handling
- 🔒 Database persistence
- 💫 Smooth animations and transitions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Javeedm07/To-Do-list.git
cd To-Do-list
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=permalist
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

4. Set up the database:
```sql
CREATE DATABASE permalist;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Access the application at:
```
http://localhost:3000
```

## Project Structure

```
To-Do-list/
├── public/
│   ├── assets/
│   │   └── icons/
│   └── styles/
│       └── main.css
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── index.ejs
├── index.js
├── package.json
└── .env
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript
- **Dependencies**:
  - `express`: Web application framework
  - `pg`: PostgreSQL client
  - `dotenv`: Environment variable management
  - `body-parser`: Request body parsing
  - `ejs`: Template engine

## Features in Detail

### Task Management
- Add new tasks
- Mark tasks as complete
- Edit existing tasks
- Delete tasks
- Real-time updates

### Error Handling
- Input validation
- Database error handling
- User-friendly error messages
- Graceful error recovery

### User Interface
- Responsive design
- Clean, modern aesthetics
- Smooth animations
- Intuitive task management
- Error message display


## License

This project is licensed under the MIT License - see the LICENSE file for details.
