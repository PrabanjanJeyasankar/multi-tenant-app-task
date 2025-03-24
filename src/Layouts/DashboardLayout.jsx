import { useSelector } from 'react-redux'
import SideNavBarComponent from '../components/NavigationComponents/SideNavBarComponent'
import TopNavBarComponent from '../components/NavigationComponents/TopNavBarComponent'

const DashboardLayout = ({ children }) => {
    const { config } = useSelector((state) => state.tenant)
    const LayoutComponent =
        config?.layout === 'side-nav' ? SideNavBarComponent : TopNavBarComponent

    return (
        <LayoutComponent>
            <div className='flex-grow p-6'>{children}</div>
        </LayoutComponent>
    )
}

export default DashboardLayout
