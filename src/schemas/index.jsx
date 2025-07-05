import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/

const validationSchema = Yup.object({
    nom: Yup.string().required('Nom obligatoire'),
    // prenom: Yup.string().required('Champs requis'),
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

export default validationSchema;