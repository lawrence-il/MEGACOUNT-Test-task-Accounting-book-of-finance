import { number, object, string } from 'yup';
const schemaValidateBalance = object({
    query: object({
        sort: string().required('Введите параметр sort'),
        WalletId: number().required('Отсутствует WalletId'),
    }),
});
const schemaValidateWalletId = object({
    body: object({
        WalletId: number().required('Отсутствует WalletId'),
    }),
});
export { schemaValidateBalance, schemaValidateWalletId };
