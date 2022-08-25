import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { state } from './store/store';
import App from './components/app/App';
import 'antd/dist/antd.css'; 
import './index.sass'

export const Context = createContext(state);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={state}>
        <App />
    </Context.Provider>
);


