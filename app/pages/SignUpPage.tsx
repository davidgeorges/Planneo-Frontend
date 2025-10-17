import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Phone,
  ArrowRight,
  Chrome,
  Smartphone,
  Users,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (!formData.acceptTerms) {
      alert('Vous devez accepter les conditions d\'utilisation');
      return;
    }
    
    // Simulation d'inscription
    console.log('Signup data:', formData);
    navigate('/dashboard');
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    navigate('/dashboard');
  };

  const isFormValid = 
    formData.firstName && 
    formData.lastName && 
    formData.email && 
    formData.password && 
    formData.confirmPassword && 
    formData.acceptTerms &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Rejoignez Planneo
            </h1>
            <p className="text-gray-500 font-light">
              Créez votre compte et simplifiez vos réservations
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="p-8">
              {/* Inscription sociale */}
              <div className="space-y-3 mb-8">
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                  onClick={() => handleSocialSignup('google')}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  Continuer avec Google
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                    onClick={() => handleSocialSignup('apple')}
                  >
                    <Smartphone className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 rounded-full font-light hover:bg-gray-50"
                    onClick={() => handleSocialSignup('facebook')}
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

              {/* Formulaire d'inscription */}
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-light text-gray-700 mb-3 block">
                      Prénom
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Prénom"
                        className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-base font-light text-gray-700 mb-3 block">
                      Nom
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Nom"
                      className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="phone" className="text-base font-light text-gray-700 mb-3 block">
                    Téléphone (optionnel)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                      className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
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
                      placeholder="Créez un mot de passe"
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
                  <p className="text-xs text-gray-500 mt-2 font-light">
                    Au moins 8 caractères avec majuscules, minuscules et chiffres
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-base font-light text-gray-700 mb-3 block">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirmez votre mot de passe"
                      className="pl-12 pr-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-2 font-light">
                      Les mots de passe ne correspondent pas
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 mt-1"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-600 font-light">
                      J'accepte les{' '}
                      <Link to="/terms" className="text-gray-900 hover:underline">
                        conditions d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link to="/privacy" className="text-gray-900 hover:underline">
                        politique de confidentialité
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="ml-3 text-sm text-gray-600 font-light">
                      Je souhaite recevoir les offres et actualités par email
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
                  disabled={!isFormValid}
                >
                  Créer mon compte
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 font-light">
                  Déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="text-gray-900 hover:underline font-medium"
                  >
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Avantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-light text-gray-900 mb-4 text-center">
                  Pourquoi rejoindre Planneo ?
                </h3>
                <div className="space-y-3">
                  {[
                    'Réservation instantanée dans tous vos établissements préférés',
                    'Gestion centralisée de tous vos rendez-vous',
                    'Notifications et rappels automatiques',
                    'Historique complet de vos réservations'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600 font-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}