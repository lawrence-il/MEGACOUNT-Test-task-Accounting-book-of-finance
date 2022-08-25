import { observer } from 'mobx-react-lite';
import { Button, Modal, Popconfirm, Table } from 'antd';
import { ReactElement, useContext } from 'react';
import Column from 'antd/lib/table/Column';
import { Wallet } from '../../types/types';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function ListWallets(): ReactElement {
    const {
        listWallets: { wallets, setWallets },
    } = useContext(Context);

    const showConfirm = (key: number) => {
        confirm({
            title: 'Вы действительно хотите удалить кошелёк?',
            icon: <ExclamationCircleOutlined />,
            content: 'Кошелёк будет удалён безвозвратно',
            onOk() {
                handleDelete(key);
            },
        });
    };

    const handleAdd = () => {
        const newData: Wallet = {
            key: wallets.length === 0 ? 1 : wallets[wallets.length - 1].key + 1,
            nameWallet: 'R7',
            currentBalance: 77770,
        };
        setWallets([...wallets, newData]);
    };

    const handleDelete = (key: number) => {
        const newData = wallets.filter((item: Wallet) => item.key !== key);
        setWallets(newData);
    };

    return (
        <>
            <Table dataSource={wallets} pagination={false} scroll={{ x: 320 }}>
                <Column
                    title="Название кошелька"
                    dataIndex="nameWallet"
                    key="nameWallet"
                    render={(_: any, record: Wallet) => <Link to={'/'}>{record.nameWallet}</Link>}
                />
                <Column title="Текущий баланс" dataIndex="currentBalance" key="currentBalance" />
                <Column
                    title="Действия"
                    key="action"
                    render={(_: any, record: Wallet) => (
                        <div
                            key={record.key}
                            style={{ color: '#1890ff', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ margin: '3px auto', cursor: 'pointer' }}>Редактировать</div>
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
                onClick={handleAdd}
                type="primary"
                style={{ position: 'absolute', right: '0', margin: '20px' }}>
                Add a row
            </Button>
        </>
    );
}

export default observer(ListWallets);
