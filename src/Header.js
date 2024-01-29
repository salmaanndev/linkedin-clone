import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './Firebase';
function Header() {

    
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    }
    return (
        <div className='header'>
            <div className='header_left'>
                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="" />
                <div className='header_search'>
                    {/*Search Icon */}
                    <SearchIcon />

                    <input type='text' placeholder='Search' />
                </div>
            </div>
            <div className='header_right'>
                <HeaderOption title="Home" Icon={HomeIcon} />
                <HeaderOption title="My Network" Icon={SupervisorAccountIcon} />
                <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
                <HeaderOption title="Messaging" Icon={ChatIcon} />
                <HeaderOption title="Messaging" Icon={NotificationsIcon} />
                <HeaderOption title="me" onClick={logoutOfApp} avatar={true} />
            </div>
        </div>
    )
}

export default Header
