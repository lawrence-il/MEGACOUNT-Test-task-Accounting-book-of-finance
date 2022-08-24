import { object, number } from 'yup';
const schemaDeleteValidateId = object({
    params: object({
        id: number().required("Отсутствует id")
    })
});
const schemaUpdateValidateId = object({
    body: object({
        id: number().required("Отсутствует id")
    })
});
export { schemaDeleteValidateId, schemaUpdateValidateId };
