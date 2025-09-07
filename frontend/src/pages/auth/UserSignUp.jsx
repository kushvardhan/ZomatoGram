import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { ZomatoGramLogo2 } from '../../assets/logos';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const UserSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      
      toast.success('Account created successfully! Welcome to ZomatoGram.');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Sign Up Form */}
        <motion.div
          className="w-full max-w-md mx-auto order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <ZomatoGramLogo2 className="w-12 h-12 text-primary-600" animate={true} />
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Create your account
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Join thousands of food lovers today!
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="Enter your email"
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

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
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
                  Create Account
                </Button>
              </form>

              <div className="text-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Already have an account?{' '}
                  <Link
                    to="/signin-user"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  Want to partner with us?
                </p>
                <Link to="/signup-partner">
                  <Button variant="outline" className="w-full">
                    Become a Partner
                  </Button>
                </Link>
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

        {/* Right Side - Branding */}
        <motion.div
          className="hidden lg:block space-y-8 order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <ZomatoGramLogo2 className="w-12 h-12 text-primary-600" animate={true} />
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                ZomatoGram
              </h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                Start your
                <span className="text-gradient block">culinary adventure</span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Join our community of food enthusiasts and discover amazing restaurants, 
                exclusive deals, and personalized recommendations just for you.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-lg">🍕</span>
                </div>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">Fast Delivery</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Get your food in 30 minutes</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-accent-600 text-lg">💰</span>
                </div>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">Best Prices</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Exclusive deals and discounts</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignUp;
