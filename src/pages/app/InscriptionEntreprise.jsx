import React from "react";
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
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try{
        const response = await api.post('/profile/professionnel', values);
        console.log(response.data);
        toast.success("Profil complete avec success !", {
            duration: 3000,
        });
        resetForm();
        navigate("/dashboardEntreprise");
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
