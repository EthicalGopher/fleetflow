import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import { FaGoogle, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
      outline: "border border-white text-white hover:bg-white/10",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-2 uppercase tracking-wider cursor-pointer",
          variants[variant] && variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-full border border-transparent bg-gray-100 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

const Select = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          className={cn(
            "flex h-12 w-full rounded-full border border-transparent bg-gray-100 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
            icon ? "pl-10" : "",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";

// SocialIcons Component
function SocialIcons() {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <FaGoogle />
      </a>
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <FaFacebookF />
      </a>
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-blue-400 hover:bg-blue-50 transition-colors"
      >
        <FaTwitter />
      </a>
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-blue-700 hover:bg-blue-50 transition-colors"
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
}

// --- Main App Component ---

const SigninandSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Dispatcher');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!isSignUp) {
        // Login Logic
        const data = await api.post('/auth/login', { email, password });
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          redirectBasedOnRole(data.user.role);
        } else {
          setError(data.error || 'Login failed');
        }
      } else {
        // Register Logic
        const data = await api.post('/auth/register', { 
          email, 
          password, 
          full_name: fullName, 
          role, 
          avatar: '' 
        });
        if (data.message === 'Registration successful') {
          setIsSignUp(false);
          alert('Registration successful! Please login.');
        } else {
          setError(data.error || 'Registration failed');
        }
      }
    } catch {
      setError('An error occurred');
    }
  };

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'Dispatcher':
        navigate('/dispatcher');
        break;
      case 'FinancialAnalyst':
        navigate('/financial-analyst');
        break;
      case 'FleetManager':
        navigate('/fleet-manager');
        break;
      case 'SafetyOfficer':
        navigate('/safety-officer');
        break;
      default:
        navigate('/');
    }
  };

  const textVariants = {
    hidden: (isSignUp: boolean) => ({
      x: isSignUp ? 20 : -20,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
    exit: (isSignUp: boolean) => ({
      x: isSignUp ? -20 : 20,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 font-sans">
      <div className="relative w-full max-w-[900px] h-[650px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex">
        
        {/* Sign Up Form (Left Side) - Visible when isSignUp is true */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-12 bg-white transition-all duration-[1200ms] ease-in-out ${
            isSignUp ? "opacity-100 translate-x-0 z-20" : "opacity-0 translate-x-full z-10 pointer-events-none"
          }`}
        >
          <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign up</h1>
            <div className="w-full space-y-3">
              <Input
                type="text"
                placeholder="Full Name"
                icon={<User className="w-5 h-5" />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
              />
              <Input
                type="email"
                placeholder="Email"
                icon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Select
                icon={<Briefcase className="w-5 h-5" />}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required={isSignUp}
              >
                <option value="Dispatcher">Dispatcher</option>
                <option value="FinancialAnalyst">Financial Analyst</option>
                <option value="FleetManager">Fleet Manager</option>
                <option value="SafetyOfficer">Safety Officer</option>
              </Select>
            </div>
            
            {error && isSignUp && <p className="text-red-500 text-xs text-center">{error}</p>}

            <Button type="submit" className="w-40 mt-4 bg-blue-600 hover:bg-blue-700">
              SIGN UP
            </Button>
          </form>
        </div>

        {/* Sign In Form (Right Side) - Visible when !isSignUp */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center p-12 bg-white transition-all duration-[1200ms] ease-in-out ${
            !isSignUp ? "opacity-100 translate-x-0 z-20" : "opacity-0 -translate-x-full z-10 pointer-events-none"
          }`}
        >
          <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign in</h1>
            <div className="w-full space-y-4">
              <Input
                type="email"
                placeholder="Email"
                icon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && !isSignUp && <p className="text-red-500 text-xs text-center">{error}</p>}

            <Button type="submit" className="w-40 mt-6 bg-blue-600 hover:bg-blue-700">
              LOGIN
            </Button>

          </form>
        </div>

        {/* Overlay Container */}
        <motion.div
          className="absolute top-0 h-full z-50 overflow-hidden pointer-events-none"
          initial={false}
          animate={{
            left: isSignUp ? ["0%", "0%", "50%"] : ["50%", "0%", "0%"],
            width: ["50%", "100%", "50%"],
            borderTopRightRadius: isSignUp ? ["100px", "100px", "0px"] : ["0px", "0px", "100px"],
            borderBottomRightRadius: isSignUp ? ["100px", "100px", "0px"] : ["0px", "0px", "100px"],
            borderTopLeftRadius: isSignUp ? ["0px", "0px", "100px"] : ["100px", "100px", "0px"],
            borderBottomLeftRadius: isSignUp ? ["0px", "0px", "100px"] : ["100px", "100px", "0px"],
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 relative flex items-center justify-center text-white">
            <AnimatePresence mode="wait" custom={isSignUp}>
              {!isSignUp ? (
                <motion.div
                  key="signin-overlay"
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={textVariants}
                  custom={isSignUp}
                >
                  <h1 className="text-3xl font-bold mb-4">New here?</h1>
                  <p className="mb-8 text-lg text-blue-100">
                    Join us today and discover a world of possibilities. Create your
                    account in seconds!
                  </p>
                  <Button
                    variant="outline"
                    className="w-40 border-2 font-semibold pointer-events-auto"
                    onClick={() => setIsSignUp(true)}
                  >
                    SIGN UP
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="signup-overlay"
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={textVariants}
                  custom={isSignUp}
                >
                  <h1 className="text-3xl font-bold mb-4">One of us?</h1>
                  <p className="mb-8 text-lg text-blue-100">
                    Welcome back! Sign in to continue your journey with us.
                  </p>
                  <Button
                    variant="outline"
                    className="w-40 border-2 font-semibold pointer-events-auto"
                    onClick={() => setIsSignUp(false)}
                  >
                    SIGN IN
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninandSignup;
