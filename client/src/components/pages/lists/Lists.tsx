import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { RecordType } from '../../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../../modalWindow/ModalWindow';

const { confirm } = Modal;

const Lists = observer(function(): ReactElement {
    const { pathname } = useLocation();

    const {
        listWallets: { wallets, setWallets },
        revenues: { revenues, setRevenues },
        expenses: { expenses, setExpenses },
    } = useContext(Context);

    const [isAdd, setIsAdd] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const varPage =
        pathname === '/wallets' ? wallets : pathname === '/revenues' ? revenues : '/expense' ? expenses : expenses;

    const varConfirm = 
        pathname === '/wallets' ? 'кошелёк' : pathname === '/revenues' ? 'доход' : '/expense' ? 'расход' : 'расход';

    const varAdd = 
        pathname === '/wallets' ? 'кошелька' : pathname === '/revenues' ? 'доходa' : '/expense' ? 'расходa' : 'расходa';

    const varH1 = 
        pathname === '/wallets' ? 'кошельков' : pathname === '/revenues' ? 'доходов' : '/expense' ? 'расходов' : 'расходов';

    const varValue = 
        pathname === '/wallets' ? 'Текущий баланс' : pathname === '/revenues' ? 'Доход' : '/expense' ? 'Расход' : 'Расход';

    const showConfirm = (key: number) => {
        confirm({
            title: `Вы действительно хотите удалить ${varConfirm}?`,
            icon: <ExclamationCircleOutlined />,
            content: `${varConfirm[0].toUpperCase() + varConfirm.slice(1)} будет удалён безвозвратно`,
            okText: 'Удалить',
            cancelText: 'Закрыть',
            onOk() {
                handleDelete(key, varPage);
            },
        });
    };

    const handleDelete = (key: number, list: RecordType[]) => {
        const newData = list.filter((item: RecordType) => item.key !== key);
        switch (pathname) {
            case '/wallets':
                setWallets(newData);
                break;
            case '/revenues':
                setRevenues(newData);
                break;
            case '/expenses':
                setExpenses(newData);
                break;
        }
    };

    const showModal = (isAdd: boolean) => {
        setIsAdd(isAdd);
        setIsModalVisible(true);
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Страница со списком {varH1}</h1>
            <Table dataSource={varPage} pagination={false} scroll={{ x: 320 }}>
                <Column
                    title={`Название ${varAdd}`}
                    dataIndex="name"
                    key="name"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render={(_: any, record: RecordType) => (
                        <Link 
                            style={{color: `${pathname === '/wallets' ? '#1890ff' : '#000'}`, cursor: `${pathname === '/wallets' ? 'pointer' : 'default'}`}} 
                            to={pathname === '/wallets' ? `/wallets/${record.key}` : ''}
                        >
                            {record.name}
                        </Link>
                    )}
                />
                <Column title={varValue} dataIndex="value" key="value" />
                <Column
                    title="Действия"
                    key="action"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render={(_: any, record: RecordType) => (
                        <div
                            key={record.key}
                            style={{ color: '#1890ff', display: 'flex', flexDirection: 'column' }}>
                            <div
                                onClick={() => showModal(false)}
                                style={{ margin: '3px auto', cursor: 'pointer' }}>
                                Редактировать
                            </div>
                            <div
                                onClick={() => showConfirm(record.key)}
                                style={{ color: '#ff4d4f', margin: '3px auto', cursor: 'pointer' }}>
                                Удалить
                            </div>
                        </div>
                    )}
                />
            </Table>
            <Button
                onClick={() => showModal(true)}
                type="primary"
                style={{ position: 'absolute', right: '0', margin: '20px' }}>
                {`Добавить ${varConfirm}`}
            </Button>
            <ModalWindow
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                isAdd={isAdd}
            />
        </>
    );
});

export default Lists;
