import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, AtSign, Lock, User, ArrowRight } from 'lucide-react';

const AuthPage = ({ onAuthSuccess }) => {
  const { login, signup, requestPasswordReset, resetPassword } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetStage, setResetStage] = useState('request');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      if (mode === 'login') {
        await login(email, password);
        onAuthSuccess();
        return;
      }

      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name.');
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords must match.');
          return;
        }
        await signup(name, email, password);
        onAuthSuccess();
        return;
      }

      if (mode === 'forgot') {
        if (resetStage === 'request') {
          await requestPasswordReset(email);
          setMessage('A password reset link was sent to your email (simulated).');
          setResetStage('reset');
          return;
        }

        if (resetStage === 'reset') {
          if (password !== confirmPassword) {
            setError('Passwords must match.');
            return;
          }
          await resetPassword(email, password);
          setMessage('Password updated. You can now log in.');
          setMode('login');
          setResetStage('request');
          setPassword('');
          setConfirmPassword('');
          return;
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[28px] border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 px-8 py-6 text-center text-white">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">LeadFlow Access</h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {mode === 'login' && 'Sign in to manage leads, audits, campaigns, and your workspace.'}
            {mode === 'signup' && 'Create your LeadFlow account and start tracking B2B opportunities.'}
            {mode === 'forgot' && resetStage === 'request' && 'Enter your email to receive a password reset link.'}
            {mode === 'forgot' && resetStage === 'reset' && 'Set a new password for your account.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
          {error && <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-xs text-error">{error}</div>}
          {message && <div className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-xs text-success-dark">{message}</div>}

          {mode === 'signup' && (
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Full Name
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-transparent outline-none text-sm text-slate-800"
                />
              </div>
            </label>
          )}

          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Email address
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
              <AtSign className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@leadflow.io"
                className="w-full bg-transparent outline-none text-sm text-slate-800"
              />
            </div>
          </label>

          {mode !== 'forgot' && (
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Password
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none text-sm text-slate-800"
                />
              </div>
            </label>
          )}

          {mode !== 'login' && mode !== 'forgot' && (
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Confirm password
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full bg-transparent outline-none text-sm text-slate-800"
                />
              </div>
            </label>
          )}

          {mode === 'forgot' && resetStage === 'reset' && (
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Confirm new password
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-transparent outline-none text-sm text-slate-800"
                />
              </div>
            </label>
          )}

          <button className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-dark">
            {mode === 'login' && 'Sign in'}
            {mode === 'signup' && 'Create account'}
            {mode === 'forgot' && (resetStage === 'request' ? 'Send reset link' : 'Update password')}
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            {mode !== 'login' ? (
              <button type="button" onClick={() => { setMode('login'); setResetStage('request'); setError(''); setMessage(''); }} className="font-semibold text-brand hover:underline">
                Back to login
              </button>
            ) : (
              <button type="button" onClick={() => { setMode('forgot'); setResetStage('request'); setError(''); setMessage(''); }} className="font-semibold text-brand hover:underline">
                Forgot password?
              </button>
            )}
            <button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setResetStage('request'); setError(''); setMessage(''); }} className="font-semibold text-brand hover:underline">
              {mode === 'signup' ? 'Already have an account?' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
