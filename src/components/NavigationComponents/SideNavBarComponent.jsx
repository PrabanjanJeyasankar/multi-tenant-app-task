import { Home, Info, LogOut, Phone } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../app/feature/authentication/authenticationSlice'

const SideNavBarComponent = () => {
    const { config } = useSelector((state) => state.tenant)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
    }

    return (
        <nav className='h-screen w-52 bg-white flex flex-col p-4 font-Inter'>
            <div className='flex items-center p-4 mb-6'>
                <img
                    src={config?.logo}
                    alt={config?.name}
                    className='h-6 w-6 mr-2'
                />
                <span className='text-lg font-bold text-gray-800'>
                    {config?.name}
                </span>
            </div>

            <ul className='flex flex-col space-y-3 flex-grow'>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            `flex px-4 py-2 text-gray-700 hover:bg-gray-200 rounded items-center transition-colors duration-300 ${
                                isActive ? 'bg-gray-100' : ''
                            }`
                        }>
                        <Home className='mr-2 text-gray-500' size={18} />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            `flex px-4 py-2 text-gray-700 hover:bg-gray-200 rounded items-center transition-colors duration-300 ${
                                isActive ? 'bg-gray-100' : ''
                            }`
                        }>
                        <Info className='mr-2 text-gray-500' size={18} />
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/contact'
                        className={({ isActive }) =>
                            `flex px-4 py-2 text-gray-700 hover:bg-gray-200 rounded items-center transition-colors duration-300 ${
                                isActive ? 'bg-gray-100' : ''
                            }`
                        }>
                        <Phone className='mr-2 text-gray-500' size={18} />
                        Contact
                    </NavLink>
                </li>
            </ul>

            <button
                onClick={handleLogout}
                className='flex items-center text-red-600 hover:text-red-800 transition-colors px-4 py-2'>
                <LogOut className='mr-2' size={20} />
                Logout
            </button>
        </nav>
    )
}

export default SideNavBarComponent
