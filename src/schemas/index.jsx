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

export const validationFormationSchema = Yup.object().shape({
  domaine_etude: Yup.string().required('Le domaine d\'étude est requis'),
  date_debut: Yup.date().required('La date de début est requise').nullable(),
  date_fin: Yup.date()
  .required('La date de fin est requise').nullable()
  .min(Yup.ref('date_debut'), 'La date de fin doit être postérieure à la date de début').nullable(),
  etablissement: Yup.string().required('L\'établissement est requis'),
  diplome: Yup.string().required('Le diplôme est requis'),
});

export const validationExperienceSchema = Yup.object().shape({
  titre_poste: Yup.string().required('Le titre du poste est requis'),
  nom_entreprise: Yup.string().required('Le nom de l\'entreprise est requis'),
  date_debut: Yup.date().required('La date de début est requise').nullable(),
  date_fin: Yup.date()
  .required('La date de fin est requise').nullable()
  .min(Yup.ref('date_debut'), 'La date de fin doit être postérieure à la date de début').nullable(),
  description_taches: Yup.string().required('La description des tâches est requise'),
  adresse: Yup.string().required('L\'adresse est requise'),
  ville: Yup.string().required('La ville est requise'),
  pays: Yup.string().required('Le pays est requis'),
});

export const validationSchema = Yup.object({
  titre_professionnel: Yup.string().required("Titre professionnel requis"),
  email_pro: Yup.string().email("Email invalide").required("Email requis"),
  telephone_pro: Yup.string().required("Téléphone requis"),
  nom_entreprise: Yup.string().required("Nom de l'entreprise requis"),
  description_entreprise: Yup.string().required("Description requise"),
  site_web: Yup.string().url("URL invalide").required("Site web requis"),
  adresse: Yup.string().required("Adresse requise"),
  ville: Yup.string().required("Ville requise"),
  pays: Yup.string().required("Pays requis"),
  num_contribuable: Yup.string().required("Numéro contribuable requis"),
  logo: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "Le fichier est trop volumineux (max 2MB)",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB
    )
    .test(
      "fileFormat",
      "Format de fichier non supporté (PNG, JPG, GIF)",
      (value) => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
  image_couverture: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "Le fichier est trop volumineux (max 2MB)",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB
    ).test(
      "fileFormat",
      "Format de fichier non supporté (PNG, JPG, GIF)",
      (value) => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
});