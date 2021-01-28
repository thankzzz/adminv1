import React from 'react'

function SecuritySetting({content}) {
    return (
        <div className={`tab-pane ${content === "menu3"?"active":"fade"}`}>
            <h1>security setting</h1>
        </div>
    )
}

export default SecuritySetting
