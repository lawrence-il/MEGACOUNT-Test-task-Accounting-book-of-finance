import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { state } from './store/store';
import App from './components/app/App';
import 'antd/dist/antd.min.css';
import './index.sass';
import { BrowserRouter } from 'react-router-dom';

export const Context = createContext(state);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Context.Provider value={state}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>,
);
