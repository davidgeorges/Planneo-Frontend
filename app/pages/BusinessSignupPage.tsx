import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  Building2,
  MapPin,
  Clock,
  Star,
  Users,
  Utensils,
  Scissors,
  Dumbbell,
  Stethoscope,
  Wrench,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BusinessSignupPage() {
  const [step, setStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    type: '',
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    openingHours: {}
  });

  const businessTypes = [
    {
      id: 'restaurant',
      name: 'Restaurant',
      description: 'Restaurant, café, bar, brasserie',
      icon: Utensils,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'beauty',
      name: 'Beauté & Bien-être',
      description: 'Salon de coiffure, institut, spa',
      icon: Scissors,
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 'fitness',
      name: 'Sport & Fitness',
      description: 'Salle de sport, coach, studio',
      icon: Dumbbell,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'health',
      name: 'Santé',
      description: 'Cabinet médical, dentiste, kiné',
      icon: Stethoscope,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Garage, réparation, conseil',
      icon: Wrench,
      color: 'from-gray-400 to-gray-600'
    },
  ];

  const steps = [
    { number: 1, title: 'Type d\'établissement' },
    { number: 2, title: 'Informations générales' },
    { number: 3, title: 'Coordonnées' },
    { number: 4, title: 'Confirmation' },
  ];

  const handleTypeSelect = (type : any) => {
    setBusinessData({ ...businessData, type });
    setStep(2);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Simulation de l'envoi des données
    console.log('Business data:', businessData);
    alert('Votre établissement a été ajouté avec succès !');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Rejoignez Planneo
            </h1>
            <p className="text-gray-500 font-light">
              Ajoutez votre établissement et commencez à recevoir des réservations
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Indicateur de progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                      step >= stepItem.number
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > stepItem.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        stepItem.number
                      )}
                    </div>
                    <span className={`text-sm font-light ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stepItem.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-px ml-8 ${step > stepItem.number ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenu des étapes */}
        <AnimatePresence mode="wait">
          {/* Étape 1: Type d'établissement */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-light text-gray-900">
                    Quel type d'établissement avez-vous ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id)}
                        className="text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-900 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-light text-gray-900 mb-2">{type.name}</h3>
                        <p className="text-sm text-gray-500 font-light">{type.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Étape 2: Informations générales */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-light text-gray-900">
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-light text-gray-700 mb-3 block">
                      Nom de votre établissement
                    </Label>
                    <Input
                      id="name"
                      value={businessData.name}
                      onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                      placeholder="Ex: Restaurant Le Petit Bistrot"
                      className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-light text-gray-700 mb-3 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={businessData.description}
                      onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                      placeholder="Décrivez brièvement votre établissement..."
                      rows={4}
                      className="border-gray-200 rounded-xl font-light focus:border-gray-400"
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="px-8 h-12 rounded-full font-light border-gray-200"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Retour
                    </Button>
                    <Button 
                      onClick={handleNext}
                      disabled={!businessData.name || !businessData.description}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-12 rounded-full font-light"
                    >
                      Continuer
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Étape 3: Coordonnées */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-light text-gray-900">
                    Coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <Label htmlFor="address" className="text-base font-light text-gray-700 mb-3 block">
                      Adresse complète
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="address"
                        value={businessData.address}
                        onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                        placeholder="123 rue de la République, 75001 Paris"
                        className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-base font-light text-gray-700 mb-3 block">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        value={businessData.phone}
                        onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                        placeholder="01 23 45 67 89"
                        className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-light text-gray-700 mb-3 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessData.email}
                        onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                        placeholder="contact@restaurant.com"
                        className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-base font-light text-gray-700 mb-3 block">
                      Site web (optionnel)
                    </Label>
                    <Input
                      id="website"
                      value={businessData.website}
                      onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                      placeholder="https://www.restaurant.com"
                      className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="px-8 h-12 rounded-full font-light border-gray-200"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Retour
                    </Button>
                    <Button 
                      onClick={handleNext}
                      disabled={!businessData.address || !businessData.phone || !businessData.email}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-12 rounded-full font-light"
                    >
                      Continuer
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Étape 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-light text-gray-900">
                    Récapitulatif
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Récapitulatif des informations */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-light text-gray-900 mb-6 text-lg">Vos informations</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-light">Type</span>
                        <span className="font-light">
                          {businessTypes.find(t => t.id === businessData.type)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-light">Nom</span>
                        <span className="font-light">{businessData.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-light">Adresse</span>
                        <span className="font-light text-right max-w-xs">{businessData.address}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-light">Téléphone</span>
                        <span className="font-light">{businessData.phone}</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-600 font-light">Email</span>
                        <span className="font-light">{businessData.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prochaines étapes */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="font-light text-blue-900 mb-4">Prochaines étapes</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-blue-700 font-light">Vérification de votre établissement (24-48h)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-blue-700 font-light">Configuration de vos services et créneaux</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-blue-700 font-light">Mise en ligne et première réservation</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="px-8 h-12 rounded-full font-light border-gray-200"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Retour
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 rounded-full font-light"
                    >
                      <Building2 className="mr-2 w-4 h-4" />
                      Créer mon établissement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}