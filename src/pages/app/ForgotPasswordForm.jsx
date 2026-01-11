import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/public/Header';
import PageWrapper from '../../components/public/PageWrapper';
import { sendPasswordResetLink } from '../../services/auth';
import { validationForgotPasswordSchema } from '../../schemas';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (values, actions) => {
    try {
      await sendPasswordResetLink(values.email);
      console.log(values.email);
      navigate('/forgotpasswordconfirmation', { state: { email: values.email } });
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur inconnue');
      // Optionnel : afficher une erreur globale au formulaire
      actions.setFieldError('email', err.response?.data?.message || 'Une erreur est survenue.');
    } 
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationForgotPasswordSchema,
    onSubmit,
  });

  return (
    <>
      <PageWrapper>
        <Header />
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-2xl space-y-6">
              {/* Titre */}
              <h2 className="text-center text-[#10B981] font-semibold text-lg md:text-xl">
                {t('pages.forgotPassword.title')}
              </h2>

              {/* Texte d'information */}
              <p className="text-center text-gray-800 text-sm">
                {t('pages.forgotPassword.info')}
              </p>

              <hr className="border-t border-gray-300" />

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ email style image */}
                <div className="bg-gray-200 p-2 rounded-md">
                  <div className="flex items-center gap-2">
                      <label htmlFor="email" className="text-sm text-gray-800 whitespace-nowrap pl-2">
                        {t('pages.forgotPassword.emailLabel')}
                      </label>
                      <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={"flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" + (errors.email && touched.email ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')}
                      />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1 pl-2">{errors.email}</p>
                  )}
                </div>

                {/* Bouton */}
                <div className="flex justify-center">
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#F26C21] hover:bg-orange-600 text-white font-semibold py-2.5 px-8 rounded-md transition-colors duration-300 disabled:bg-gray-400"
                    >
                    {t('pages.forgotPassword.continue')}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
        {/* <Footer /> */}
      </PageWrapper>
    </>
  )};

export default ForgotPasswordForm;
