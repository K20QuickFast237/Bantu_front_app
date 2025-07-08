import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/

export const validationRegisterSchema = Yup.object({
    nom: Yup.string().required('Nom obligatoire'),
    email: Yup.string().email('Email invalide').required('Email obligatoire'),
    password: Yup
    .string()
    .min(9, 'Minimum 6 caractères')
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

export const validationForgotPasswordSchema = Yup.object({
  email: Yup
    .string()
    .email("Veuillez saisir une adresse email valide")
    .required("L'adresse email est requise"),
});

export const validationResetPasswordSchema = Yup.object({
    password: Yup
    .string()
    .min(8, 'Minimum 8 caractères')
    .matches(passwordRules, {message: "Entrer un mot de passe contenant une letres majuscule, et un chiffre"})
    .required('Mot de passe requis'),
});