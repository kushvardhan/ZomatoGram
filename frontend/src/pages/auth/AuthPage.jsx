import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Utensils,
  ShoppingBag
} from 'lucide-react';
import { ZomatoGramLogo1, ZomatoGramLogo2 } from '../../assets/logos';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Select } from '../../components/ui/Dropdown';
import { useToast } from '../../components/ui/Toast';

// Validation schemas
const userSignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const userSignUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const partnerSignUpSchema = z.object({
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

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get mode from URL params (signin/signup) and type (user/partner)
  const mode = searchParams.get('mode') || 'signin'; // signin or signup
  const type = searchParams.get('type') || 'user'; // user or partner
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Determine which schema to use
  const getSchema = () => {
    if (mode === 'signin') return userSignInSchema;
    if (type === 'user') return userSignUpSchema;
    return partnerSignUpSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'signin') {
        toast.success(`Welcome back! ${type === 'partner' ? 'Redirecting to dashboard...' : 'You have been signed in successfully.'}`);
        navigate(type === 'partner' ? '/partner' : '/');
      } else {
        toast.success(`Account created successfully! ${type === 'partner' ? 'We will review your application.' : 'Welcome to ZomatoGram.'}`);
        navigate(type === 'partner' ? '/signin-partner' : '/');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode) => {
    const params = new URLSearchParams(searchParams);
    params.set('mode', newMode);
    navigate(`/auth?${params.toString()}`);
    reset();
  };

  const switchType = (newType) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', newType);
    navigate(`/auth?${params.toString()}`);
    reset();
  };

  const getTitle = () => {
    if (mode === 'signin') {
      return type === 'partner' ? 'Partner Sign In' : 'Welcome Back';
    }
    return type === 'partner' ? 'Become a Partner' : 'Join ZomatoGram';
  };

  const getSubtitle = () => {
    if (mode === 'signin') {
      return type === 'partner' ? 'Access your restaurant dashboard' : 'Sign in to your account';
    }
    return type === 'partner' ? 'Start your restaurant journey' : 'Create your account today';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <motion.div
          className="hidden lg:block space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {type === 'partner' ? (
                <ZomatoGramLogo2 className="w-12 h-12 text-primary-500" animate={true} />
              ) : (
                <ZomatoGramLogo1 className="w-12 h-12 text-primary-500" animate={true} />
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  ZomatoGram
                </h1>
                {type === 'partner' && (
                  <p className="text-sm text-primary-500 font-medium">Partner Portal</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                {mode === 'signin' ? (
                  type === 'partner' ? (
                    <>Manage your restaurant with <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">ease</span></>
                  ) : (
                    <>Welcome back to your <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">food journey</span></>
                  )
                ) : (
                  type === 'partner' ? (
                    <>Grow your business with <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">ZomatoGram</span></>
                  ) : (
                    <>Start your culinary <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">adventure</span></>
                  )
                )}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {type === 'partner' 
                  ? 'Join thousands of restaurants and reach more customers with our platform.'
                  : 'Discover amazing restaurants, order your favorite meals, and enjoy fast delivery.'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="text-center p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  {type === 'partner' ? (
                    <Store className="w-6 h-6 text-white" />
                  ) : (
                    <Utensils className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="text-2xl font-bold text-primary-500">
                  {type === 'partner' ? '10K+' : '50K+'}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {type === 'partner' ? 'Partners' : 'Happy Users'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-accent-500">1M+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Orders</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-neutral-700/50">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              {type === 'partner' ? (
                <ZomatoGramLogo2 className="w-12 h-12 text-primary-500" animate={true} />
              ) : (
                <ZomatoGramLogo1 className="w-12 h-12 text-primary-500" animate={true} />
              )}
            </div>

            {/* Type Switcher */}
            <div className="flex bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1 mb-6">
              <button
                onClick={() => switchType('user')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  type === 'user'
                    ? 'bg-white dark:bg-neutral-600 text-primary-600 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer</span>
              </button>
              <button
                onClick={() => switchType('partner')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  type === 'partner'
                    ? 'bg-white dark:bg-neutral-600 text-primary-600 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Partner</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {getTitle()}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {getSubtitle()}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={`${mode}-${type}`}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Sign Up Fields */}
                  {mode === 'signup' && (
                    <>
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        leftIcon={<User className="w-4 h-4" />}
                        error={errors.fullName?.message}
                        {...register('fullName')}
                      />

                      {type === 'partner' && (
                        <Input
                          label="Restaurant Name"
                          type="text"
                          placeholder="Enter your restaurant name"
                          leftIcon={<Store className="w-4 h-4" />}
                          error={errors.restaurantName?.message}
                          {...register('restaurantName')}
                        />
                      )}

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        leftIcon={<Phone className="w-4 h-4" />}
                        error={errors.phone?.message}
                        {...register('phone')}
                      />

                      {type === 'partner' && (
                        <>
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
                              error={errors.cuisineType?.message}
                              {...register('cuisineType')}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Common Fields */}
                  <Input
                    label="Email"
                    type="email"
                    placeholder={`Enter your ${type === 'partner' ? 'business ' : ''}email`}
                    leftIcon={<Mail className="w-4 h-4" />}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
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

                  {mode === 'signup' && (
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
                  )}

                  {mode === 'signin' && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                          Remember me
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  {mode === 'signup' && (
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                        required
                      />
                      <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary-500 hover:text-primary-600 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary-500 hover:text-primary-600 font-medium">
                          Privacy Policy
                        </Link>
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    loading={isLoading}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {mode === 'signin' 
                      ? (type === 'partner' ? 'Access Dashboard' : 'Sign In')
                      : (type === 'partner' ? 'Submit Application' : 'Create Account')
                    }
                  </Button>
                </motion.form>
              </AnimatePresence>

              <div className="text-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button
                    onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
