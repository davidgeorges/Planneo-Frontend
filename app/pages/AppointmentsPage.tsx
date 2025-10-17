import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone,
  Star,
  MoreVertical,
  Edit,
  X,
  Filter,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function AppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const appointments = [
    {
      id: 1,
      establishment: {
        name: 'Salon Élégance',
        type: 'Salon de coiffure',
        address: '15 rue de la Paix, Paris 1er',
        phone: '01 42 86 17 25',
        rating: 4.9
      },
      service: 'Coupe femme',
      professional: 'Sophie Martin',
      date: '2024-01-20',
      time: '14:30',
      duration: '45 min',
      price: 65,
      status: 'confirmed',
      bookingRef: 'RV123456789'
    },
    {
      id: 2,
      establishment: {
        name: 'Fitness Club Premium',
        type: 'Salle de sport',
        address: '25 avenue du Sport, Paris 15e',
        phone: '01 45 67 89 12',
        rating: 4.7
      },
      service: 'Cours de Yoga - Niveau débutant',
      professional: 'Sarah Durand',
      date: '2024-01-22',
      time: '18:00',
      duration: '1h00',
      price: 25,
      status: 'confirmed',
      bookingRef: 'RV987654321'
    },
    {
      id: 3,
      establishment: {
        name: 'Le Petit Bistrot',
        type: 'Restaurant',
        address: '15 rue de la Gastronomie, Paris 1er',
        phone: '01 42 86 17 25',
        rating: 4.8
      },
      service: 'Table pour 2 personnes',
      professional: null,
      date: '2024-01-25',
      time: '20:00',
      duration: '2h00',
      price: 0,
      status: 'confirmed',
      bookingRef: 'RV456789123'
    },
    {
      id: 4,
      establishment: {
        name: 'Spa Détente',
        type: 'Spa',
        address: '10 rue du Bien-être, Paris 8e',
        phone: '01 42 12 34 56',
        rating: 4.6
      },
      service: 'Massage relaxant',
      professional: 'Marie Leclerc',
      date: '2024-01-15',
      time: '16:00',
      duration: '1h30',
      price: 120,
      status: 'completed',
      bookingRef: 'RV789123456'
    },
    {
      id: 5,
      establishment: {
        name: 'Café Moderne',
        type: 'Café',
        address: '5 place de la République, Paris 3e',
        phone: '01 42 55 66 77',
        rating: 4.4
      },
      service: 'Table pour 3 personnes',
      professional: null,
      date: '2024-01-10',
      time: '10:30',
      duration: '1h30',
      price: 0,
      status: 'cancelled',
      bookingRef: 'RV321654987'
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous', count: appointments.length },
    { value: 'confirmed', label: 'Confirmés', count: appointments.filter(a => a.status === 'confirmed').length },
    { value: 'completed', label: 'Terminés', count: appointments.filter(a => a.status === 'completed').length },
    { value: 'cancelled', label: 'Annulés', count: appointments.filter(a => a.status === 'cancelled').length },
  ];

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filterStatus);

  const getStatusBadge = (status : string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmé</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Terminé</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Annulé</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En attente</Badge>;
    }
  };

  const formatDate = (date : any) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (date : any) => {
    return new Date(date) > new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">Mes réservations</h1>
              <p className="text-gray-500 font-light">Gérez tous vos rendez-vous en un seul endroit</p>
            </div>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 font-light"
              asChild
            >
              <Link to="/search">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle réservation
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilterStatus(option.value)}
                      className={`px-6 py-3 rounded-full transition-all duration-200 ${
                        filterStatus === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="font-light">{option.label}</span>
                      <span className="ml-2 text-xs">({option.count})</span>
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="border-gray-200 rounded-full font-light">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des rendez-vous */}
        <div className="space-y-6">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-light text-gray-900">{appointment.establishment.name}</h3>
                        {getStatusBadge(appointment.status)}
                        {isUpcoming(appointment.date) && appointment.status === 'confirmed' && (
                          <Badge variant="outline" className="border-blue-200 text-blue-800">
                            À venir
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 font-light mb-2">{appointment.establishment.type}</p>
                      <p className="text-lg font-light text-gray-900 mb-4">{appointment.service}</p>
                      
                      {appointment.professional && (
                        <p className="text-gray-600 font-light mb-4">avec {appointment.professional}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-light">{appointment.establishment.rating}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    {/* Informations de la réservation */}
                    <div className="space-y-4">
                      <h4 className="font-light text-gray-900 mb-3">Détails de la réservation</h4>
                      
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span className="font-light">{formatDate(appointment.date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span className="font-light">{appointment.time} • {appointment.duration}</span>
                      </div>
                      
                      {appointment.price > 0 && (
                        <div className="flex items-center justify-between text-gray-900">
                          <span className="font-light">Prix</span>
                          <span className="font-medium">{appointment.price}€</span>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-500">
                        <span className="font-light">Réf: {appointment.bookingRef}</span>
                      </div>
                    </div>

                    {/* Informations de l'établissement */}
                    <div className="space-y-4">
                      <h4 className="font-light text-gray-900 mb-3">Contact</h4>
                      
                      <div className="flex items-start space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="font-light">{appointment.establishment.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Phone className="w-5 h-5" />
                        <span className="font-light">{appointment.establishment.phone}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {appointment.status === 'confirmed' && isUpcoming(appointment.date) && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-200 rounded-full font-light"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-200 text-red-600 hover:bg-red-50 rounded-full font-light"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Annuler
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 rounded-full font-light"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Laisser un avis
                        </Button>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-200 rounded-full font-light"
                      asChild
                    >
                      <Link to={`/establishment/${appointment.establishment.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        Voir l'établissement
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-light text-gray-900 mb-2">
              Aucune réservation trouvée
            </h3>
            <p className="text-gray-500 font-light mb-8">
              {filterStatus === 'all' 
                ? 'Vous n\'avez pas encore de réservation.'
                : `Aucune réservation ${statusOptions.find(s => s.value === filterStatus)?.label.toLowerCase()}.`
              }
            </p>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 font-light"
              asChild
            >
              <Link to="/search">
                Faire une réservation
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}