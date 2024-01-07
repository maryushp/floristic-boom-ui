import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/sass/index.css';
import App from './App';
import {createRoot} from "react-dom/client";

const root = document.getElementById('root');
if (root) {
    const rootReact = createRoot(root);
    rootReact.render(
        <Router>
            <App/>
        </Router>
    );
}