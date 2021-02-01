import React from 'react'
import {Route,Switch,useRouteMatch} from 'react-router-dom'
import Profile from './Profile/Index'
import Dashboard from './Dashboard/Index'
import Setting from './Settings/Index'
function Content() {
    const {url,path} = useRouteMatch()
    console.log(url)
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${url}/setting`} component={Setting}/>              
                <Route path={`${url}/profile`} component={Profile}/>
                <Route path={`${url}/`} component={Dashboard}/>              
                </Switch>
        </React.Fragment>
    )
}

export default Content
