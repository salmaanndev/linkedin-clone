import React from 'react'
import './Sidebar.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

function Sidebar() {
    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className='sidebar_recentItem'>
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>)

    return (
        <div className='sidebar'>
            <div className='sidebar_top'>
                <img src="https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <Avatar className='sidebar_avatar' src={user?.photoUrl}>
                    {user?.email[0]}
                </Avatar>
                <h2 src={user?.displayName}>{user?.email[0]}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className='sidebar_stats'>
                <div className='sidebar_stat'>
                <p>
                    Who viewed you
                </p>
                <p className='sidebar_Statnumber'>
                    2,543
                </p>
                </div>
                <div className='sidebar_stat'>
                <p>
                    Views on post
                </p>
                <p className='sidebar_statNumber'>
                    2,441
                </p>
                </div>
            </div>
            <div className='sidebar_bottom'>
                <p>Recent</p>
                {recentItem("ReactJS")}
                {recentItem("Programming")}
                {recentItem("Software Engineering")}
                {recentItem("Design")}
                {recentItem("Developer")}
            </div>
        </div>
    )
}

export default Sidebar
