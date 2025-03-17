import { motion } from 'framer-motion';

const SobreLojaLayout = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
};

export default SobreLojaLayout;
