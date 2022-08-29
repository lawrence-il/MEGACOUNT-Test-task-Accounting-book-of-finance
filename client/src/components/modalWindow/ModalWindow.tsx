/* eslint-disable no-console */
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import useConsts from '../../hook/useConsts';
import { addExpense } from '../../http/expenseApi';
import { addRevenue } from '../../http/revenueApi';
import { createWallet, updateWallet } from '../../http/walletApi';
import { ModalProps, RecordType } from '../../types/types';
import { EXPENSES_ROUTE, REVENUES_ROUTE, WALLETS_ROUTE } from '../../utils/consts';

const ModalWindow = observer(function (props: ModalProps): ReactElement {
    const location = useLocation();
    const { pathname } = location;

    const {
        listWallets: { isChangeWallet, setIsChangeWallet },
        expenses: {isChangeExpenses, setIsChangeExpenses},
        revenues: {isChangeRevenue, setIsChangeRevenue},
        user: { user },
    } = useContext(Context);

    const [form] = useForm();

    const {varLabel} = useConsts();

    const handle = async (values: RecordType) => {
        if (props.isAdd) {
            if (pathname === WALLETS_ROUTE) {
                const newWallet = await createWallet(values.name, values.value, user);
                console.log(newWallet, '1111', values);
                setIsChangeWallet(!isChangeWallet);
            }
            if (pathname === EXPENSES_ROUTE) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const newExp = await addExpense(values.name, values.value, +localStorage.getItem("WalletId")!);
                setIsChangeExpenses(!isChangeExpenses);
                console.log(newExp, isChangeExpenses);
            }
            if (pathname === REVENUES_ROUTE) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const newExp = await addRevenue(values.name, values.value, +localStorage.getItem("WalletId")!);
                setIsChangeRevenue(!isChangeRevenue);
                console.log(newExp, isChangeRevenue);
            }
        } else {
            const newUpdWallet = await updateWallet(values.name, values.value, props.id);
            setIsChangeWallet(!isChangeWallet);
            console.log('Received values of form: ', newUpdWallet);
        }
        props.setIsModalVisible(false);
    };

    const varTitle =
    pathname === WALLETS_ROUTE
        ? props.isAdd
            ? 'Добавление кошелька'
            : 'Редактирование кошелька'
        : pathname === REVENUES_ROUTE
        ? props.isAdd
            ? 'Добавление дохода'
            : 'Редактирование дохода'
        : pathname === EXPENSES_ROUTE
        ? props.isAdd
            ? 'Добавление расхода'
            : 'Редактирование расхода'
        : props.isAdd
        ? 'Добавление расхода'
        : 'Редактирование расхода';


    return (
        <Modal
            title={varTitle}
            visible={props.isModalVisible}
            okText={`${props.isAdd ? 'Добавить' : 'Сохранить'}`}
            cancelText="Закрыть"
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        handle(values);
                    })
                    .catch((info) => {
                        console.log('Ошибка валидации:', info);
                    });
            }}
            onCancel={() => props.setIsModalVisible(false)}>
            <Form
                layout="vertical"
                name="form_in_modal"
                form={form}
                initialValues={{ modifier: 'public' }}>
                <Form.Item
                    name="name"
                    label="Название"
                    rules={[{ required: true, message: 'Введите название' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="value"
                    label={`${varLabel[0].toUpperCase() + varLabel.slice(1)}`}
                    rules={[
                        { required: true, message: `Введите ${varLabel}` },
                        { pattern: /^[0-9]+$/, message: `Введите число` },
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ModalWindow;
