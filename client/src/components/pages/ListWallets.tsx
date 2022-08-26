import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { RecordType } from '../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../modalWindow/modalWindow';

const { confirm } = Modal;

function ListWallets(): ReactElement {
    const { pathname } = useLocation();

    const {
        listWallets: { wallets, setWallets },
        revenues: { revenues, setRevenues },
    } = useContext(Context);

    const varPage =
        pathname === '/wallets' ? wallets : pathname === '/expenses' ? revenues : revenues;

    const [isAdd, setIsAdd] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showConfirm = (key: number) => {
        confirm({
            title: 'Вы действительно хотите удалить кошелёк?',
            icon: <ExclamationCircleOutlined />,
            content: 'Кошелёк будет удалён безвозвратно',
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
            case '/expenses':
            case '/revenues':
                setRevenues(newData);
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
                    title="Название кошелька"
                    dataIndex="name"
                    key="name"
                    render={(_: any, record: RecordType) => (
                        <Link to={`${pathname}/${record.key}`}>{record.name}</Link>
                    )}
                />
                <Column title="Текущий баланс" dataIndex="value" key="value" />
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
                Добавить кошелёк
            </Button>
            <ModalWindow
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                isAdd={isAdd}
            />
        </>
    );
}

export default observer(ListWallets);
