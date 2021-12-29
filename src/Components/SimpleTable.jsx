import SimpleButton from './SimpleButton';
import SimpleCheckbox from './SimpleCheckbox';

const SimpleTable = (props) => {
    return (
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                                >
                                    <div className="flex items-center">
                                        {props.taskList.length ?
                                            <SimpleCheckbox
                                                name="select_all"
                                                id="select_all"
                                                onChange={props.selectAll}
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
                            {props.filteredTaskList.length ? props.filteredTaskList.map((task) => (
                                <tr key={task.id}>
                                    <td className="px-6 py-4 whitespace-nowrap w-24">
                                        <div className="flex items-center">
                                            <SimpleCheckbox
                                                name="select_task"
                                                id="select_task"
                                                value={task.selected}
                                                onChange={(e) => props.selectTask(e, task)}
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
                                            onClick={(e) => props.editTask(e, task)}
                                        />

                                        <SimpleButton
                                            text="Delete"
                                            className="text-red-600 border-red-200 hover:bg-red-600 focus:ring-red-600"
                                            onClick={(e) => props.deleteTask(e, task)}
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
    );
}

export default SimpleTable;
