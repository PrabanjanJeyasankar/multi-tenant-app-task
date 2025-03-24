function InputField({ icon, error, onChange, ...props }) {
    return (
        <div className='mb-6 relative'>
            {icon && (
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    {icon}
                </span>
            )}
            <input
                {...props}
                className={`appearance-none rounded-md block w-full pl-10 py-3 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && (
                <p className='absolute text-red-500 text-[14px] mt-1'>
                    {error}
                </p>
            )}
        </div>
    )
}

export default InputField
