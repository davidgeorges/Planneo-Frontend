import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  Mail, 
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi d'email de récupération
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                  Mot de passe oublié
                </h1>
                <p className="text-gray-500 font-light">
                  Nous vous enverrons un lien pour réinitialiser votre mot de passe
                </p>
              </div>

              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-base font-light text-gray-700 mb-3 block">
                        Adresse email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@example.com"
                          className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
                      disabled={!email}
                    >
                      Envoyer le lien de récupération
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>

                  <div className="mt-8 text-center">
                    <Link 
                      to="/login" 
                      className="inline-flex items-center text-gray-600 hover:text-gray-900 font-light"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Retour à la connexion
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* État de confirmation */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                  Email envoyé
                </h1>
                <p className="text-gray-500 font-light">
                  Nous avons envoyé un lien de récupération à <strong>{email}</strong>
                </p>
              </div>

              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="font-light text-blue-900 mb-2">Étapes suivantes</h3>
                      <div className="space-y-2 text-sm text-blue-700">
                        <p className="font-light">1. Vérifiez votre boîte email (et vos spams)</p>
                        <p className="font-light">2. Cliquez sur le lien dans l'email</p>
                        <p className="font-light">3. Créez votre nouveau mot de passe</p>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <p className="text-sm text-gray-500 font-light">
                        Vous n'avez pas reçu l'email ?
                      </p>
                      <Button 
                        variant="outline"
                        className="w-full h-12 border-gray-200 rounded-full font-light"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Renvoyer l'email
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link 
                      to="/login" 
                      className="inline-flex items-center text-gray-600 hover:text-gray-900 font-light"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Retour à la connexion
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}