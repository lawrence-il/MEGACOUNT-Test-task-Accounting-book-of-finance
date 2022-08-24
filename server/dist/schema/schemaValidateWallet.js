import { object, number } from 'yup';
const schemaDeleteValidateWallet = object({
    params: object({
        id: number().required("Отсутствует id")
    })
});
const schemaUpdateValidateWallet = object({
    body: object({
        id: number().required("Отсутствует id")
    })
});
export { schemaDeleteValidateWallet, schemaUpdateValidateWallet };
