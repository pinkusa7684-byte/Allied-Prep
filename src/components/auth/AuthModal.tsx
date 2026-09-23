import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { CourseId, AuthUser, UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
  registeredUsers: AuthUser[];
  onRegisterUser: (newUser: AuthUser) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  registeredUsers,
  onRegisterUser,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Login form state
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCourse, setSignupCourse] = useState<CourseId>('BPT');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!isOpen) return null;

  // Clean mobile input (digits only)
  const sanitizeMobile = (val: string) => {
    return val.replace(/\D/g, '').slice(0, 10);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const cleanNumber = sanitizeMobile(loginMobile);
    if (cleanNumber.length !== 10) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!loginPassword.trim()) {
      setLoginError('Please enter your candidate password.');
      return;
    }

    // Match against registered users or allow default test login
    const foundUser = registeredUsers.find(
      (u) => sanitizeMobile(u.mobileNumber) === cleanNumber
    );

    if (!foundUser) {
      // Auto-authenticate as candidate with entered mobile
      const dynamicUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: `Candidate ${cleanNumber.slice(-4)}`,
        mobileNumber: cleanNumber,
        email: `candidate.${cleanNumber.slice(-4)}@alliedprep.edu`,
        course: 'BPT',
        registeredAt: new Date().toISOString(),
      };
      onRegisterUser(dynamicUser);
      onAuthSuccess(dynamicUser);
      onClose();
      return;
    }

    if (foundUser.password && foundUser.password !== loginPassword) {
      setLoginError('Incorrect password. Please verify your credentials or use Demo Login.');
      return;
    }

    onAuthSuccess(foundUser);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!signupName.trim()) {
      setSignupError('Please provide your full legal name.');
      return;
    }

    const cleanNumber = sanitizeMobile(signupMobile);
    if (cleanNumber.length !== 10) {
      setSignupError('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setSignupError('Please provide a valid academic/personal email ID.');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Password and Confirm Password do not match.');
      return;
    }

    // Check if mobile already exists
    const existing = registeredUsers.find(
      (u) => sanitizeMobile(u.mobileNumber) === cleanNumber
    );
    if (existing) {
      setSignupError('This mobile number is already registered. Please proceed to Candidate Login.');
      return;
    }

    const newUser: AuthUser = {
      id: `candidate-${Date.now()}`,
      name: signupName.trim(),
      mobileNumber: cleanNumber,
      email: signupEmail.trim(),
      course: signupCourse,
      password: signupPassword,
      registeredAt: new Date().toISOString(),
    };

    onRegisterUser(newUser);
    setSignupSuccess(true);

    setTimeout(() => {
      onAuthSuccess(newUser);
      onClose();
    }, 1200);
  };

  const handleDemoCandidateLogin = () => {
    const demoUser = registeredUsers[0] || {
      id: 'user-default-1',
      name: 'Aditya Sharma',
      mobileNumber: '9876543210',
      email: 'aditya.sharma@alliedprep.edu',
      course: 'BPT' as CourseId,
      registeredAt: '2026-09-01T10:00:00.000Z',
    };
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleIn relative my-auto">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                Allied Prep
              </span>
              <p className="text-[11px] text-slate-300">UG & PG Health Sciences</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            {mode === 'login' ? 'Candidate Login' : 'Candidate Registration'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login'
              ? 'Access your mock test scorecards, question banks, and learning profile.'
              : 'Create your academic profile to track progress across clinical disciplines.'}
          </p>

          {/* Navigation Pill Switches */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-4 border border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLoginError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Candidate Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setSignupError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              New Registration
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' ? (
            /* =================== CANDIDATE LOGIN =================== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Registered Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1.5 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(sanitizeMobile(e.target.value))}
                    placeholder="98765 43210"
                    maxLength={10}
                    required
                    className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-mono tracking-wide"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Enter the 10-digit mobile number linked to your candidate account.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      alert('For testing: default candidate password is "password123". You can also tap Demo Candidate Login below.');
                    }}
                    className="text-[11px] font-semibold text-blue-900 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter candidate password"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="candidate-login-btn"
                className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Candidate Login</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Demo Quick Login */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDemoCandidateLogin}
                  className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Quick Demo Candidate Login (Aditya Sharma)</span>
                </button>
              </div>

              {/* Switch to Signup Footer */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  New candidate?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setSignupError(null);
                    }}
                    className="font-bold text-blue-900 hover:underline"
                  >
                    Create Account / Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* =================== CANDIDATE SIGN UP =================== */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {signupSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Registration Successful!</h4>
                  <p className="text-xs text-emerald-700">
                    Welcome to Allied Prep. Initializing candidate dashboard...
                  </p>
                </div>
              ) : (
                <>
                  {signupError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{signupError}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Candidate Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Dr. Priya Patel / Aditya Sharma"
                        required
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        value={signupMobile}
                        onChange={(e) => setSignupMobile(sanitizeMobile(e.target.value))}
                        placeholder="98765 43210"
                        maxLength={10}
                        required
                        className="w-full pl-20 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Email ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="student@alliedprep.edu"
                        required
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                      />
                    </div>
                  </div>

                  {/* Course / Program */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Discipline / Course <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <select
                        value={signupCourse}
                        onChange={(e) => setSignupCourse(e.target.value as CourseId)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                      >
                        <option value="BPT">BPT – Bachelor of Physiotherapy (UG)</option>
                        <option value="BOT">BOT – Bachelor of Occupational Therapy (UG)</option>
                        <option value="BPO">BPO – Bachelor of Prosthetics & Orthotics (UG)</option>
                        <option value="BASLP">BASLP – Bachelor of Audiology & Speech-Language Pathology (UG)</option>
                        <option value="MPT">MPT – Master of Physiotherapy (PG)</option>
                        <option value="MOT">MOT – Master of Occupational Therapy (PG)</option>
                        <option value="MPO">MPO – Master of Prosthetics & Orthotics (PG)</option>
                      </select>
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min 6 chars"
                          required
                          className="w-full px-3 pr-8 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showSignupConfirmPassword ? 'text' : 'password'}
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="Re-enter"
                          required
                          className="w-full px-3 pr-8 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showSignupConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    id="candidate-signup-btn"
                    className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 transition-all mt-2 group"
                  >
                    <span>Sign Up & Create Candidate Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Switch to Login Footer */}
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setLoginError(null);
                        }}
                        className="font-bold text-blue-900 hover:underline"
                      >
                        Candidate Login
                      </button>
                    </p>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
