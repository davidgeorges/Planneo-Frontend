import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Chrome,
  Smartphone,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    console.log('Login data:', formData);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Bon retour
            </h1>
            <p className="text-gray-500 font-light">
              Connectez-vous à votre compte Planneo
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="p-8">
              {/* Connexion sociale */}
              <div className="space-y-3 mb-8">
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                  onClick={() => handleSocialLogin('google')}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  Continuer avec Google
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                    onClick={() => handleSocialLogin('apple')}
                  >
                    <Smartphone className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                    onClick={() => handleSocialLogin('facebook')}
                  >
                    <Users className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="relative mb-8">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-400 font-light">
                    ou avec votre email
                  </span>
                </div>
              </div>

              {/* Formulaire de connexion */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base font-light text-gray-700 mb-3 block">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre.email@example.com"
                      className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-base font-light text-gray-700 mb-3 block">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Votre mot de passe"
                      className="pl-12 pr-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="ml-2 text-sm text-gray-600 font-light">Se souvenir de moi</span>
                  </label>
                  
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-gray-600 hover:text-gray-900 font-light"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
                  disabled={!formData.email || !formData.password}
                >
                  Se connecter
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 font-light">
                  Pas encore de compte ?{' '}
                  <Link 
                    to="/signup" 
                    className="text-gray-900 hover:underline font-medium"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 font-light">
              En vous connectant, vous acceptez nos{' '}
              <Link to="/terms" className="hover:text-gray-600">
                conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link to="/privacy" className="hover:text-gray-600">
                politique de confidentialité
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}