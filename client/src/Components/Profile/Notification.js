import React from 'react'

function Notification({content}) {
    return (
        <div className={`tab-pane ${content === "menu2"?"active":"fade"}`}>
            test
        </div>
    )
}

export default Notification
