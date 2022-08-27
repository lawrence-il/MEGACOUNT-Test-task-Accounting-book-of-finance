/* eslint-disable no-console */
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import { createWallet } from '../../http/walletApi';
import { ModalProps, RecordType } from '../../types/types';

const ModalWindow = observer(function (props: ModalProps): ReactElement {
    const { pathname } = useLocation();

    const {
        listWallets: { wallets, setWallets, isChange, setIsChange },
        user: { user },
    } = useContext(Context);

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
            const newWallet = await createWallet(values.name, values.value, user);
            console.log(newWallet, '1111', values);
            values.id = newWallet.id;
            setIsChange(!isChange);
        } else {
            console.log('Received values of form: ', values); // PUT
        }
        props.setIsModalVisible(false);
    };

    const [form] = useForm();
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
