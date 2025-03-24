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

    console.log('Config:', config)

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

    const LayoutComponent =
        config?.layout === 'side-nav' ? SideNavBarComponent : TopNavBarComponent

    return (
        <div className='h-screen flex flex-col'>
            <LayoutComponent />
            <div className='flex-grow p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default NavigationLayout
