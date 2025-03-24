import { useSelector } from 'react-redux'
import { selectRole } from '../../app/feature/authentication/authenticationSelectors'

function TopNavBarComponent() {
    const role = useSelector(selectRole)
    console.log(role)
    return <div>Top Nav Bar - Role: {role}</div>
}

export default TopNavBarComponent
