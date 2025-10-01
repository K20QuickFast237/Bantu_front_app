// components/PageWrapper.jsx
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: 'rgba(255, 255, 255, 1)' }}
      animate={{ opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
