import React from 'react';
import { useTranslation } from 'react-i18next';

const FormError = ({ children }) => {
  const { t } = useTranslation();
  if (!children) return null;
  return <p className="text-red-500 text-xs mt-1">{children}</p>; // children est typiquement une erreur dynamique ; si statique, utilisez t('formError.message')
};

export default FormError;