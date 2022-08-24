import { object, number, string } from 'yup';



const schemeValidateUser = object({
    body: object({
        login: string()
        .required('Не указан логин или пароль')
        .min(8, 'Длина логина должна быть не меньше 8 символов')
        .max(255, 'Длина логина должна быть не больше 255 символов'),
        password: string()
            .required('Не указан логин или пароль')
            .min(8, 'Длина пароля должна быть не меньше 8 символов')
            .max(72, 'Длина логина должна быть не больше 72 символов'),
        role: string(),
    })
});

export default schemeValidateUser