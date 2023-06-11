/* @refresh reload */
import { render } from 'solid-js/web';
import './public/css/index.css';
import App from './pages/App';
import Mock from './pages/Mock.jsx';
import Test from './pages/Test.jsx'
import Profile from './pages/Profile.jsx'
import Report from './pages/Report.jsx'
import { Router, Route, Routes } from "@solidjs/router";
import PageNotFound from './Components/PageNotFound';
import Upcoming from './pages/Upcoming';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Signup from './pages/Signup';



const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}



render(
  () =>( 
  <Router>
    <Routes>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={App} />
      <Route path="/mock" component={Mock} />
      <Route path="/mock/test/:id" component={Test} />
      <Route path="/profile" component={Profile} />
      <Route path="/report" component={Report} />
      <Route path="/coming-soon" component={Upcoming} />
      <Route path="*" component={PageNotFound} />
    </Routes>
  </Router>
  ), 
  root
  );
