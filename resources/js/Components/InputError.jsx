export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p { ...props } className={ 'text-sm text-tomato-tomato11 ' + className }>
            {message}
        </p>
    ) : null;
}
