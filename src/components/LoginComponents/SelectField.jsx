function SelectField({ value, onChange }) {
    return (
        <div className='mb-6 relative'>
            <select
                id='role'
                name='role'
                className='appearance-none rounded-md block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10'
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
            </select>

            <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 text-gray-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                        fillRule='evenodd'
                        d='M5.23 7.21a.75.75 0 011.06-.02L10 10.5l3.71-3.31a.75.75 0 011.02 1.1l-4.22 3.75a.75.75 0 01-1.02 0L5.23 8.29a.75.75 0 01-.02-1.06z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
        </div>
    )
}

export default SelectField
