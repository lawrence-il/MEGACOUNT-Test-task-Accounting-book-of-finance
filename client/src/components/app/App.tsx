import { FC, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from '../../index';

import { publicRoutes, userRoutes } from '../../accessRoutes';
import Header from '../header/Header';
import { observer } from 'mobx-react-lite';

const App: FC = observer(() => {

    const {user: {auth}} = useContext(Context);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map(({ path, Component }) => {
                        return <Route key={path} path={path} element={<Component />} />;
                    })}
                    {auth &&
                        userRoutes.map(({ path, Component }) => {
                            return <Route key={path} path={path} element={<><Header/> <Component /></>} />;
                    })}
                </Routes>
        </BrowserRouter>
        </>
    );
});

export default App;
