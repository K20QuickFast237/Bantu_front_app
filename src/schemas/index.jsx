import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/

export const validationRegisterSchema = Yup.object({
    nom: Yup.string().required('Nom obligatoire'),
    email: Yup.string().email('Email invalide').required('Email obligatoire'),
    password: Yup
    .string()
    .min(9, 'Minimum 9 caractères')
    .matches(passwordRules, {message: "Entrer un mot de passe contenant une letres majuscule, et un chiffre"})
    .required('Mot de passe requis'),
    password_confirmation: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation obligatoire'),
});

export const validationLoginSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email obligatoire'),
  password: Yup
    .string()
    .required('Mot de passe requis'),
});