import React from "react";
import { nanoid } from "nanoid";
import { useForm } from 'react-hook-form';
import TasksList from "../tasksList/tasksList";
import './taskManager.css';

// Tasks manager part
const TaskManager = () => {
    // form validation setting
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [newTask, setNewTask] = React.useState('')

    // All tasks array
    const [tasks, setTasks] = React.useState([]);

    // setting current date
    function setDate() {
        const now = new Date();

        // get times
        const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        const month = now.getMonth() + 1 < 10 ? '0' + now.getMonth() : now.getMonth();
        const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        const year = now.getFullYear();

        return {
            now, hour, minute, month, day, year
        };
    };

    // work with form input
    const submitForm = ({ newTask }) => {
        // put old values of array and add new one with unique id
        setTasks(prev => [...prev, { task: newTask.trim(), id: nanoid() }]);

        // get input value
        setNewTask(newTask.trim())

        // reset input
        reset();
    };

    return (
        <div className="tasks-box">
            <h1 className="tasks__title">Vazifalar Menedjeri</h1>
            <form className="tasks__form" onSubmit={handleSubmit(submitForm)}>
                <div className="form-box">
                    <input className={`form-input ${errors.newTask ? 'err-inp' : ''}`} {...register('newTask', { required: true })} type="text" placeholder="Yangi vazifa qo'shish" />
                    <button className="form-btn" type="submit">+</button>
                </div>
                {errors.newTask ? <span className="err-msg">Matn kiritilishi shart</span> : null}
                <span className="current-date">Bugun: {setDate().day}.{setDate().month}.{setDate().year}, {setDate().hour}:{setDate().minute}</span>
            </form>
            {tasks.length ? <TasksList newTask={newTask} tasks={tasks} date={setDate} /> : <h4 className="task__empty">Hozircha bo'sh</h4>}
        </div>
    );
};

export default TaskManager;
