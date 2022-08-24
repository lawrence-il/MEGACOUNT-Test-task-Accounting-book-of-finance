import { number, object, string } from 'yup';
const schemaValidateRevenue = object({
    query: object({
        sort: string().matches(/(DESC|ASC)/, "Неправильный sort"),
        WalletId: number().required("Отсутствует WalletId")
    })
});
export default schemaValidateRevenue;
