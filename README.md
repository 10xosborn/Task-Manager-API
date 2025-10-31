# Task Manager API

A REST API for managing tasks built with Express.js. Create, read, update, delete, and toggle tasks with support for bulk operations.

## 👥 Team Members
- **Person 1** - Osborn Tulasi - @10xosborn
- **Person 2** - Abioala John Akinyele - @AbiolaJohnAkinyele
- **Person 3** - Lolya Pepple - @Lolya002
- **Person 4** - Edward Anyor - @EdwardAnyor

**Course:** BeTechified Backend Development - Capstone Project  
**Submission:** October 30, 2025 | **Presentation:** November 1, 2025

---

## ✨ Features

- ✅ Create, read, update, and delete tasks
- 🔄 Toggle task status (pending ↔ completed)
- 📊 Filter tasks by status
- 🔄 Bulk toggle operations (by status or all tasks)
- 🗑️ Bulk delete operations (by status or all tasks)
- ✔️ Input validation and error handling

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/10xosborn/Task-Manager-API.git
cd Task-Manager-API

# Install dependencies
npm install

# Start the server
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all tasks |
| GET | `/:id` | Get single task by ID |
| GET | `/status/:status` | Get tasks by status (pending/completed) |
| POST | `/` | Create new task |
| PUT | `/:id` | Update task |
| PATCH | `/:id/toggle` | Toggle task status |
| DELETE | `/:id` | Delete task |
| PATCH | `/bulk/toggle-status/:status` | Toggle all tasks with specific status |
| PATCH | `/bulk/toggle-all` | Toggle all tasks |
| DELETE | `/bulk/delete-status/:status` | Delete all tasks with specific status |
| DELETE | `/bulk/delete-all?confirm=true` | Delete all tasks (requires confirmation) |

---

## 📝 Request Examples

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the API documentation",
  "status": "pending"
}
```

**Required:** `title`  
**Optional:** `description`, `status` (defaults to "pending")

### Update Task
```http
PUT /api/tasks/1
Content-Type: application/json

{
  "status": "completed"
}
```

### Bulk Delete (with confirmation)
```http
DELETE /api/tasks/bulk/delete-all?confirm=true
```

---

## 📊 Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the API documentation",
    "status": "pending"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Task with ID 999 not found"
}
```

---

## 🧪 Testing with Postman

1. **Import Collection:**
   - Open Postman
   - Click **Import** → Select `Task_Manager_API.postman_collection.json`

2. **Import Environment (Optional):**
   - Go to Environments → Import → Select `Development.postman_environment.json`
   - Select "Development" from dropdown (top right)

3. **Start Testing:**
   - Make sure server is running: `npm run dev`
   - Click any request and hit **Send**

---

## 📁 Project Structure
```
Task Manager API/
├── server.js                     # Express server setup
├── controllers/
│   └── task_controllers.js      # Business logic
├── task_routers/
│   └── task_routes.js           # Route definitions
├── data/
│   └── tasks_db.js              # In-memory data storage
├── Task_Manager_API.postman_collection.json
├── Development.postman_environment.json
└── README.md
```

---

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemon** - Development tool
- **Postman** - API testing

---

## ⚠️ Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PUT, PATCH, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation errors) |
| 404 | Not Found (resource doesn't exist) |

---

## 📚 Data Model
```javascript
{
  id: number,          // Auto-generated
  title: string,       // Required, max 100 chars
  description: string, // Optional, max 500 chars
  status: string      // "pending" or "completed" (default: "pending")
}
```

---

## 🎯 Project Requirements

- ✅ Express.js API with CRUD operations
- ✅ GitHub repository with meaningful commits
- ✅ Postman collection for testing
- ✅ Clean, well-commented code
- ✅ Live demo ready

---

## 🚀 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Task priorities and due dates
- Search and pagination
- Deployment to cloud platform

---

## 📄 License

MIT License - Copyright (c) 2025 [Your Names]

---

## 📞 Contact

- **GitHub:** [10xosborn](https://github.com/10xosborn)
- **Course:** BeTechified Backend Development

---

**Built with ❤️ by [Your Name] and [Partner's Name]**
