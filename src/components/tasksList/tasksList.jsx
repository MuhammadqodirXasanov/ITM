import React from "react";
import "./tasksList.css";
import {
    addTaskThen,
    addTaskToday,
    addTaskTomorrow,
    updateTaskToday,
    updateTaskThen,
    updateTaskTomorrow,
    completed,
    unCompleted,
} from "../../redux/slices/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

// Tasks list part
const TasksList = ({ date, newTask }) => {
    // get redux values
    const { todaysTasks, tomorrowTasks, thenTasks, completed, unCompleted } =
        useSelector((state) => state.todos);

    // to get access to redux store to give value
    const dispatch = useDispatch();

    // get input dates
    const startDate = newTask.substr(0, 10);
    const endDate = newTask.substr(-10);
    const endHours = newTask.slice(-5);
    const thenEndDate = newTask.slice(-16, -6);

    // validate input dates and times
    const startDateSetting =
        (+startDate[0] === 0 || +startDate[0]) &&
        (+startDate[1] === 0 || +startDate[1]) &&
        (+startDate[3] === 0 || +startDate[3]) &&
        (+startDate[4] === 0 || +startDate[4]) &&
        (+startDate[6] === 0 || +startDate[6]) &&
        (+startDate[7] === 0 || +startDate[7]) &&
        (+startDate[8] === 0 || +startDate[8]) &&
        (+startDate[9] === 0 || +startDate[9]);

    const endDateSetting =
        (+endDate[0] === 0 || +endDate[0]) &&
        (+endDate[1] === 0 || +endDate[1]) &&
        (+endDate[3] === 0 || +endDate[3]) &&
        (+endDate[4] === 0 || +endDate[4]) &&
        (+endDate[6] === 0 || +endDate[6]) &&
        (+endDate[7] === 0 || +endDate[7]) &&
        (+endDate[8] === 0 || +endDate[8]) &&
        (+endDate[9] === 0 || +endDate[9]);

    const thenEndDateSettings =
        (+thenEndDate[0] === 0 || +thenEndDate[0]) &&
        (+thenEndDate[1] === 0 || +thenEndDate[1]) &&
        (+thenEndDate[3] === 0 || +thenEndDate[3]) &&
        (+thenEndDate[4] === 0 || +thenEndDate[4]) &&
        (+thenEndDate[6] === 0 || +thenEndDate[6]) &&
        (+thenEndDate[7] === 0 || +thenEndDate[7]) &&
        (+thenEndDate[8] === 0 || +thenEndDate[8]) &&
        (+thenEndDate[9] === 0 || +thenEndDate[9]);

    const endHoursSetting =
        (+endHours[0] === 0 || +endHours[0]) &&
        (+endHours[1] === 0 || +endHours[1]) &&
        (+endHours[3] === 0 || +endHours[3]) &&
        (+endHours[4] === 0 || +endHours[4]);

    // checking where put the tasks
    React.useEffect(() => {
        // tomorrow
        if (
            endHoursSetting &&
            newTask.substr(0, 6).toLowerCase() === "ertaga"
        ) {
            dispatch(
                addTaskTomorrow({
                    task: newTask.slice(6, -5),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                })
            );
        } else if (
            endHoursSetting &&
            newTask.slice(-12, -6).toLowerCase() === "ertaga"
        ) {
            dispatch(
                addTaskTomorrow({
                    task: newTask.split(" ").slice(0, -2).join(" "),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                })
            );
        } else if (
            newTask.substr(0, 6).toLowerCase() === "ertaga" ||
            newTask.substr(-6).toLowerCase() === "ertaga"
        ) {
            dispatch(
                addTaskTomorrow({
                    task: newTask.toLowerCase().replace("ertaga", ""),
                    id: nanoid(),
                    completed: false,
                    time: +date().hour + 1 + ":00",
                })
            );
        }

        // then
        else if (startDateSetting && endHoursSetting) {
            dispatch(
                addTaskThen({
                    task: newTask.slice(10, -6),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                    date: newTask.slice(0, 10),
                })
            );
        } else if (thenEndDateSettings && endHoursSetting) {
            dispatch(
                addTaskThen({
                    task: newTask.split(" ").slice(0, -2).join(" "),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                    date: newTask.slice(-16, -6),
                })
            );
        } else if (startDateSetting) {
            dispatch(
                addTaskThen({
                    task: newTask.replace(startDate, ""),
                    id: nanoid(),
                    completed: false,
                    time: +date().hour + 1 + ":00",
                    date: newTask.slice(0, 10),
                })
            );
        } else if (endDateSetting) {
            dispatch(
                addTaskThen({
                    task: newTask.replace(endDate, ""),
                    id: nanoid(),
                    completed: false,
                    time: +date().hour + 1 + ":00",
                    date: newTask.slice(-10),
                })
            );
        }

        // today
        else if (
            endHoursSetting &&
            newTask.substr(0, 5).toLowerCase() === "bugun"
        ) {
            dispatch(
                addTaskToday({
                    task: newTask.slice(5, -5),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                })
            );
        } else if (
            endHoursSetting &&
            newTask.slice(-11, -6).toLowerCase() === "bugun"
        ) {
            dispatch(
                addTaskToday({
                    task: newTask.split(" ").slice(0, -2).join(" "),
                    id: nanoid(),
                    completed: false,
                    time: newTask.slice(-5),
                })
            );
        } else {
            dispatch(
                addTaskToday({
                    task: newTask.toLowerCase().replace("bugun", ""),
                    id: nanoid(),
                    completed: false,
                    time: +date().hour + 1 + ":00",
                })
            );
        }
    }, [newTask]);

    return (
        <div className="tasks-list__box">
            {/* today part */}
            {todaysTasks.length ? (
                <div>
                    <h2 className="time-heading">Bugun</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {todaysTasks?.map(({ task, id, time, completed }) => (
                            <li
                                className={`tasks-list__item ${
                                    completed && "l-through"
                                }`}
                                key={id}
                            >
                                <div className="tasks-list__flex">
                                    <input
                                        onClick={() =>
                                            dispatch(updateTaskToday(id))
                                        }
                                        className="checkbox"
                                        type="checkbox"
                                    />
                                    <p>{task}</p>
                                </div>
                                <p>{time}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {/* tomorrow part */}
            {tomorrowTasks.length ? (
                <div>
                    <h2 className="time-heading">Ertaga</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {tomorrowTasks?.map(({ task, id, time, completed }) => (
                            <li
                                className={`tasks-list__item ${
                                    completed && "l-through"
                                }`}
                                key={id}
                            >
                                <div className="tasks-list__flex">
                                    <input
                                        onClick={() =>
                                            dispatch(updateTaskTomorrow(id))
                                        }
                                        className="checkbox"
                                        type="checkbox"
                                    />
                                    <p>{task}</p>
                                </div>
                                <p>{time}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {/* then part */}
            {thenTasks.length ? (
                <div>
                    <h2 className="time-heading">Keyin</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {thenTasks?.map(
                            ({ task, id, time, date, completed }) => (
                                <li
                                    className={`tasks-list__item ${
                                        completed && "l-through"
                                    }`}
                                    key={id}
                                >
                                    <div className="tasks-list__flex">
                                        <input
                                            onClick={() =>
                                                dispatch(updateTaskThen(id))
                                            }
                                            className="checkbox"
                                            type="checkbox"
                                        />
                                        <p>{task}</p>
                                    </div>
                                    <p>
                                        {date}, {time}
                                    </p>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ) : null}

            <div className="completed-box">
                <p className="completed-text">Bajarilganlar: {completed}</p>
                <p className="completed-text">Bajarilmaganlar: {unCompleted}</p>
            </div>
        </div>
    );
};

export default TasksList;
