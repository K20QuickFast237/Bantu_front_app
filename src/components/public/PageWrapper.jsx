// components/PageWrapper.jsx
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: '#ffffff' }}
      animate={{ opacity: 1, backgroundColor: 'transparent' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
