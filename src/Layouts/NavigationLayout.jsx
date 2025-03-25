import { useEffect } from 'react'
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

    useEffect(() => {
        if (config) {
            let subdomain = window.location.hostname.split('.')[0]

            if (window.location.hostname.includes('localhost')) {
                const urlParams = new URLSearchParams(window.location.search)
                subdomain = urlParams.get('tenant') || 'tenant1'
            }

            document.title = subdomain === 'tenant1' ? 'Tenant 1' : 'Tenant 2'
        }
    }, [config])

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
