/* eslint-disable no-console */
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import { addExpense } from '../../http/expenseApi';
import { addRevenue } from '../../http/revenueApi';
import { createWallet, updateWallet } from '../../http/walletApi';
import { ModalProps, RecordType } from '../../types/types';

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

    const varTitle =
        pathname === '/wallets'
            ? props.isAdd
                ? 'Добавление кошелька'
                : 'Редактирование кошелька'
            : pathname === '/revenues'
            ? props.isAdd
                ? 'Добавление дохода'
                : 'Редактирование дохода'
            : pathname === '/expenses'
            ? props.isAdd
                ? 'Добавление расхода'
                : 'Редактирование расхода'
            : props.isAdd
            ? 'Добавление расхода'
            : 'Редактирование расхода';

    const varLabel =
        pathname === '/wallets'
            ? 'баланс'
            : pathname === '/revenues'
            ? 'доход'
            : '/expense'
            ? 'расход'
            : 'расход';

    const handle = async (values: RecordType) => {
        if (props.isAdd) {
            if (pathname === '/wallets') {
                const newWallet = await createWallet(values.name, values.value, user);
                console.log(newWallet, '1111', values);
                setIsChangeWallet(!isChangeWallet);
            }
            if (pathname === '/expenses') {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const newExp = await addExpense(values.name, values.value, +localStorage.getItem("WalletId")!);
                setIsChangeExpenses(!isChangeExpenses);
                console.log(newExp, isChangeExpenses);
            }
            if (pathname === '/revenues') {
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
