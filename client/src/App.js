import './App.css';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Login from './Components/Login';
import { ForwardRoute,BackwardRoute } from './PrivateRoute';
import Register from './Components/Register';
import {useSelector} from 'react-redux'
import Apps from './Components/Apps';

function App() {
  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo} = userSignin
  const checkAuth = () =>{
    if(userInfo){
      return true
    }else{
      return false;
    }   
}
  return (
    <div className="App"> 
    <Router>      
            <Switch>
            <Route exact path="/" > <Redirect to="/apps"/></Route>   
            <ForwardRoute  exacr path="/apps" component={Apps} isAuthenticated={()=>checkAuth()}/>
            <BackwardRoute exact path="/login" component={Login} isAuthenticated={()=>checkAuth()} />
            <Route exact path="/register" component={Register}/>
           
            <Route path="*" isAuthenticated={()=>checkAuth()}><Redirect to="/apps"/></Route>
           </Switch>
    </Router> 
    </div>
  );
}

export default App;
