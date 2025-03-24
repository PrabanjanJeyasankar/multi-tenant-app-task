import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import {
    selectTenantConfig,
    selectTenantError,
    selectTenantLoading,
} from '../app/feature/tenant/tenantSelectors'
import SideNavBarComponent from '../components/NavigationComponents/SideNavBarComponent'
import TopNavBarComponent from '../components/NavigationComponents/TopNavBarComponent'

const NavigationLayout = () => {
    const config = useSelector(selectTenantConfig)
    const loading = useSelector(selectTenantLoading)
    const error = useSelector(selectTenantError)

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex h-screen items-center justify-center text-red-600'>
                Error: {error}
            </div>
        )
    }

    const isSideNav = config?.layout === 'side-nav'
    const LayoutComponent = isSideNav ? SideNavBarComponent : TopNavBarComponent

    return (
        <div className={`h-screen flex ${isSideNav ? 'flex-row' : 'flex-col'}`}>
            <LayoutComponent />
            <div className='flex-grow p-6 overflow-auto bg-gray-100'>
                <Outlet />
            </div>
        </div>
    )
}

export default NavigationLayout
