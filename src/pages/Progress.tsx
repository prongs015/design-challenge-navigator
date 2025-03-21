
import { Link } from 'react-router-dom';
import ProgressTracker from '@/components/ProgressTracker';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChartLine, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Progress = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-12"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 group"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <span className="gradient-text">My Progress</span>
          <ChartLine className="ml-2 text-gradient-start" size={24} />
        </h1>
        <p className="text-gray-600">
          Track your journey and review your completed challenges.
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ProgressTracker />
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        className="mt-12 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 shadow-soft"
      >
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-gradient-start to-gradient-end p-3 rounded-full text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Design Journey</h3>
            <p className="text-gray-600 mb-4">
              Every challenge you complete builds your design expertise. Keep practicing to see your skills grow!
            </p>
            <Button 
              variant="gradient-blue" 
              rounded="full" 
              size="sm" 
              asChild
            >
              <Link to="/companies">
                <span>Find New Challenges</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Progress;
