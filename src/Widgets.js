import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import './Widgets.css'

function Widgets() {
    const newArticle = (heading, subtitle) => {
        return (
        <div className='widgets_article'>
            <div className='widgets_artlcleLeft'>
                <FiberManualRecordIcon style={{color: "#016777", fontSize: "14px"}} />
            </div>
            <div className='widgets_artlcleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
        )

    }
    return (
        <div className='widgets'>
            <div className='widgets_header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />

            </div>
            {newArticle("LinkedIn Clone", "It's Cool")}
            {newArticle("Today's Weather", "It's Cold")}
            {newArticle("LinkedIn Clone", "It's Cool")}
            {newArticle("LinkedIn Clone", "It's Cool")}
            {newArticle("LinkedIn Clone", "It's Cool")}
            {newArticle("LinkedIn Clone", "It's Cool")}
        </div>
    )
}

export default Widgets
