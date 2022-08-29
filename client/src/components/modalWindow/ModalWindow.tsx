/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import useConsts from '../../hook/useConsts';
import { addExpense, updateExpense } from '../../http/expenseApi';
import { addRevenue, updateRevenue } from '../../http/revenueApi';
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
                await createWallet(values.name, values.value, user);
                setIsChangeWallet(!isChangeWallet);
            }
            if (pathname === EXPENSES_ROUTE) {
                await addExpense(values.name, values.value, +localStorage.getItem("WalletId")!);
                setIsChangeExpenses(!isChangeExpenses);
            }
            if (pathname === REVENUES_ROUTE) {
                await addRevenue(values.name, values.value, +localStorage.getItem("WalletId")!);
                setIsChangeRevenue(!isChangeRevenue);
            }
        } else {
            if (pathname === WALLETS_ROUTE) {
                await updateWallet(values.name, values.value, props.id);
                setIsChangeWallet(!isChangeWallet);
            }
            if (pathname === EXPENSES_ROUTE) {
                await updateExpense(values.name, values.value, props.id);
                setIsChangeExpenses(!isChangeExpenses);
            }
            if (pathname === REVENUES_ROUTE) {
                await updateRevenue(values.name, values.value, props.id);
                setIsChangeRevenue(!isChangeRevenue);
            }
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
                    rules={[{ required: true, message: 'Введите название' },
                            { min: 3, message: 'Название должно быть больше 2 символов'},]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="value"
                    label={`${varLabel[0].toUpperCase() + varLabel.slice(1)}`}
                    rules={[
                        { required: true, message: `Введите ${varLabel}` },
                        { pattern: /^[0-9]+$/, message: `Введите число` },
                        { pattern: /[^0]/, message: 'Значение должно быть больше нуля'}]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ModalWindow;
