import React from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import { validationRegisterSchema } from '@/schemas';
import { ClipLoader } from 'react-spinners';
import api from '@/services/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function RegisterForm({ onSuccess, textColor = 'black' }) {
  const { t } = useTranslation();
  const isWhite = textColor === 'white';

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post('/register', values);
      toast.success(t('register.success') || "Inscription réussie !", {
        description: t('register.successDesc') || "Un code de verification vous a ete envoye par mail, verifier votre boite courriel",
        duration: 3000,
      });

      actions.resetForm();
      if (typeof onSuccess === 'function') {
        onSuccess(values, response.data);
      }
    } catch (err) {
      toast.error(t('register.error') || "Erreur lors de l'inscription", {
        description: `${err.response?.data?.message}` || t('register.errorDesc') || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        duration: 5000,
      });
    }
  };

  const { values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit } = useFormik({
    initialValues: { nom: '', email: '', password: '', password_confirmation: '' },
    validationSchema: validationRegisterSchema,
    onSubmit,
  });

  return (
    <div className={isWhite ? 'text-white' : ''}>
      <h2 className={`text-3xl font-extrabold mb-6 ${isWhite ? 'text-white' : 'text-gray-900'}`}>{t('register.title')}</h2>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete="off">
        <div>
          <label htmlFor="nom" className={`block text-sm font-medium ${isWhite ? 'text-white/80' : 'text-gray-700'}`}>{t('register.name')}</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
            </div>
            <input
              id="nom"
              name="nom"
              value={values.nom}
              onChange={handleChange}
              type="text"
              autoComplete="family-name"
              required
              className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.nom && touched.nom ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('register.namePlaceholder') || "Entrez votre nom"}
              onBlur={handleBlur}
            />
          </div>
          {errors.nom && touched.nom && <div className="text-red-500">{errors.nom}</div>}
        </div>

        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${isWhite ? 'text-white/80' : 'text-gray-700'}`}>{t('register.email')}</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              required
              className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('register.emailPlaceholder') || "Entrez votre adresse email"}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium ${isWhite ? 'text-white/80' : 'text-gray-700'}`}>{t('register.password')}</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              autoComplete="new-password"
              required
              className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('register.passwordPlaceholder') || "Entrez votre mot de passe"}
              onBlur={handleBlur}
            />
          </div>
          {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
        </div>

        <div>
          <label htmlFor="password_confirmation" className={`block text-sm font-medium ${isWhite ? 'text-white/80' : 'text-gray-700'}`}>{t('register.confirmPassword')}</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="password_confirmation"
              name="password_confirmation"
              value={values.password_confirmation}
              onChange={handleChange}
              type="password"
              autoComplete="new-password"
              required
              className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.password_confirmation && touched.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('register.confirmPasswordPlaceholder') || "Confirmez votre mot de passe"}
              onBlur={handleBlur}
            />
          </div>
          {errors.password_confirmation && touched.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            {isSubmitting ? <ClipLoader size={22} color="#fff" /> : t('register.register')}
          </button>
        </div>
      </form>
    </div>
  );
}
