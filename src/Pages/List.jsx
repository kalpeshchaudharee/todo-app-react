import { useRef, useState } from "react";
import SimpleButton from "../Components/SimpleButton";
import SimpleTextInput from "../Components/SimpleTextInput";
import SimpleModel from "../Components/SimpleModel";
import SimpleTable from "../Components/SimpleTable";
import SimpleHeading from "../Components/SimpleHeading";
import SimpleBulkAction from "../Components/SimpleBulkAction";

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
            <SimpleHeading title="Todo List" />
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

            <SimpleBulkAction data={selectedTasks} action={bulkDelete} actionText="Delete all selected" />

            <SimpleTable
                taskList={taskList}
                selectAll={selectAll}
                filteredTaskList={filteredTaskList}
                editTask={editTask}
                deleteTask={deleteTask}
                selectTask={selectTask}
            />

            {/* Add New Task Model */}
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

            {/* Edit Task Model */}
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
