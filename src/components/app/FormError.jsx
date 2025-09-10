 import React from 'react';
 
 const FormError = ({ children }) => {
   if (!children) return null;
   return <p className="text-red-500 text-xs mt-1">{children}</p>;
 };
 
 export default FormError;