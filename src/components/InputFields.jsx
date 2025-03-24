function InputField({ onChange, ...props }) {
    return (
        <div className='mb-4'>
            <input
                {...props}
                required
                className='appearance-none rounded-md block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputField
