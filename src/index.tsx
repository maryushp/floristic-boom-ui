import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/css/index.css';
import App from './App';
import {createRoot} from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = document.getElementById('root');
if (root) {
    const rootReact = createRoot(root);
    rootReact.render(
        <Router>
            <App/>
        </Router>
    );
}