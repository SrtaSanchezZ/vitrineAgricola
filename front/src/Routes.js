import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import NewPassword from './pages/Login/NewPassword';
import Admin from './pages/Manager/Admin';
import Editor from './pages/Manager/Editor';
import Seller from './pages/Manager/Seller';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Login} exact path="/" />
                <Route component={NewPassword} exact path="/novasenha" />
                <Route component={Admin} exact path="/master" />
                <Route component={Editor} exact path="/redator" />
                <Route component={Seller} exact path="/vendedor" />
            </Switch>
        </BrowserRouter>
    );
}