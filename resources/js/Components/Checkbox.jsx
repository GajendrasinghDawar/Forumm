export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-2 border-sand-sand5 text-sand-sand11  focus:ring-sand-sand12 ' +
                className
            }
        />
    );
}
