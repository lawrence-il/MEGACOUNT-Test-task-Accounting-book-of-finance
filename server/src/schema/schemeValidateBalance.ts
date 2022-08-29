import { number, object, string } from 'yup';

const schemaValidateBalance = object({ // revenue и expense валидация req.query
    query: object({
        sort: string().required('Введите параметр sort'),
        name: string().min(3, 'Название должно быть больше 2 символов'),
        WalletId: number().required('Отсутствует WalletId'),
    }),
});

const schemaValidateWalletId = object({ // revenue и expense валидация req.body
    body: object({
        WalletId: number().required('Отсутствует WalletId'),
        name: string().min(3, 'Название должно быть больше 2 символов'),
        value: number().min(1, 'Значение должно быть больше нуля')
    }),
});



export {schemaValidateBalance, schemaValidateWalletId};
