import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleSort = (sortType) => {
        const sortedTasks = [...tasks];
        if (sortType === 'alphabetical') {
            sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
        } else if (sortType === 'completed') {
            sortedTasks.sort((a, b) => a.completed - b.completed);
        }
        setTasks(sortedTasks);
    };

    const filteredTasks = tasks.filter(task =>
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
    );

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                <label>Filter: </label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="active">Active</option>
                </select>
            </div>
            <div>
                <label>Sort by: </label>
                <button onClick={() => handleSort('alphabetical')}>Alphabetical</button>
                <button onClick={() => handleSort('completed')}>Completion Status</button>
            </div>
            <ul>
                {filteredTasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                        <button onClick={() => toggleCompletion(index)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
