import { object, number, string } from 'yup';
const schemaDeleteValidateId = object({
    params: object({
        id: number().required('Отсутствует id'),
    }),
});
const schemaUpdateValidateId = object({
    body: object({
        id: number().required('Отсутствует id'),
        name: string().min(3, 'Название должно быть больше 2 символов'),
        value: number().min(1, 'Значение должно быть больше нуля'),
    }),
});
const schemaCheckUserId = object({
    user: object({
        id: number().required('Отсутствует id'),
    }),
});
const schemaCreateValidateWallet = object({
    body: object({
        name: string().min(3, 'Название должно быть больше 2 символов'),
        value: number().min(1, 'Значение должно быть больше нуля'),
    }),
});
export { schemaDeleteValidateId, schemaUpdateValidateId, schemaCheckUserId, schemaCreateValidateWallet, };
