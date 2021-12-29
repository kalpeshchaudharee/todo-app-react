const SimpleButton = (props) => {
    return (
        <button
            className={`px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 ${props.className}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default SimpleButton;
