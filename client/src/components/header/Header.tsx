import { LoginOutlined, WalletOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';

import './header.sass';

const Header = observer(function() {

	const navigate = useNavigate();
  	const {user: {auth}} = useContext(Context);

    const items = [
        {
            label: auth ? 'Выход' : 'Вход',
            key: 'item-1',
			icon: <LoginOutlined style={{ color: 'white', fontSize: '18px' }} />,
			onClick: () => navigate('/')
        }, 
        {
			label: 'Мои кошельки',
            key: 'item-2',
			icon: <WalletOutlined style={{ color: 'white', fontSize: '18px' }} />,
			onClick: () => navigate('/wallets')
        }, 
    ];
    return <Menu multiple={true} mode="horizontal" theme="dark" items={items} />;
});

export default Header;
