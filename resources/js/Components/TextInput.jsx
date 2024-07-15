import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "text-sand-sand11 focus:border-jade-jade2 focus:ring-amber-amber8 rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
