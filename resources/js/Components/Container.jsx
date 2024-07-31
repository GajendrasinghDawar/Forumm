export default function Container({ className, children }) {
    return (
        <div className={ `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-auto  flex justify-center w-full min-h-full ${className}` }>{ children }</div>
    );
}
