import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { Wallet } from '../../types/types';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../modalWindow/modalWindow';

const { confirm } = Modal;

function ListWallets(): ReactElement {
    const {
        listWallets: { wallets, setWallets },
    } = useContext(Context);

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
                handleDelete(key);
            },
        });
    };


    const handleDelete = (key: number) => {
        const newData = wallets.filter((item: Wallet) => item.key !== key);
        setWallets(newData);
    };

    const showModal = (isAdd: boolean) => {
        setIsAdd(isAdd);
        setIsModalVisible(true);
    };

    return (
        <>
            <Table dataSource={wallets} pagination={false} scroll={{ x: 320 }}>
                <Column
                    title="Название кошелька"
                    dataIndex="nameWallet"
                    key="nameWallet"
                    render={(_: any, record: Wallet) => <Link to={`/wallet/${record.key}`}>{record.nameWallet}</Link>}
                />
                <Column title="Текущий баланс" dataIndex="currentBalance" key="currentBalance" />
                <Column
                    title="Действия"
                    key="action"
                    render={(_: any, record: Wallet) => (
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
