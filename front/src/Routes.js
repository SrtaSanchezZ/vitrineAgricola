import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated, NotFound } from './services';
import Login from './pages/public/Login';
import NewPassword from './pages/public/Login/NewPassword';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Business from './pages/public/Business';
import Contact from './pages/public/Contact';
import Courses from './pages/public/Courses';
import CourseReading from './pages/public/Courses/CourseReading';
import News from './pages/public/News';
import Showcase from './pages/public/Showcase';
import Admin from './pages/private/Manager/Admin';
import Edit from './pages/private/Manager/Edit';
import Seller from './pages/private/Manager/Seller';

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
                <Route component={Home} exact path="/" />
                <Route component={About} exact path="/quemsomos" />
                <Route component={Business} exact path="/gestao" />
                <Route component={Contact} exact path="/contato" />
                <Route component={Courses} exact path="/cursos" />
                <Route component={CourseReading} exact path="/cursos/:id" />
                <Route component={News} exact path="/noticias" />
                <Route component={Showcase} exact path="/vitrineagricola" />
                <Route component={Login} exact path="/acesso" />
                <Route component={NewPassword} exact path="/novasenha/:token" />
                <PrivateRoute component={Admin} exact path="/master" />
                <PrivateRoute component={Edit} exact path="/redator" />
                <PrivateRoute component={Seller} exact path="/vendedor" />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}