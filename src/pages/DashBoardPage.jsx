import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectIsAuthenticated,
    selectRole,
} from '../app/feature/authentication/authenticationSelectors'

function DashBoardPage() {
    const role = useSelector(selectRole)
    const isAuthenticated = useSelector(selectIsAuthenticated)

    return (
        <div className='flex flex-col items-center justify-center min-h-[60vh]  space-y-4'>
            <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

            {isAuthenticated && role === 'admin' ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='bg-white shadow-md p-6 rounded-lg border-t-4 border-primary'>
                        <h3 className='text-xl font-semibold text-primary'>
                            Card 1: Admin Access
                        </h3>
                        <p className='text-gray-600'>
                            Admin content goes here...
                        </p>
                        <button className='mt-4 px-4 py-2 bg-primary text-white rounded-lg'>
                            View More
                        </button>
                    </div>

                    <div className='bg-white shadow-md p-6 rounded-lg border-t-4 border-secondary'>
                        <h3 className='text-xl font-semibold text-secondary'>
                            Card 2: Admin Access
                        </h3>
                        <p className='text-gray-600'>
                            More admin-specific content...
                        </p>
                        <button className='mt-4 px-4 py-2 bg-secondary text-white rounded-lg'>
                            Manage
                        </button>
                    </div>
                </div>
            ) : (
                <div className='bg-white shadow-md p-6 rounded-lg border-t-4 border-secondary'>
                    <h3 className='text-xl font-semibold text-secondary'>
                        User Card
                    </h3>
                    <p className='text-gray-600'>User-specific content...</p>
                    <button className='mt-4 px-4 py-2 bg-secondary text-white rounded-lg'>
                        View Details
                    </button>
                </div>
            )}
        </div>
    )
}

export default DashBoardPage
