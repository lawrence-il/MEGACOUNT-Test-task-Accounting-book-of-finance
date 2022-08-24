import { number, object, string } from 'yup';

const schemaValidateBalance = object({ // revenue и expense валидация req.query
    query: object({
        sort: string().required('Введите параметр sort'),
        WalletId: number().required('Отсутствует WalletId'),
    }),
});

const schemaValidateWalletId = object({ // revenue и expense валидация req.body
    body: object({
        WalletId: number().required('Отсутствует WalletId'),
    }),
});

export {schemaValidateBalance, schemaValidateWalletId};
