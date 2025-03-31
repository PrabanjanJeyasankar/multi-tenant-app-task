import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../app/feature/authentication/authenticationSlice'

const TopNavBarComponent = () => {
    const { config } = useSelector((state) => state.tenant)
    const role = useSelector((state) => state.auth.role)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
    }

    return (
        <nav className='bg-white w-full ' id='topNavigationBar'>
            <div className='container mx-auto py-6 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <img
                        src={config?.logo}
                        alt={config?.name}
                        className='h-5 w-5'
                    />
                    <span className='text-lg font-bold text-gray-800'>
                        {config?.name}
                    </span>
                </div>

                <div className='flex space-x-6'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600' : 'text-gray-700'
                        }>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600' : 'text-gray-700'
                        }>
                        About
                    </NavLink>
                    <NavLink
                        to='/contact'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600' : 'text-gray-700'
                        }>
                        Contact
                    </NavLink>
                    {role === 'admin' && (
                        <NavLink
                            to='/admin'
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-gray-700'
                            }>
                            Admin Panel
                        </NavLink>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className='flex items-center text-red-600 hover:text-red-800 transition-colors'>
                    <LogOut className='mr-2' size={20} />
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default TopNavBarComponent
