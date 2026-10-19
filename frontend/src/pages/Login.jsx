import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useFormValidation } from '../hooks/useFormValidation';
import useAuthStore from '../store/useAuthStore';
import Button from '../components/Button';
import Input from '../components/Input';

const loginSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useFormValidation(loginSchema);

  const onSubmit = async (data) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa email dan password Anda.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login Admin</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" required type="email" {...register('email')} placeholder="admin@example.com" error={errors.email} />
          <Input label="Password" required type="password" {...register('password')} placeholder="Masukkan password..." error={errors.password} />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
