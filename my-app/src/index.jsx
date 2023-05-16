/* @refresh reload */
import { render } from 'solid-js/web';
import './css/index.css';
import App from './App';
import Mock from './Mock.jsx';
import Test from './Test.jsx'
import { Router, Route, Routes } from "@solidjs/router";

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
      <Route path="/" component={App} />
      <Route path="/mock" component={Mock} />
      <Route path="/mock/test/:id" component={Test} />
    </Routes>
  </Router>
  ), 
  root
  );