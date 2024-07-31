
export default function SelectMenu({ options, onChange, value, className = '', ...props }) {

    return (

        <select
            onChange={ onChange }
            value={ value }
            className={
                "border w-full border-sand-sand6 mt-1 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-lg" +
                className
            }
            { ...props }
        >
            <option disabled value="" className="text-gray-gray11 bg-gray-gray3">
                Select a channel
            </option>

            { options.map((option, index) => (
                <option key={ index } value={ option.id } className="text-gray-gray11 bg-gray-gray3">
                    { option.name }
                </option>
            )) }
        </select>
    )
}