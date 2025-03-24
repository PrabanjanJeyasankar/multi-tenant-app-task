import { useSelector } from 'react-redux'
import { selectRole } from '../../app/feature/authentication/authenticationSelectors'

function SideNavBarComponent() {
    const role = useSelector(selectRole)
    console.log(role)
    return <div>Sidebar - Role: {role}</div>
}

export default SideNavBarComponent
