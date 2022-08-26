import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import { ModalProps, RecordType } from '../../types/types';

function ModalWindow(props: ModalProps): ReactElement {
    const { pathname } = useLocation();

    const {
        listWallets: { wallets, setWallets },
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
                : 'Редактирование расхода'
        
    const varLabel = pathname === '/wallets' ? 'баланс' : pathname === '/revenues' ? 'доход' : '/expense' ? 'расход' : 'расход';
            
    const handle = (values: RecordType) => {
        if (props.isAdd) {
            values.key = wallets.length === 0 ? 1 : wallets[wallets.length - 1].key + 1;
            console.log('Received values of form(Add): ', values);
            setWallets([...wallets, values]);
        } else {
            console.log('Received values of form: ', values);
        }
        props.setIsModalVisible(false);
    };

    const [form] = useForm();
    return (
        <Modal
            title={varTitle}
            visible={props.isModalVisible}
            okText={`${props.isAdd
                ? 'Добавить'
                : 'Сохранить'}`}
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
                        { pattern: /^[0-9]+$/, message: `Введите ${varLabel}` },
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalWindow;
