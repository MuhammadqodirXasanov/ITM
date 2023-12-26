import React from "react";
import './tasksList.css'

// Tasks list part
const TasksList = ({ tasks, date, newTask }) => {
    // today's tasks
    const [todaysTasks, setTodaysTasks] = React.useState([])
    const [tomorrowTasks, settomorrowTasks] = React.useState([])
    const [thenTasks, setThenTasks] = React.useState([])
    const [endHoursVar, setEndHoursVal] = React.useState([])

    // placed then's dates
    const [thenDates, setThenDates] = React.useState([])

    // unfulfilled tasks
    // const [fulfilled, setFulfilled] = React.useState([])

    // add unfulfilled list
    const handleChange = (e) => { }

    // checking input dates
    const startDate = newTask.substr(0, 10)
    const endDate = newTask.substr(-10)
    const endHours = newTask.substr(-5)

    // validate input dates
    const startDateSetting = (+startDate[0] === 0 || +startDate[0]) && (+startDate[1] === 0 || +startDate[1]) && (+startDate[3] === 0 || +startDate[3]) && (+startDate[4] === 0 || +startDate[4]) && (+startDate[6] === 0 || + startDate[6]) && (+startDate[7] === 0 || + startDate[7]) && (+startDate[8] === 0 || +startDate[8]) && (+startDate[9] === 0 || +startDate[9]);

    const endDateSetting = (+endDate[0] === 0 || +endDate[0]) && (+endDate[1] === 0 || +endDate[1]) && (+endDate[3] === 0 || +endDate[3]) && (+endDate[4] || +endDate[4]) && (+endDate[6] === 0 || +endDate[6]) && (+endDate[7] === 0 || +endDate[7]) && (+endDate[8] === 0 || +endDate[8]) && (+endDate[9] === 0 || +endDate[9])

    const endHoursSetting = (+endHours[0] === 0 || +endHours[0]) && (+endHours[1] === 0 || +endHours[1]) && (+endHours[3] === 0 || +endHours[3]) && (+endHours[4] === 0 || +endHours[4])

    // push input dates to array
    React.useEffect(() => {
        if (startDateSetting) {
            thenDates.push(startDate)
        }
        if (endDateSetting) {
            thenDates.push(endDate)
        }
        if (endHoursSetting) {
            endHoursVar.push(endHours)
        }
    }, [startDate, endDate, endHours])

    // checking where put the tasks
    React.useEffect(() => {
        if (newTask.substr(0, 5) === 'bugun' || newTask.substr(- 5) === 'bugun') {
            todaysTasks.push({ task: newTask.replace('bugun', '') })
        }
        else if (endDateSetting) {
            todaysTasks.push({ tasks: newTask.replace(endHours, '') })
        }
        else if (newTask.substr(0, 6) === 'ertaga' || newTask.substr(- 6) === 'ertaga') {
            tomorrowTasks.push({ task: newTask.replace('ertaga', '') })
        }
        else if (endHoursSetting) {
            tomorrowTasks.push({ task: newTask.replace(endHours, '') })
        }
        else if (startDateSetting) {
            thenTasks.push({ task: newTask.replace(startDate, '') })
        }
        else if (endDateSetting) {
            thenTasks.push({ task: newTask.replace(endDate, '') })
        }
        else {
            todaysTasks.push({ task: newTask.replace('bugun', '') })
        }
    }, [newTask])

    return (
        <div className="tasks-list__box">
            {/* today part */}
            {
                todaysTasks.length ? <div>
                    <h2 className="time-heading">Bugun</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {todaysTasks?.map(({ task, id }, ind) => (
                            <li className="tasks-list__item" key={id}>
                                <div className="tasks-list__flex">
                                    <input className="checkbox" type="checkbox" onChange={handleChange} value={task} id={id} />
                                    <p>{task}</p>
                                </div>
                                <p>{endHoursVar[ind] || +date().hour + 1 + ':00'}</p>
                            </li>
                        ))}
                    </ul>
                </div> : null
            }

            {/* tomorrow part */}
            {
                tomorrowTasks.length ? <div>
                    <h2 className="time-heading">Ertaga</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {tomorrowTasks?.map(({ id, task }, ind) => (
                            <li className="tasks-list__item" key={id}>
                                <div className="tasks-list__flex">
                                    <input className="checkbox" type="checkbox" onChange={(e) => handleChange(e)} value={task} id={id} />
                                    <p>{task}</p>
                                </div>
                                <p>{endHoursVar.length ? endHoursVar[ind] : +date().hour + 1 + ':00'}</p>
                            </li>
                        ))}
                    </ul>
                </div> : null
            }

            {/* then part */}
            {
                thenTasks.length ? <div>
                    <h2 className="time-heading">Keyin</h2>
                    {/* render list items */}
                    <ul className="tasks-list__list">
                        {/* loop tasks' array */}
                        {thenTasks?.map(({ id, task }, ind) => (
                            <li className="tasks-list__item" key={id}>
                                <div className="tasks-list__flex">
                                    <input className="checkbox" type="checkbox" onChange={(e) => handleChange(e)} value={task} id={id} />
                                    <p>{task}</p>
                                </div>
                                <p>{thenDates[ind]}, {+date().hour + 1}:00</p>
                            </li>
                        ))}
                    </ul>
                </div> : null
            }
        </div>
    );
};

export default TasksList;
