import { FC, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from '../..';
import { publicRoutes, userRoutes } from '../../accessRoutes';

const App: FC = () => {

    const {user: {auth}} = useContext(Context);
    
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map(({ path, Component }) => {
                    return <Route key={path} path={path} element={<Component />} />;
                })}
                {auth &&
                    userRoutes.map(({ path, Component }) => {
                        return <Route key={path} path={path} element={<Component />} />;
                    })}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
