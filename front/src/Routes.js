import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated, NotFound } from './services';
import Login from './pages/Login';
import NewPassword from './pages/Login/NewPassword';
import Admin from './pages/Manager/Admin';
import Editor from './pages/Manager/Editor';
import Seller from './pages/Manager/Seller';

const PrivateRoute = ({ component: Component, ...rest}) =>(
    <Route {...rest} render={ props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    )} />
)

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Login} exact path="/" />
                <Route component={NewPassword} exact path="/novasenha/:token" />
                <PrivateRoute component={Admin} exact path="/master" />
                <PrivateRoute component={Editor} exact path="/redator" />
                <PrivateRoute component={Seller} exact path="/vendedor" />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}