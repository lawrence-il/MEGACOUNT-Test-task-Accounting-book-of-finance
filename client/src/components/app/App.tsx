import { FC, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from '../../index';

import { publicRoutes, userRoutes } from '../../accessRoutes';
import Header from '../header/Header';
import { observer } from 'mobx-react-lite';
import { authCheck } from '../../http/userApi';
import { Spin } from 'antd';

const App: FC = observer(() => {
    const {
        user: { auth, setAuth, setUser },
    } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authCheck()
            .then((data) => {
                setUser(data);
                setAuth(true);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <Spin
                style={{ position: 'relative', left: '50vw', top: '50vh' }}
                tip="Загрузка..."
                size="large"
            />
        );
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map(({ path, Component }) => {
                        return <Route key={path} path={path} element={<Component />} />;
                    })}
                    {auth &&
                        userRoutes.map(({ path, Component }) => {
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <>
                                            <Header /> <Component />
                                        </>
                                    }
                                />
                            );
                        })}
                </Routes>
            </BrowserRouter>
        </>
    );
});

export default App;
