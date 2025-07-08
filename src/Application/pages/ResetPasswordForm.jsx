import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';
import { resetPassword } from '../../auth';
import { validationResetPasswordSchema } from '../../schemas';

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    token: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      token: searchParams.get('token') || '',
      email: searchParams.get('email') || '',
    }));
  }, [searchParams]);

  const onSubmit = async (values) => {
    try {
      await resetPassword(values);
      console.log(values);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    }
  };

  const {values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: form,
    validationSchema: validationResetPasswordSchema,
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
                Réinitialisation du mot de passe
              </h2>

              {/* Texte d'information */}
              <p className="text-center text-gray-800 text-sm">
                Merci de saisir votre nouveau mot de passe.
              </p>

              <hr className="border-t border-gray-300" />

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nouveau mot de passe */}
                <div className="bg-gray-200 p-2 space-y-2 rounded-md">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className="text-sm text-gray-800 whitespace-nowrap pl-2">
                      Nouveau mot de passe :
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      required
                      className={"flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"+ (errors.password && touched.password ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>

                {/* Bouton */}
                <div className="flex justify-center">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-[#F26C21] hover:bg-orange-600 text-white font-semibold py-2.5 px-8 rounded-md transition-colors duration-300"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default ResetPasswordForm;
