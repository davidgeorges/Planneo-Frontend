import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar,
  Users,
  Award,
  Camera,
  ArrowLeft,
  Heart,
  Share
} from 'lucide-react';
import { ImageWithFallback } from '../image/ImageWithFallback';
import { motion } from 'motion/react';

export default function ProfessionalPage() {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState<number>(1);

  // Données fictives pour l'établissement
  const establishment = {
    id: 1,
    name: 'Salon Élégance',
    type: 'Salon de coiffure',
    category: 'Beauté & Coiffure',
    rating: 4.9,
    reviews: 156,
    address: '15 rue de la Paix, Paris 1er',
    phone: '01 42 86 17 25',
    description: 'Un salon de coiffure moderne au cœur de Paris, spécialisé dans les coupes tendance et la colorimétrie. Notre équipe de professionnels vous accueille dans un cadre élégant et chaleureux.',
    openingHours: {
      'Lundi': 'Fermé',
      'Mardi': '9h00 - 19h00',
      'Mercredi': '9h00 - 19h00',
      'Jeudi': '9h00 - 20h00',
      'Vendredi': '9h00 - 20h00',
      'Samedi': '9h00 - 18h00',
      'Dimanche': '10h00 - 17h00'
    },
    verified: true,
    gallery: [
      'https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbiUyMGx1eHVyeXxlbnwxfHx8fDE3NTk2MTI0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTk2MTI0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ]
  };

  const services = [
    {
      id: 1,
      name: 'Coupe femme',
      duration: '45 min',
      price: 65,
      description: 'Coupe personnalisée selon votre morphologie et style de vie',
      professional: 'Sophie Martin'
    },
    {
      id: 2,
      name: 'Coupe homme',
      duration: '30 min',
      price: 45,
      description: 'Coupe moderne et tendance adaptée à votre personnalité',
      professional: 'Marc Dubois'
    },
    {
      id: 3,
      name: 'Coloration',
      duration: '2h00',
      price: 120,
      description: 'Coloration complète avec produits professionnels',
      professional: 'Sophie Martin'
    },
    {
      id: 4,
      name: 'Brushing',
      duration: '30 min',
      price: 35,
      description: 'Mise en forme et finition pour un look parfait',
      professional: 'Marie Leclerc'
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Julie M.',
      rating: 5,
      date: 'Il y a 2 jours',
      comment: 'Excellente expérience ! Sophie a parfaitement compris ce que je voulais. Le salon est magnifique et l\'accueil parfait.',
      verified: true
    },
    {
      id: 2,
      author: 'Pierre L.',
      rating: 5,
      date: 'Il y a 1 semaine',
      comment: 'Très professionnel, je recommande vivement. Marc fait des coupes impeccables.',
      verified: true
    },
    {
      id: 3,
      author: 'Emma D.',
      rating: 4,
      date: 'Il y a 2 semaines',
      comment: 'Bon salon, service de qualité. Juste un petit délai d\'attente mais ça valait le coup.',
      verified: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec image principale */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={establishment.gallery[0]}
          alt={establishment.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Navigation */}
        <div className="absolute top-6 left-6">
          <Button 
            variant="outline" 
            size="icon"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
            asChild
          >
            <Link to="/search">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <Button 
            variant="outline" 
            size="icon"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>

        {/* Info établissement */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center mb-2">
            {establishment.verified && (
              <Badge className="bg-blue-500/90 backdrop-blur-sm text-white border-0 mr-3">
                <Award className="w-3 h-3 mr-1" />
                Vérifié
              </Badge>
            )}
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="flex items-center space-x-1 text-sm font-medium text-gray-900">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{establishment.rating}</span>
                <span className="text-gray-500">({establishment.reviews})</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-light mb-2">{establishment.name}</h1>
          <p className="text-white/90 font-light">{establishment.type} • {establishment.category}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light text-gray-900 mb-4">À propos</h2>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {establishment.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light text-gray-900 mb-6">Nos services</h2>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          selectedService === service.id 
                            ? 'border-gray-900 bg-gray-50' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-light text-gray-900">{service.name}</h3>
                          <span className="text-xl font-light text-gray-900">{service.price}€</span>
                        </div>
                        <p className="text-gray-600 font-light mb-3">{service.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-light">{service.duration}</span>
                          </div>
                          <span className="font-light">avec {service.professional}</span>
                        </div>
                        {selectedService === service.id && (
                          <div className="mt-4">
                            <Button 
                              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
                              asChild
                            >
                              <Link to={`/booking/${establishment.id}/${service.id}`}>
                                Réserver ce service
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Avis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light text-gray-900 mb-6">Avis clients</h2>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="font-light text-gray-900 mr-3">{review.author}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Avis vérifié
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 font-light">{review.date}</span>
                        </div>
                        <p className="text-gray-600 font-light">{review.comment}</p>
                        {review !== reviews[reviews.length - 1] && <Separator className="mt-6" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations pratiques */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Informations</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-light text-gray-900">{establishment.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <p className="font-light text-gray-900">{establishment.phone}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-light text-gray-900 mb-4">Horaires d'ouverture</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(establishment.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-light text-gray-600">{day}</span>
                        <span className="font-light text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light h-12"
                    asChild
                  >
                    <Link to={`/booking/${establishment.id}/1`}>
                      <Calendar className="mr-2 w-4 h-4" />
                      Prendre rendez-vous
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Galerie */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-gray-900">Photos</h3>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <Camera className="w-4 h-4 mr-2" />
                      Voir tout
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {establishment.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={image}
                          alt={`${establishment.name} - Photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}