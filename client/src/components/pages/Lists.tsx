import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { RecordType } from '../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../../ModalWindow';

const { confirm } = Modal;

function Lists(): ReactElement {
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
            <Table dataSource={varPage} pagination={false} scroll={{ x: 320 }}>
                <Column
                    title={`Название ${varAdd}`}
                    dataIndex="name"
                    key="name"
                    render={(_: any, record: RecordType) => (
                        <Link to={`${pathname}/${record.key}`}>{record.name}</Link>
                    )}
                />
                <Column title={varValue} dataIndex="value" key="value" />
                <Column
                    title="Действия"
                    key="action"
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
}

export default observer(Lists);
