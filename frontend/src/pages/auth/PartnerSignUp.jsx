import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Store, 
  MapPin,
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { ZomatoGramLogo4 } from '../../assets/logos';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Select } from '../../components/ui/Dropdown';
import { useToast } from '../../components/ui/Toast';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  restaurantName: z.string().min(2, 'Restaurant name must be at least 2 characters'),
  address: z.string().min(10, 'Please enter a complete address'),
  cuisineType: z.string().min(1, 'Please select a cuisine type'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const cuisineOptions = [
  { value: 'indian', label: 'Indian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'italian', label: 'Italian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'thai', label: 'Thai' },
  { value: 'american', label: 'American' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'japanese', label: 'Japanese' },
];

const PartnerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Partnership application submitted! We will review and get back to you soon.');
      navigate('/signin-partner');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Sign Up Form */}
        <motion.div
          className="w-full max-w-lg mx-auto order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="text-center">
                <ZomatoGramLogo4 className="w-12 h-12 text-primary-600 mx-auto mb-2" animate={true} />
                <p className="text-sm text-primary-600 font-medium">Partner Registration</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Become a Partner
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Join thousands of restaurants on our platform
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Personal Information
                  </h3>
                  
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    leftIcon={<User className="w-4 h-4" />}
                    error={errors.fullName?.message}
                    {...register('fullName')}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your business email"
                    leftIcon={<Mail className="w-4 h-4" />}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    leftIcon={<Phone className="w-4 h-4" />}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                {/* Restaurant Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Restaurant Information
                  </h3>
                  
                  <Input
                    label="Restaurant Name"
                    type="text"
                    placeholder="Enter your restaurant name"
                    leftIcon={<Store className="w-4 h-4" />}
                    error={errors.restaurantName?.message}
                    {...register('restaurantName')}
                  />

                  <Input
                    label="Restaurant Address"
                    type="text"
                    placeholder="Enter complete address"
                    leftIcon={<MapPin className="w-4 h-4" />}
                    error={errors.address?.message}
                    {...register('address')}
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Cuisine Type
                    </label>
                    <Select
                      options={cuisineOptions}
                      placeholder="Select cuisine type"
                      onChange={(value) => setSelectedCuisine(value)}
                      error={errors.cuisineType?.message}
                      {...register('cuisineType')}
                    />
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Security
                  </h3>
                  
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    error={errors.password?.message}
                    {...register('password')}
                  />

                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                    I agree to the{' '}
                    <Link to="/partner-terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      Partner Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Submit Application
                </Button>
              </form>

              <div className="text-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Already a partner?{' '}
                  <Link
                    to="/signin-partner"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Benefits */}
        <motion.div
          className="hidden lg:block space-y-8 order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <ZomatoGramLogo4 className="w-12 h-12 text-primary-600" animate={true} />
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  ZomatoGram
                </h1>
                <p className="text-sm text-primary-600 font-medium">Partner Program</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                Grow your restaurant with
                <span className="text-gradient block">our platform</span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Join our network of successful restaurant partners and reach thousands 
                of hungry customers in your area.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Easy Setup</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Get started in minutes with our simple onboarding process</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Quick Approval</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Most applications are reviewed within 24-48 hours</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Secure Payments</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Fast and secure payment processing with weekly payouts</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-primary-100 mb-4">
                Join over 10,000+ restaurants already growing their business with us.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span>✓ No setup fees</span>
                <span>✓ 24/7 support</span>
                <span>✓ Marketing tools</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerSignUp;
