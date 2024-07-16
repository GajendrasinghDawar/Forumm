
export default function SelectMenu({ options, onChange, defaultValue, className = '' }) {

    return (
        <select
            onChange={ onChange }
            defaultValue={ defaultValue }
            className={
                "border w-full border-sand-sand6 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-md mt-1" +
                className
            }
        >
            { options.map((option, index) => (
                <option key={ index } value={ option.id }>
                    { option.name }
                </option>
            )) }
        </select>
    )
}