let tasks = [
    {
        id: 1,
        title: "Buy groceries",
        description: "Milk, Bread, Eggs, Butter",
        status: "pending"
    },
    {
        id: 2,
        title: "Complete project report",
        description: "Finish the final report for the XYZ project",
        status: "completed"
    },
    {
        id: 3,
        title: "Workout",
        description: "Go for a 30-minute run",
        status: "pending"
    },
    {
        id: 4,
        title: "Read a book",
        description: "Read 'The Great Gatsby'",
        status: "completed"
    }
];


let nextId = 5; //Initial next ID value for new tasks

module.exports = { tasks, nextId };