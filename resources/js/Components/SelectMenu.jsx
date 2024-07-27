
export default function SelectMenu({ options, onChange, value, className = '', ...props }) {

    return (

        <select
            onChange={ onChange }
            value={ value }
            className={
                "border w-full border-sand-sand6 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-md mt-1" +
                className
            }
            { ...props }
        >
            <option disabled value="">
                Select an option
            </option>

            { options.map((option, index) => (
                <option key={ index } value={ option.id }>
                    { option.name }
                </option>
            )) }
        </select>
    )
}