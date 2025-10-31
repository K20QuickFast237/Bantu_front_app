import React, { useState } from "react";
import { useFormik } from "formik";
import api from "@/services/api";
import { toast } from 'sonner'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Building,
  Globe,
  MapPin,
  Hash,
  Info,
  Briefcase,
  X,
  UploadCloud,
} from "lucide-react";
import Header from "../../components/app/Header";
import { ClipLoader } from "react-spinners";
import Welcome1 from "../../assets/assets_application/welcome1.png";
import { validationSchema } from "@/schemas";

const InputField = ({ id, label, formik, icon: Icon, type = "text" }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-blue-800 mb-1">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        {...formik.getFieldProps(id)}
        className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 ${
          formik.touched[id] && formik.errors[id]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        }`}
      />
    </div>
    {formik.touched[id] && formik.errors[id] ? (
      <div className="text-red-500 text-xs mt-1">{formik.errors[id]}</div>
    ) : null}
  </div>
);

const TextAreaField = ({ id, label, formik, icon: Icon }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-sm font-medium text-blue-800 mb-1">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute top-3 left-3">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <textarea
        id={id}
        name={id}
        rows="4"
        {...formik.getFieldProps(id)}
        className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 ${
          formik.touched[id] && formik.errors[id]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        }`}
      />
    </div>
    {formik.touched[id] && formik.errors[id] ? (
      <div className="text-red-500 text-xs mt-1">{formik.errors[id]}</div>
    ) : null}
  </div>
);

const FileField = ({ id, label, formik, helpText, isRequired = false }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue(id, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue(id, null);
      setPreview(null);
    }
  };

  return (
    <div className="md:col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-blue-800 mb-1">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ${formik.touched[id] && formik.errors[id] ? 'border-red-500' : 'border-gray-300'}`}>
        <div className="text-center">
          {preview ? (
            <img src={preview} alt="Aperçu" className="mx-auto h-24 w-auto rounded-lg object-cover" />
          ) : (
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label htmlFor={id} className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500">
              <span>Télécharger un fichier</span>
              <input id={id} name={id} type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
            </label>
            <p className="pl-1">ou glisser-déposer</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">{helpText}</p>
        </div>
      </div>
      {formik.touched[id] && formik.errors[id] ? <div className="text-red-500 text-xs mt-1">{formik.errors[id]}</div> : null}
    </div>
  );
};

const CompletionEntreprise = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      titre_professionnel: "",
      email_pro: "",
      telephone_pro: "",
      nom_entreprise: "",
      description_entreprise: "",
      site_web: "",
      adresse: "",
      ville: "",
      pays: "",
      num_contribuable: "",
      logo: null,
      image_couverture: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const formData = new FormData();
      // Ajoute toutes les valeurs au FormData
      Object.keys(values).forEach(key => {
        if (values[key]) { // N'ajoute pas les champs null (comme image_couverture si non fournie)
          formData.append(key, values[key]);
        }
      });

      try{
        // Laravel ne gère pas bien FormData avec PUT, on doit le "tricher" avec POST et _method
        formData.append('_method', 'POST'); // ou 'PUT' si votre route est en PUT

        const response = await api.post('/profile/professionnel', formData);
        toast.success("Profil complete avec success !", {
            duration: 3000,
        });
        resetForm();
        navigate("/dashboard");
      }catch(err){
        toast.error("Erreur de connexion", {
            description: `${err.response.data.message}` || "Email ou mot de passe incorrect. Veuillez réessayer.",
            duration: 5000,
        });
      }finally{
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      <Header />
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Section gauche */}
        <motion.div
          className="w-full lg:w-1/2 bg-gradient-to-b from-[#0A2342] to-green-900/50 flex flex-col items-center justify-center px-6 lg:px-12 py-12 text-white relative"
        >
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">
            Complétez Votre Profil Entreprise
          </motion.h1>
          <p className="text-base text-center lg:text-left mb-8 opacity-90 max-w-lg">
            Finalisez votre profil pour accéder à notre plateforme et recruter les meilleurs talents. 
            Ajoutez les informations de votre entreprise pour commencer dès aujourd'hui.
          </p>
          <motion.div
            className="w-full flex justify-center relative"
            animate={{ y: [-5, 5] }}
            transition={{
              y: { repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" },
            }}
          >
            <img
              src={Welcome1}
              alt="Welcome Illustration"
              className="max-w-[80%] h-auto drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Section droite : Formulaire */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full lg:w-1/2 bg-white px-6 lg:px-12 py-8 relative flex flex-col"
        >
          <motion.button
            onClick={handleClose}
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-transform hover:rotate-90"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={28} strokeWidth={2} />
          </motion.button>

          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Informations de l'entreprise
          </h2>

          {/* Champs scrollables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 overflow-y-auto pb-24">
            <InputField id="titre_professionnel" label="Titre Professionnel" formik={formik} icon={Briefcase} />
            <InputField id="email_pro" label="Email Professionnel" formik={formik} icon={User} type="email" />
            <InputField id="telephone_pro" label="Téléphone Professionnel" formik={formik} icon={Phone} />
            <InputField id="nom_entreprise" label="Nom de l'entreprise" formik={formik} icon={Building} />
            <InputField id="site_web" label="Site Web" formik={formik} icon={Globe} />
            <InputField id="adresse" label="Adresse" formik={formik} icon={MapPin} />
            <InputField id="ville" label="Ville" formik={formik} icon={MapPin} />
            <InputField id="pays" label="Pays" formik={formik} icon={Globe} />
            <InputField id="num_contribuable" label="N° de Contribuable (NIU)" formik={formik} icon={Hash} />
            <TextAreaField id="description_entreprise" label="Description de l'entreprise" formik={formik} icon={Info} />
            <FileField id="logo" label="Logo de l'entreprise" formik={formik} helpText="PNG, JPG, GIF jusqu'à 2MB." isRequired={true} />
            <FileField id="image_couverture" label="Image de couverture (Optionnel)" formik={formik} helpText="PNG, JPG, GIF jusqu'à 2MB." />
          </div>

          {/* Bouton fixe en bas */}
          <motion.div
            className="fixed bottom-0 right-0 w-full lg:w-1/2 bg-white border-t px-6 lg:px-12 py-4 shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              type="submit"
              disabled={formik.isSubmitting }
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formik.isSubmitting  ? <ClipLoader size={22} color="#fff" /> : "Enregistrer"}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CompletionEntreprise;
