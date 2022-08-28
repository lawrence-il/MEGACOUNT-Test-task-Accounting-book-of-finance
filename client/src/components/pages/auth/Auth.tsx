import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import { registrationUser, loginUser } from '../../../http/userApi';
import { User } from '../../../types/types';

import './auth.sass';

const Auth = observer(function (): ReactElement {
    
    const {
        user: { setAuth, setUser },
    } = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isLogin = pathname === '/';

    useEffect(() => {
        setUser({} as User);
        setAuth(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickAuth = async () => {
        try {
            let res: User;
            if (isLogin) {
                res = await loginUser(login, password);
            } else {
                res = await registrationUser(login, password);
            }
            if (res.id) {
                setAuth(true);
                setUser(res);
                navigate('/wallets');
            }
        } catch (error: any) {
            alert(error.response.data.message);

        }
    };

    return (
        <div className="form__wrapper">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={() => onClickAuth()}>
                <h1 className="form__title">{pathname === '/' ? 'Авторизация' : 'Регистрация'}</h1>
                <Form.Item
                    name="login"
                    rules={[
                        { required: true, message: 'Введите логин' },
                        { min: 8, message: 'Пароль может быть не меньше 8 символов' },
                        { max: 255, message: 'Пароль может быть не больше 255 символов' },
                    ]}
                    hasFeedback>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Логин"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Введите пароль' },
                        { min: 8, message: 'Пароль может быть не меньше 8 символов' },
                        { max: 72, message: 'Пароль может быть не больше 72 символов' },
                    ]}
                    hasFeedback>
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Пароль"
                    />
                </Form.Item>

                {pathname === '/registration' && <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Подтвердите пароль' },
                        { min: 8, message: 'Пароль может быть не меньше 8 символов' },
                        { max: 72, message: 'Пароль может быть не больше 72 символов' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}>
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        onChange={(e) => setConfirm(e.target.value)}
                        value={confirm}
                        placeholder="Подтвердите пароль"
                    />
                </Form.Item>}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {pathname === '/' ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Link to={pathname === '/' ? '/registration' : '/'}>
                        {pathname === '/' ? 'Страница регистрации' : 'Страница авторизации'}
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
});

export default Auth;
