import { useRef, useState } from "react";
import SimpleButton from "../Components/SimpleButton";
import SimpleTextInput from "../Components/SimpleTextInput";
import SimpleCheckbox from "../Components/SimpleCheckbox";
import SimpleModel from "../Components/SimpleModel";
// import SimpleTable from "../Components/SimpleTable";

export default function List() {
    const [taskList, setTaskList] = useState([]);

    const [filteredTaskList, setFilteredTaskList] = useState([]);

    const [search, setSearch] = useState("");

    const [task, setTask] = useState("");

    const [currentTask, setCurrentTask] = useState({});

    const [open, setOpen] = useState(false);

    const [openTask, setOpenTask] = useState(false);

    const cancelButtonRef = useRef(null);

    var selectedTasks = filteredTaskList.filter(t => t.selected === true);
    // const titles = ['', 'Task', 'Action'];

    const filterData = (e) => {
        setSearch(e.target.value);

        let filtredTasks = taskList.filter(t => {
            if (t.title.includes(e.target.value)) {
                return true;
            }
            return false;
        });

        setFilteredTaskList(filtredTasks);
    }

    const selectAll = (e) => {
        const filteredTaskListData = filteredTaskList.map((task) => ({
            ...task,
            selected: e.target.checked,
        }));

        const taskListData = taskList.map((task) => ({
            ...task,
            selected: e.target.checked,
        }));

        setFilteredTaskList(filteredTaskListData);
        setTaskList(taskListData);
    }

    const bulkDelete = (e) => {
        let newFiltedTaskList = filteredTaskList.filter(t => t.selected !== true);
        let newTaskList = taskList.filter(t => t.selected !== true);
        setFilteredTaskList(newFiltedTaskList);
        setTaskList(newTaskList);
    }

    const selectTask = (e, task) => {
        let filteredTasks = filteredTaskList.map((t) => {
            if (t.id === task.id) {
                t.selected = e.target.checked;
            }
            return t;
        });

        setFilteredTaskList(filteredTasks);


        let tasks = filteredTaskList.map((t) => {
            if (t.id === task.id) {
                t.selected = e.target.checked;
            }
            return t;
        });

        setTaskList(tasks);
    }

    const editTask = (e, task) => {
        setCurrentTask(task);
        setOpenTask(true);
    }

    const deleteTask = (e, task) => {
        let tasks = taskList.filter(t => t.id !== task.id);
        let filteredTasks = filteredTaskList.filter(t => t.id !== task.id);
        setTaskList(tasks);
        setFilteredTaskList(filteredTasks);
    }

    const saveTask = (e) => {
        let newTask = {
            id: taskList.length + 1,
            title: task,
            selected: false
        }
        setTaskList([...taskList, newTask]);
        setFilteredTaskList([...filteredTaskList, newTask]);
        setOpen(false);
        setTask("");
    }

    const updateTask = (e) => {
        let tasks = taskList;
        let index = tasks.findIndex((t) => t.id === currentTask.id);
        tasks[index] = currentTask;
        setTaskList(tasks);
        setFilteredTaskList(tasks);
        setOpenTask(false);
    }

    return (
        <div className="flex flex-col m-10">
            <div className="grid justify-items-center mb-10">
                <h1 className="text-4xl">Todo List</h1>
            </div>
            <div className="grid grid-cols-6 gap-4">
                <div className="col-start-1 col-end-3">
                    <SimpleButton
                        text="+ New Task"
                        className="text-indigo-600 border-indigo-200 hover:bg-indigo-600 focus:ring-indigo-600"
                        onClick={() => setOpen(true)}
                    />
                </div>
                <div className="col-end-7 col-span-2">
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <SimpleTextInput
                                name="search"
                                id="search"
                                placeholder="Quick search..."
                                value={search}
                                onChange={filterData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 h-5 text-center">
                {
                    selectedTasks.length ?
                        <span className="cursor-pointer text-red-500 hover:text-red-900" onClick={bulkDelete}>Delete all selected</span>
                        : ''
                }
            </div>
            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        {/* <SimpleTable titles={titles} rows={taskList} key="id"/> */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                                    >
                                        <div className="flex items-center">
                                            {taskList.length ?
                                                <SimpleCheckbox
                                                    name="select_all"
                                                    id="select_all"
                                                    onChange={selectAll}
                                                />
                                                : ''
                                            }
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider w-80"
                                    >
                                        Task
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTaskList.length ? filteredTaskList.map((task) => (
                                    <tr key={task.id}>
                                        <td className="px-6 py-4 whitespace-nowrap w-24">
                                            <div className="flex items-center">
                                                <SimpleCheckbox
                                                    name="select_task"
                                                    id="select_task"
                                                    value={task.selected}
                                                    onChange={(e) => selectTask(e, task)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap w-80">
                                            <div className="text-sm text-gray-900">{task.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-around">
                                            <SimpleButton
                                                text="Edit"
                                                className="text-indigo-600 border-indigo-200 hover:bg-indigo-600 focus:ring-indigo-600"
                                                onClick={(e) => editTask(e, task)}
                                            />

                                            <SimpleButton
                                                text="Delete"
                                                className="text-red-600 border-red-200 hover:bg-red-600 focus:ring-red-600"
                                                onClick={(e) => deleteTask(e, task)}
                                            />
                                        </td>
                                    </tr>
                                ))
                                    :
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-900">Tasks not available in your bucket...</div>
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <SimpleModel
                show={open}
                initialFocus={cancelButtonRef}
                onClose={setOpen}
                title="Add Task"
                inputName="task"
                inputId="task"
                inputPlaceHolder="New task goes here..."
                inputValue={task}
                onInputValueChange={(e) => setTask(e.target.value)}
                onSaveClick={saveTask}
                onCancelClick={() => setOpen(false)}
                cancelButtonRef={cancelButtonRef}
            />

            <SimpleModel
                show={openTask}
                initialFocus={cancelButtonRef}
                onClose={setOpenTask}
                title="Edit Task"
                inputName="open_task"
                inputId="open_task"
                inputPlaceHolder="Task name goes here..."
                inputValue={currentTask.title}
                onInputValueChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                onSaveClick={updateTask}
                onCancelClick={() => setOpenTask(false)}
                cancelButtonRef={cancelButtonRef}
            />
        </div>
    );
}
