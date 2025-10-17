import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone,
  Star,
  Download,
  Share2,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulation de données de réservation
  const reservation = {
    id: 'RV123456789',
    establishment: {
      name: 'Salon Élégance',
      type: 'Salon de coiffure',
      address: '15 rue de la Paix, Paris 1er',
      phone: '01 42 86 17 25',
      rating: 4.9
    },
    service: 'Coupe femme avec Sophie Martin',
    date: '2024-01-20',
    time: '14:30',
    duration: '45 min',
    price: 65,
    customer: {
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '06 12 34 56 78'
    }
  };

  useEffect(() => {
    // Simulation de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date : any) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Confirmation de votre réservation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header de confirmation */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Réservation confirmée !
            </h1>
            <p className="text-gray-500 font-light">
              Votre rendez-vous est confirmé. Vous recevrez une confirmation par email.
            </p>
          </div>

          {/* Détails de la réservation */}
          <Card className="border-0 shadow-2xl bg-white mb-8">
            <CardContent className="p-8">
              {/* Établissement */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-light text-gray-900">Votre réservation</h2>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Confirmé
                  </Badge>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900 mb-1">
                        {reservation.establishment.name}
                      </h3>
                      <p className="text-gray-600 font-light">{reservation.establishment.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-light">{reservation.establishment.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3" />
                      <span className="font-light">{reservation.establishment.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3" />
                      <span className="font-light">{reservation.establishment.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Détails du rendez-vous */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-light text-gray-900 mb-3">Service</h4>
                    <p className="text-gray-600 font-light">{reservation.service}</p>
                  </div>
                  <div>
                    <h4 className="font-light text-gray-900 mb-3">Prix</h4>
                    <p className="text-xl font-light text-gray-900">{reservation.price}€</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-light text-gray-900 mb-3">Date</h4>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-light text-gray-900">{formatDate(reservation.date)}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-light text-gray-900 mb-3">Heure</h4>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-light text-gray-900">{reservation.time} ({reservation.duration})</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-light text-gray-900 mb-3">Référence</h4>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <code className="font-mono text-sm font-medium">{reservation.id}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button 
              variant="outline" 
              className="h-12 border-gray-200 rounded-full font-light"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
            
            <Button 
              variant="outline" 
              className="h-12 border-gray-200 rounded-full font-light"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            
            <Button 
              variant="outline" 
              className="h-12 border-gray-200 rounded-full font-light"
              asChild
            >
              <Link to="/appointments">
                Mes réservations
              </Link>
            </Button>
          </div>

          {/* Informations importantes */}
          <Card className="border-0 shadow-lg bg-blue-50 mb-8">
            <CardContent className="p-6">
              <h3 className="font-light text-blue-900 mb-4">Informations importantes</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <p className="font-light">• Veuillez arriver 5 minutes avant votre rendez-vous</p>
                <p className="font-light">• Annulation gratuite jusqu'à 24h avant</p>
                <p className="font-light">• Un SMS de rappel vous sera envoyé la veille</p>
                <p className="font-light">• Paiement sur place ou par carte</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions principales */}
          <div className="space-y-4">
            <Button 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
              asChild
            >
              <Link to="/search">
                <Plus className="mr-2 w-4 h-4" />
                Nouvelle réservation
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-200 rounded-full font-light"
              asChild
            >
              <Link to="/">
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}