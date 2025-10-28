# Task Manager API

A simple and efficient REST API for managing tasks built with Express.js and Node.js. This API allows users to perform CRUD operations on tasks, toggle task statuses, and execute bulk operations for better task management.

## 👥 Team Members
- **Person 1** - Osborn Tulasi - @10xosborn (https://github.com/10xosborn)
- **Person 2** - [Partner's Name] - [@partner-github-username](https://github.com/partner-github-username)

**Course:** BeTechified Backend Development - Capstone Project  
**Submission Date:** October 30, 2025  
**Presentation Date:** November 1, 2025

---

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Data Model](#data-model)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [Lessons Learned](#lessons-learned)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## ✨ Features

### Core Features
- ✅ **Create** new tasks with title, description, and status
- 📋 **View** all tasks or filter by status (pending/completed)
- 🔍 **Retrieve** single task by ID
- ✏️ **Update** existing tasks (full or partial updates)
- 🔄 **Toggle** task status between pending and completed
- 🗑️ **Delete** individual tasks

### Advanced Features
- 🔄 **Bulk Toggle by Status** - Toggle all tasks with a specific status at once
- 🔄 **Bulk Toggle All** - Toggle status of all tasks simultaneously
- 🗑️ **Bulk Delete by Status** - Delete all tasks with a specific status
- 🗑️ **Bulk Delete All** - Delete all tasks with confirmation (safety feature)

### Additional Features
- ✔️ Input validation and error handling
- 📝 Clear and consistent API responses
- 🎯 Case-insensitive status handling
- 🛡️ Safety confirmations for destructive operations
- 📊 Detailed response statistics for bulk operations

---

## 🛠️ Technologies Used

- **Node.js** (v14 or higher) - JavaScript runtime
- **Express.js** (v4.x) - Web framework for Node.js
- **Nodemon** (v3.x) - Development tool for auto-restarting server
- **Postman** - API testing and documentation
- **Git & GitHub** - Version control and collaboration

---

## 📁 Project Structure
```
Task Manager API/
├── server.js                                    # Express server setup and configuration
├── controllers/
│   └── task_controllers.js                     # Business logic for all task operations
├── task_routers/
│   └── task_routes.js                          # API route definitions
├── data/
│   └── tasks_db.js                             # In-memory data storage
├── node_modules/                               # Project dependencies
├── package.json                                # Project metadata and dependencies
├── package-lock.json                           # Locked versions of dependencies
├── .gitignore                                  # Git ignore rules
├── README.md                                   # Project documentation (this file)
├── Task_Manager_API.postman_collection.json   # Postman collection for testing
└── Development.postman_environment.json        # Postman environment variables
```

---

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Postman](https://www.postman.com/downloads/) (for testing)
- [Git](https://git-scm.com/) (for version control)

### Setup Steps

1. **Clone the repository:**
```bash
   git clone https://github.com/YOUR_USERNAME/task-manager-api.git
   cd task-manager-api
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Verify installation:**
```bash
   npm list
```
   You should see: `express`, `dotenv`, and `nodemon` listed.

---

## ▶️ Running the Server

### Development Mode (Recommended)
```bash
npm run dev
```
This uses **nodemon** which automatically restarts the server when you make changes.

### Production Mode
```bash
npm start
```

### Expected Output
```
✅ Server running on http://localhost:3000
📝 API available at http://localhost:3000/api/tasks
```

### Verify Server is Running
Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
```json
{
  "message": "Welcome to Task Manager API",
  "version": "1.0.0",
  "endpoints": {
    "tasks": "/api/tasks"
  }
}
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### **Single Task Operations**

#### 1. Get All Tasks
```http
GET /tasks
```

#### 2. Get Single Task by ID
```http
GET /tasks/:id
```

#### 3. Get Tasks by Status
```http
GET /tasks/status/:status
```

#### 4. Create Task
```http
POST /tasks
Content-Type: application/json
```

#### 5. Update Task
```http
PUT /tasks/:id
Content-Type: application/json
```

#### 6. Toggle Task Status
```http
PATCH /tasks/:id/toggle
```

#### 7. Delete Task
```http
DELETE /tasks/:id
```

### **Bulk Operations**

#### 8. Bulk Toggle Tasks by Status
```http
PATCH /tasks/bulk/toggle-status/:status
```

#### 9. Bulk Toggle All Tasks
```http
PATCH /tasks/bulk/toggle-all
```

#### 10. Bulk Delete Tasks by Status
```http
DELETE /tasks/bulk/delete-status/:status
```

#### 11. Bulk Delete All Tasks
```http
DELETE /tasks/bulk/delete-all?confirm=true
```

---

## 🧪 Testing with Postman

### Import the Collection

1. **Open Postman**
2. Click **"Import"** (top left)
3. Click **"Upload Files"**
4. Select `Task_Manager_API.postman_collection.json`
5. Click **"Import"**

### Import the Environment (Optional but Recommended)

1. Go to **"Environments"** tab (left sidebar)
2. Click **"Import"**
3. Select `Development.postman_environment.json`
4. Click **"Import"**
5. Select **"Development"** from the environment dropdown (top right)

### Running Tests

1. **Make sure your server is running:**
```bash
   npm run dev
```

2. **In Postman, open the "Task Manager API" collection**

3. **Test individual endpoints:**
   - Click on a request
   - Click **"Send"**
   - View the response

4. **Run all tests at once:**
   - Click the three dots (...) next to the collection name
   - Select **"Run collection"**
   - Click **"Run Task Manager API"**

### Testing Workflow

**Recommended testing order:**

1. ✅ **Get All Tasks** - View initial tasks
2. ✅ **Create Task** - Add a new task
3. ✅ **Get All Tasks** - Verify new task appears
4. ✅ **Get Single Task** - Retrieve specific task
5. ✅ **Update Task** - Modify the task
6. ✅ **Toggle Task Status** - Change status
7. ✅ **Get Tasks by Status** - Filter tasks
8. ✅ **Bulk Toggle by Status** - Toggle multiple tasks
9. ✅ **Bulk Delete by Status** - Delete completed tasks
10. ✅ **Delete Task** - Remove individual task

---

## 📊 Data Model

### Task Object Structure
```javascript
{
  id: number,          // Auto-generated unique identifier (starts at 1)
  title: string,       // Task title (required, max 100 characters)
  description: string, // Task description (optional, max 500 characters, defaults to "")
  status: string       // Task status: "pending" or "completed" (defaults to "pending")
}
```

### Example Task
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README for the API",
  "status": "pending"
}
```

### Validation Rules

**Title:**
- ✅ Required
- ✅ Must be a non-empty string
- ✅ Maximum 100 characters
- ✅ Whitespace trimmed automatically

**Description:**
- ⭕ Optional
- ✅ Maximum 500 characters
- ✅ Defaults to empty string if not provided
- ✅ Whitespace trimmed automatically

**Status:**
- ⭕ Optional
- ✅ Must be either "pending" or "completed"
- ✅ Case-insensitive ("PENDING", "Pending", "pending" all accepted)
- ✅ Defaults to "pending" if not provided
- ✅ Automatically converted to lowercase

---

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| `200 OK` | Success | Successful GET, PUT, PATCH, DELETE |
| `201 Created` | Resource created | Successful POST (task created) |
| `400 Bad Request` | Invalid input | Validation errors, missing required fields |
| `404 Not Found` | Resource not found | Task ID doesn't exist |
| `500 Internal Server Error` | Server error | Unexpected server-side errors |

### Error Response Format

All errors follow this consistent format:
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

### Common Error Examples

**Missing Required Field (400):**
```json
{
  "success": false,
  "message": "Title is required"
}
```

**Invalid Status Value (400):**
```json
{
  "success": false,
  "message": "Status must be either 'pending' or 'completed'"
}
```

**Task Not Found (404):**
```json
{
  "success": false,
  "message": "Task with ID 999 not found"
}
```

**Bulk Delete Without Confirmation (400):**
```json
{
  "success": false,
  "message": "Bulk delete all requires confirmation. Add ?confirm=true to the URL to proceed.",
  "warning": "This will permanently delete ALL tasks!",
  "tasksCount": 5
}
```

---

## 👨‍💻 Contributing

This is a student capstone project, but contributions and suggestions are welcome!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch:**
```bash
   git checkout -b feature/your-feature-name
```

3. **Make your changes**
4. **Commit with clear messages:**
```bash
   git commit -m "Add feature: description of what you added"
```

5. **Push to your branch:**
```bash
   git push origin feature/your-feature-name
```

6. **Create a Pull Request**

### Coding Standards

- ✅ Use meaningful variable names
- ✅ Add comments for complex logic
- ✅ Follow existing code style
- ✅ Test all changes before committing
- ✅ Update README if adding new features


---

## 🎯 Project Requirements Met

This project successfully fulfills all BeTechified Capstone requirements:

- ✅ Express.js API with CRUD operations
- ✅ Clear and consistent routes
- ✅ GitHub repository with meaningful commits from all members
- ✅ Postman collection for testing all endpoints
- ✅ Clean, readable, and well-commented code
- ✅ 5-slide presentation prepared
- ✅ Live demo capability
- ✅ Comprehensive documentation (this README)

**Bonus features implemented:**
- ✨ Bulk operations (toggle and delete)
- ✨ Status filtering
- ✨ Advanced validation
- ✨ Safety confirmations
- ✨ Detailed response statistics

---

## 📄 License

This project is licensed under the MIT License - see below for details:
```
MIT License

Copyright (c) 2025 [Your Names]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

For questions, issues, or suggestions:

- **GitHub Issues:** [Open an issue](https://github.com10xosborn/task-manager-api/issues)
- **Email:** your.email@example.com
- **Course:** BeTechified Backend Development Class

---

## 🙏 Acknowledgments

- **BeTechified** - For providing the learning opportunity and project guidelines
- **Express.js Team** - For the amazing web framework
- **Node.js Community** - For excellent documentation and resources
- **Our Instructors** - For guidance and support throughout the project

---

## 📈 Project Statistics

- **Total Endpoints:** 11 (7 single operations + 4 bulk operations)
- **Lines of Code:** ~800+
- **Development Time:** 9 days
- **Team Members:** 2
- **Test Coverage:** 100% manual testing via Postman
- **Git Commits:** 20+ meaningful commits

---

**Last Updated:** October 2025

---

## 🎉 Thank You!

Thank you for checking out our Task Manager API! We hope this project demonstrates our understanding of backend development, RESTful API design, and collaborative software development.

**Happy Task Managing! ✅**