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
            : props.isAdd
                ? 'Добавление дохода'
                : 'Редактирование дохода';
            

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
                    label="Баланс"
                    rules={[
                        { required: true, message: 'Введите баланс' },
                        { pattern: /^[0-9]+$/, message: 'Введите число' },
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalWindow;
