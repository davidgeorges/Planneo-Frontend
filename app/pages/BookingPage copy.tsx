import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Phone, 
  Check, 
  Star,
  ArrowLeft,
  ArrowRight,
  Users,
  Mail,
  User,
  CheckCircle,
  Utensils,
  Scissors,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingPage() {
  const { establishmentId, resourceId } = useParams();
  const navigate = useNavigate();
const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1); // 1: datetime, 2: info, 3: confirmation
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Données fictives adaptées au type d'établissement
  const establishmentTypes = {
    restaurant: {
      establishment: {
        name: 'Le Petit Bistrot',
        type: 'Restaurant',
        address: '15 rue de la Gastronomie, Paris 1er',
        phone: '01 42 86 17 25',
        rating: 4.8,
        verified: true,
        icon: Utensils
      },
      resource: {
        name: 'Table pour 4 personnes',
        description: 'Table près de la fenêtre avec vue sur jardin',
        duration: '2h00',
        price: 0, // Pas de frais de réservation
        icon: Users
      }
    },
    beauty: {
      establishment: {
        name: 'Salon Élégance',
        type: 'Salon de coiffure',
        address: '15 rue de la Paix, Paris 1er',
        phone: '01 42 86 17 25',
        rating: 4.9,
        verified: true,
        icon: Scissors
      },
      resource: {
        name: 'Sophie Martin - Coupe femme',
        description: 'Coupe personnalisée selon votre morphologie et style de vie',
        duration: '45 min',
        price: 65,
        icon: User
      }
    },
    fitness: {
      establishment: {
        name: 'FitClub Premium',
        type: 'Salle de sport',
        address: '25 avenue du Sport, Paris 15e',
        phone: '01 45 67 89 12',
        rating: 4.7,
        verified: true,
        icon: Dumbbell
      },
      resource: {
        name: 'Cours de Yoga - Niveau débutant',
        description: 'Séance de yoga doux pour débutants avec Sarah',
        duration: '1h00',
        price: 25,
        icon: Users
      }
    }
  };

  // Simuler le type selon l'ID (dans une vraie app, ça viendrait de l'API)
  const currentType = establishmentId?.includes('restaurant') ? 'restaurant' 
    : establishmentId?.includes('fitness') ? 'fitness' 
    : 'beauty';
  
  const { establishment, resource } = establishmentTypes[currentType];

  const timeSlots = [
    { time: '08:00', available: true, popular: false },
    { time: '08:30', available: false, popular: false },
    { time: '09:00', available: true, popular: true },
    { time: '09:30', available: true, popular: false },
    { time: '10:00', available: true, popular: true },
    { time: '10:30', available: true, popular: false },
    { time: '11:00', available: false, popular: false },
    { time: '11:30', available: true, popular: false },
    { time: '14:00', available: true, popular: true },
    { time: '14:30', available: true, popular: false },
    { time: '15:00', available: false, popular: false },
    { time: '15:30', available: true, popular: true },
    { time: '16:00', available: true, popular: false },
    { time: '16:30', available: false, popular: false },
    { time: '17:00', available: true, popular: false },
    { time: '17:30', available: true, popular: false },
    { time: '18:00', available: true, popular: true },
    { time: '18:30', available: true, popular: false },
  ];

  const steps = [
    { number: 1, title: 'Date & Heure' },
    { number: 2, title: 'Informations' },
    { number: 3, title: 'Confirmation' }
  ];

  const handleDateTimeNext = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleInfoNext = () => {
    if (customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone) {
      setStep(3);
    }
  };

  const handlePayment = () => {
    // Simuler la confirmation
    navigate('/appointments');
  };

  const formatDate = (date : any ) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">Réservation</h1>
              <p className="text-gray-500 mt-1 font-light">{establishment.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <establishment.icon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{establishment.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Indicateur de progression ultra simple */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    step >= stepItem.number
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > stepItem.number ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      stepItem.number
                    )}
                  </div>
                  <span className={`text-sm font-light ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-400'}`}>
                    {stepItem.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-px ml-8 ${step > stepItem.number ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Étape 1: Date et heure */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-12">
                      <div className="mb-12">
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Choisissez votre date</h2>
                        <p className="text-gray-500 font-light">Sélectionnez un créneau disponible</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <div className="bg-gray-50 rounded-3xl p-8">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date() || date.getDay() === 0}
                              className="rounded-lg"
                              required={false}
                            />
                          </div>
                        </div>
                        
                        {selectedDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <h3 className="text-xl font-light text-gray-900 mb-6">
                              Créneaux disponibles
                            </h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                              {timeSlots.map((slot) => (
                                <Button
                                  key={slot.time}
                                  variant={selectedTime === slot.time ? "default" : "outline"}
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`h-14 relative transition-all duration-200 ${
                                    selectedTime === slot.time
                                      ? 'bg-gray-900 text-white border-gray-900'
                                      : slot.available
                                        ? 'border-gray-200 hover:border-gray-300 bg-white'
                                        : 'opacity-30 cursor-not-allowed'
                                  }`}
                                >
                                  <div className="text-center">
                                    <div className="font-light">{slot.time}</div>
                                    {slot.popular && slot.available && (
                                      <div className="text-xs text-orange-500 mt-1">Populaire</div>
                                    )}
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        <div className="flex justify-end pt-8">
                          <Button 
                            onClick={handleDateTimeNext} 
                            disabled={!selectedDate || !selectedTime}
                            size="lg"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-12 h-12 rounded-full font-light"
                          >
                            Continuer
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Étape 2: Informations */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-12">
                      <div className="mb-12">
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Vos informations</h2>
                        <p className="text-gray-500 font-light">Complétez votre réservation</p>
                      </div>

                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <Label htmlFor="firstName" className="text-base font-light text-gray-700 mb-3 block">Prénom</Label>
                            <Input
                              id="firstName"
                              value={customerInfo.firstName}
                              onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                              placeholder="Votre prénom"
                              className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-base font-light text-gray-700 mb-3 block">Nom</Label>
                            <Input
                              id="lastName"
                              value={customerInfo.lastName}
                              onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                              placeholder="Votre nom"
                              className="h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-base font-light text-gray-700 mb-3 block">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                              placeholder="votre.email@example.com"
                              className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone" className="text-base font-light text-gray-700 mb-3 block">Téléphone</Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              id="phone"
                              type="tel"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                              placeholder="06 12 34 56 78"
                              className="pl-12 h-12 border-gray-200 rounded-xl font-light focus:border-gray-400"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="notes" className="text-base font-light text-gray-700 mb-3 block">Notes (optionnel)</Label>
                          <Textarea
                            id="notes"
                            value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                            placeholder="Précisions sur votre demande..."
                            rows={4}
                            className="border-gray-200 rounded-xl font-light focus:border-gray-400"
                          />
                        </div>
                        
                        <div className="flex justify-between pt-8">
                          <Button 
                            variant="outline" 
                            onClick={() => setStep(1)} 
                            size="lg" 
                            className="px-12 h-12 rounded-full font-light border-gray-200"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Retour
                          </Button>
                          <Button 
                            onClick={handleInfoNext}
                            disabled={!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone}
                            size="lg"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-12 h-12 rounded-full font-light"
                          >
                            Continuer
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Étape 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-12">
                      <div className="mb-12">
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Confirmation</h2>
                        <p className="text-gray-500 font-light">Vérifiez et validez votre réservation</p>
                      </div>

                      <div className="space-y-8">
                        {/* Résumé de la réservation */}
                        <div className="bg-gray-50 rounded-3xl p-8">
                          <h3 className="font-light text-gray-900 mb-6 text-lg">Détails de votre réservation</h3>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-light">Date</span>
                              <span className="font-light">{formatDate(selectedDate)}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-light">Heure</span>
                              <span className="font-light">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-light">Durée</span>
                              <span className="font-light">{resource.duration}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-light">Service</span>
                              <span className="font-light">{resource.name}</span>
                            </div>
                            {resource.price > 0 && (
                              <div className="flex justify-between py-3">
                                <span className="text-gray-600 font-light">Prix</span>
                                <span className="font-medium">{resource.price}€</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-6">
                          <h3 className="font-light text-blue-900 mb-2">Politique d'annulation</h3>
                          <p className="text-sm text-blue-700 font-light">
                            Annulation gratuite jusqu'à 24h avant la {currentType === 'restaurant' ? 'réservation' : 'prestation'}.
                          </p>
                        </div>
                        
                        <div className="flex justify-between pt-8">
                          <Button 
                            variant="outline" 
                            onClick={() => setStep(2)} 
                            size="lg" 
                            className="px-12 h-12 rounded-full font-light border-gray-200"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Retour
                          </Button>
                          <Button 
                            onClick={handlePayment}
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white px-12 h-12 rounded-full font-light"
                          >
                            Confirmer la réservation
                            <Check className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Résumé de la réservation - Style minimal */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white sticky top-8">
              <CardContent className="p-8">
                <h3 className="text-lg font-light text-gray-900 mb-6">Résumé</h3>
                
                {/* Établissement */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <establishment.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-light text-gray-900">{establishment.name}</h4>
                      <p className="text-sm text-gray-500 font-light">{establishment.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-light">{establishment.rating}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 space-y-1 font-light">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{establishment.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{establishment.phone}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Service */}
                <div className="mb-8">
                  <h4 className="font-light text-gray-900 mb-3">Service</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <span className="font-light">{resource.name}</span>
                        <p className="text-sm text-gray-500 mt-1 font-light">{resource.description}</p>
                      </div>
                      {resource.price > 0 && (
                        <span className="font-light">{resource.price}€</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 font-light">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <>
                    <Separator className="my-6" />
                    <div className="mb-8">
                      <h4 className="font-light text-gray-900 mb-3">Date et heure</h4>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="font-light text-gray-900">{formatDate(selectedDate)}</p>
                        <p className="text-gray-600 font-light">{selectedTime}</p>
                      </div>
                    </div>
                  </>
                )}

                {step >= 2 && customerInfo.firstName && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-light text-gray-900 mb-3">Client</h4>
                      <div className="bg-gray-50 p-4 rounded-2xl space-y-1 text-sm font-light">
                        <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                        <p className="text-gray-600">{customerInfo.email}</p>
                        <p className="text-gray-600">{customerInfo.phone}</p>
                      </div>
                    </div>
                  </>
                )}

                {resource.price > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div className="bg-gray-900 text-white p-4 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <span className="font-light">Total</span>
                        <span className="text-xl font-light">{resource.price}€</span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1 font-light">À régler sur place</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}