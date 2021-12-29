const SimpleTextInput = (props) => {
    return (
        <input
            type="text"
            name={props.name}
            id={props.id}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export default SimpleTextInput;
