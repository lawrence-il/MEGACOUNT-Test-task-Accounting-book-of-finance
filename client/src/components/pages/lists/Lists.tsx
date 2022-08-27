import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useEffect, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { RecordType } from '../../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../../modalWindow/ModalWindow';
import './lists.sass';
import { fetchListWallet } from '../../../http/listWalletsApi';
import { deleteWallet } from '../../../http/walletApi';
const { confirm } = Modal;

const Lists = observer(function (): ReactElement {
    const { pathname } = useLocation();

    const {
        user: { user },
        listWallets: { wallets, setWallets, isChange, setIsChange },
        revenues: { revenues, setRevenues },
        expenses: { expenses, setExpenses },
    } = useContext(Context);

    const [isAdd, setIsAdd] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchListWallet(user)
            .then((wallets) => setWallets(wallets.rows))
            .finally(() => setIsChange(false));
    }, [isChange]);

    const varPage =
        pathname === '/wallets'
            ? wallets
            : pathname === '/revenues'
            ? revenues
            : '/expense'
            ? expenses
            : expenses;

    const varConfirm =
        pathname === '/wallets'
            ? 'кошелёк'
            : pathname === '/revenues'
            ? 'доход'
            : '/expense'
            ? 'расход'
            : 'расход';

    const varAdd =
        pathname === '/wallets'
            ? 'кошелька'
            : pathname === '/revenues'
            ? 'доходa'
            : '/expense'
            ? 'расходa'
            : 'расходa';

    const varH1 =
        pathname === '/wallets'
            ? 'кошельков'
            : pathname === '/revenues'
            ? 'доходов'
            : '/expense'
            ? 'расходов'
            : 'расходов';

    const varValue =
        pathname === '/wallets'
            ? 'Текущий баланс'
            : pathname === '/revenues'
            ? 'Доход'
            : '/expense'
            ? 'Расход'
            : 'Расход';

    const showConfirm = (id: number) => {
        confirm({
            title: `Вы действительно хотите удалить ${varConfirm}?`,
            icon: <ExclamationCircleOutlined />,
            content: `${
                varConfirm[0].toUpperCase() + varConfirm.slice(1)
            } будет удалён безвозвратно`,
            okText: 'Удалить',
            cancelText: 'Закрыть',
            onOk() {
                handleDelete(id);
            },
        });
    };

    const handleDelete = async (id: number) => {
        switch (pathname) {
            case '/wallets':
                await deleteWallet(id);
                setIsChange(!isChange);
                break;
            case '/revenues':
                // setRevenues(newData);
                break;
            case '/expenses':
                // setExpenses(newData);
                break;
        }
    };

    const showModal = (isAdd: boolean) => {
        setIsAdd(isAdd);
        setIsModalVisible(true);
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Страница со списком {varH1}</h1>
            <Button onClick={() => showModal(true)} type="primary" style={{ margin: '20px' }}>
                {`Добавить ${varConfirm}`}
            </Button>
            <Table rowKey="id" dataSource={varPage} pagination={false} scroll={{ x: 320 }}>
                <Column
                    title={`Название ${varAdd}`}
                    dataIndex="name"
                    key="name"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render={(_: any, record: RecordType) => (
                        <Link
                            className={`link ${pathname === '/wallets' ? '' : 'link_no-wallet'}`}
                            to={pathname === '/wallets' ? `/wallets/${record.id}` : ''}>
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
                        <div className="column" key={record.id}>
                            <div
                                className="column__action column__action_change"
                                onClick={() => showModal(false)}>
                                Редактировать
                            </div>
                            <div
                                className="column__action column__action_del"
                                onClick={() => showConfirm(record.id)}>
                                Удалить
                            </div>
                        </div>
                    )}
                />
            </Table>
            <ModalWindow
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                isAdd={isAdd}
            />
        </>
    );
});

export default Lists;
