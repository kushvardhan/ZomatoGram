import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, Store, TrendingUp, Users } from 'lucide-react';
import { ZomatoGramLogo3 } from '../../assets/logos';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const PartnerSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Welcome back! Redirecting to your dashboard...');
      navigate('/partner');
    } catch (error) {
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
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
              <ZomatoGramLogo3 className="w-12 h-12 text-primary-600" animate={true} />
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  ZomatoGram
                </h1>
                <p className="text-sm text-primary-600 font-medium">Partner Portal</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                Grow your business with
                <span className="text-gradient block">ZomatoGram</span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Access your partner dashboard to manage orders, update your menu, 
                track analytics, and grow your restaurant business.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Easy Management</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Streamlined order and menu management</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Boost Revenue</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Increase sales with our platform</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Reach More Customers</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Connect with thousands of food lovers</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="text-center">
                <ZomatoGramLogo3 className="w-12 h-12 text-primary-600 mx-auto mb-2" animate={true} />
                <p className="text-sm text-primary-600 font-medium">Partner Portal</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Partner Sign In
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Access your restaurant dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your business email"
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/partner/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Access Dashboard
                </Button>
              </form>

              <div className="text-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  New to ZomatoGram?{' '}
                  <Link
                    to="/signup-partner"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Become a Partner
                  </Link>
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  Looking to order food?
                </p>
                <Link to="/signin-user">
                  <Button variant="outline" className="w-full">
                    Customer Sign In
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
      </div>
    </div>
  );
};

export default PartnerSignIn;
