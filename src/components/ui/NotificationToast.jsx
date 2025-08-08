import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const NotificationToast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  isVisible = false 
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500/90',
          borderColor: 'border-green-400',
          iconColor: 'text-green-200'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-500/90',
          borderColor: 'border-red-400',
          iconColor: 'text-red-200'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-yellow-500/90',
          borderColor: 'border-yellow-400',
          iconColor: 'text-yellow-200'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-500/90',
          borderColor: 'border-blue-400',
          iconColor: 'text-blue-200'
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed top-20 right-6 z-50 ${config.bgColor} ${config.borderColor} border backdrop-blur-lg rounded-lg shadow-xl max-w-sm`}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="p-4 flex items-start space-x-3">
            <IconComponent className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <p className="text-white font-medium text-sm leading-relaxed">
                {message}
              </p>
            </div>
            <button
              onClick={() => {
                setShow(false);
                onClose?.();
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className="h-1 bg-white/30 rounded-b-lg overflow-hidden"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;