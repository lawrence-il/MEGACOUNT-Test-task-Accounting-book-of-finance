/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { ReactElement, useContext, useEffect, useState } from 'react';
import Column from 'antd/lib/table/Column';
import { RecordType } from '../../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../..';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalWindow from '../../modalWindow/ModalWindow';
import { fetchListWallet } from '../../../http/listWalletsApi';
import { deleteWallet } from '../../../http/walletApi';
import { deleteExpense, fetchAllExpense } from '../../../http/expenseApi';
import { deleteRevenue, fetchAllRevenue } from '../../../http/revenueApi';
import './lists.sass';
import useConsts from '../../../hook/useConsts';
import { EXPENSES_ROUTE, REVENUES_ROUTE, WALLETS_ROUTE } from '../../../utils/consts';
const { confirm } = Modal;

const Lists = observer(function (): ReactElement {
    const { pathname } = useLocation();

    const {varAdd, varConfirm, varH1, varPage, varValue} = useConsts();

    const {
        user: { user },
        listWallets: { setWallets, isChangeWallet, setIsChangeWallet },
        revenues: { setRevenues, setIsChangeRevenue, isChangeRevenue },
        expenses: { setExpenses, isChangeExpenses, setIsChangeExpenses },
    } = useContext(Context);

    const [isIdEdited, setIsIdEdited] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getListWallet = () => {
        fetchListWallet(user)
            .then((wallets) => setWallets(wallets.rows))
            .finally(() => setIsChangeWallet(false));
    };


    useEffect(() => {
        getListWallet();
    }, [isChangeWallet]);


    useEffect(() => {

        const WalletId = +localStorage.getItem("WalletId")!;
        getListWallet();
        if(WalletId) {
            fetchAllExpense(WalletId)
                .then((expense) => setExpenses(expense.rows))
                .finally(() => setIsChangeExpenses(false));
        }
        
    }, [isChangeExpenses]);


    useEffect(() => {
        const WalletId = +localStorage.getItem("WalletId")!;
        getListWallet();
        if(WalletId) {
            fetchAllRevenue(+WalletId)
                .then((revenues) => setRevenues(revenues.rows))
                .finally(() => setIsChangeRevenue(false));
        }
        
    }, [isChangeRevenue]);


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
            case WALLETS_ROUTE:
                await deleteWallet(id);
                setIsChangeWallet(!isChangeWallet);
                break;
            case REVENUES_ROUTE:
                await deleteRevenue(id);
                setIsChangeRevenue(!isChangeRevenue);
                break;
            case EXPENSES_ROUTE:
                await deleteExpense(id);
                setIsChangeExpenses(!isChangeExpenses);
                break;
        }
    };

    const showModal = (isAdd: boolean, id: number) => {
        setIsAdd(isAdd);
        setIsModalVisible(true);
        setIsIdEdited(id);
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Страница со списком {varH1}</h1>
            <Button onClick={() => showModal(true, 0)} type="primary" style={{ margin: '20px' }}>
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
                            className={`link ${pathname === WALLETS_ROUTE ? '' : 'link_no-wallet'}`}
                            to={pathname === WALLETS_ROUTE ? `${WALLETS_ROUTE}/${record.id}` : ''}>
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
                                onClick={() => showModal(false, record.id)}>
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
                id={isIdEdited}
            />
        </>
    );
});

export default Lists;
