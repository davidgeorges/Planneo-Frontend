import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { 
  User, 
  Calendar, 
  Clock,
  Settings, 
  Bell, 
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Heart,
  History,
  Star,
  Plus,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      establishment: 'Salon Élégance',
      service: 'Coupe femme',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed',
      price: 65
    },
    {
      id: 2,
      establishment: 'Fitness Club Premium',
      service: 'Cours de Yoga',
      date: '2024-01-10',
      time: '18:00',
      status: 'completed',
      price: 25
    },
    {
      id: 3,
      establishment: 'Le Petit Bistrot',
      service: 'Table pour 2',
      date: '2024-01-05',
      time: '20:00',
      status: 'completed',
      price: 0
    },
  ]);
  
  const [user, setUser] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 12 34 56 78',
    address: '25 rue de la République, 75001 Paris',
    memberSince: 'Membre depuis Mars 2023',
    totalBookings: 23,
    favoriteEstablishments: 8,
    avatar: null
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '2026',
      isDefault: false
    }
  ]);

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  const [newCardForm, setNewCardForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });



  const [favoriteEstablishments, setFavoriteEstablishments] = useState([
    {
      id: 3,
      name: 'Salon Élégance',
      type: 'Salon de coiffure',
      rating: 4.9,
      visits: 5
    },
    {
      id: 2,
      name: 'Fitness Club Premium',
      type: 'Salle de sport',
      rating: 4.7,
      visits: 12
    },
    {
      id: 1,
      name: 'Le Petit Bistrot',
      type: 'Restaurant',
      rating: 4.8,
      visits: 3
    },
  ]);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'bookings', label: 'Mes réservations', icon: Calendar },
    { id: 'favorites', label: 'Mes favoris', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const getStatusBadge = (status : String) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">En attente</Badge>;
    }
  };

  const handleEditProfile = () => {
    setUser({ ...user, ...editForm });
    setIsEditProfileOpen(false);
    toast.success('Profil mis à jour avec succès !');
  };

  const handleDeletePaymentMethod = (id : number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success('Moyen de paiement supprimé');
  };

  const handleSetDefaultPayment = (id : number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success('Moyen de paiement par défaut mis à jour');
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      type: newCardForm.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      last4: newCardForm.cardNumber.slice(-4),
      expiryMonth: newCardForm.expiryMonth,
      expiryYear: newCardForm.expiryYear,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    setNewCardForm({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: ''
    });
    setIsAddCardModalOpen(false);
    toast.success('Carte ajoutée avec succès !');
  };

  const handleBookFavorite = (establishmentId : number) => {
    navigate(`/establishment/${establishmentId}`);
  };

  const toggleNotifications = () => {
    setEmailNotifications(!emailNotifications);
    toast.success(emailNotifications ? 'Notifications désactivées' : 'Notifications activées');
  };

  const handleCancelBooking = (bookingId : number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
    toast.success('Réservation annulée');
  };

  const canCancelBooking = (booking : any) => {
    const bookingDate = new Date(booking.date);
    const now = new Date();
    const timeDiff = bookingDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return booking.status === 'confirmed' && hoursDiff > 24;
  };

  const handleRemoveFavorite = (establishmentId : number) => {
    setFavoriteEstablishments(favoriteEstablishments.filter(est => est.id !== establishmentId));
    toast.success('Établissement retiré des favoris');
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
          <h1 className="text-3xl font-light text-gray-900 mb-2">Mon compte</h1>
          <p className="text-gray-500 font-light">Gérez vos informations et réservations</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                {/* Avatar et info utilisateur */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-500 font-light">{user.memberSince}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeTab === tab.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-light">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contenu principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Nom complet</p>
                            <p className="font-light text-gray-900">{user.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Email</p>
                            <p className="font-light text-gray-900">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Téléphone</p>
                            <p className="font-light text-gray-900">{user.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Adresse</p>
                            <p className="font-light text-gray-900">{user.address}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <h4 className="font-light text-gray-900 mb-4">Statistiques</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 font-light">Réservations totales</span>
                              <span className="font-medium">{user.totalBookings}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 font-light">Établissements favoris</span>
                              <span className="font-medium">{user.favoriteEstablishments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 font-light">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Modifier mes informations
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Modifier mes informations</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nom
                            </Label>
                            <Input
                              id="name"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Téléphone
                            </Label>
                            <Input
                              id="phone"
                              value={editForm.phone}
                              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                              Adresse
                            </Label>
                            <Input
                              id="address"
                              value={editForm.address}
                              onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleEditProfile} className="bg-gray-900 hover:bg-gray-800">
                            Sauvegarder
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Onglet Réservations */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Mes réservations récentes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <motion.div 
                          key={booking.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-light text-gray-900 text-lg mb-1">{booking.establishment}</h4>
                              <p className="text-gray-600 font-light">{booking.service}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(booking.status)}
                              {canCancelBooking(booking) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4 text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="font-light">{new Date(booking.date).toLocaleDateString('fr-FR')}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="font-light">{booking.time}</span>
                              </div>
                            </div>
                            {booking.price > 0 && (
                              <span className="font-medium">{booking.price}€</span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Onglet Favoris */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Mes établissements favoris</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {favoriteEstablishments.map((establishment) => (
                        <motion.div 
                          key={establishment.id} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors"
                        >
                          <div>
                            <h4 className="font-light text-gray-900 text-lg mb-1">{establishment.name}</h4>
                            <p className="text-gray-600 font-light mb-2">{establishment.type}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="font-light">{establishment.rating}</span>
                              </div>
                              <span className="text-gray-500 font-light">{establishment.visits} visites</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              className="border-gray-200 rounded-full font-light"
                              onClick={() => handleBookFavorite(establishment.id)}
                            >
                              Réserver
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFavorite(establishment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Onglet Paramètres */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Préférences</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-light text-gray-900">Notifications par email</p>
                            <p className="text-sm text-gray-500 font-light">Recevoir les confirmations et rappels</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={emailNotifications}
                            onCheckedChange={toggleNotifications}
                          />
                          <span className="text-sm font-light">
                            {emailNotifications ? 'Activé' : 'Désactivé'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-light text-gray-900">Moyens de paiement</p>
                            <p className="text-sm text-gray-500 font-light">Gérer vos cartes enregistrées</p>
                          </div>
                        </div>
                        <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-200 rounded-full font-light">
                              Gérer
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Moyens de paiement</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="font-medium">
                                        {method.type} •••• {method.last4}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Expire {method.expiryMonth}/{method.expiryYear}
                                      </p>
                                      {method.isDefault && (
                                        <Badge className="bg-green-100 text-green-800 text-xs">Par défaut</Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {!method.isDefault && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSetDefaultPayment(method.id)}
                                      >
                                        <Check className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeletePaymentMethod(method.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              
                              <Dialog open={isAddCardModalOpen} onOpenChange={setIsAddCardModalOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter une carte
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Ajouter une nouvelle carte</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="cardholderName" className="text-right">
                                        Nom
                                      </Label>
                                      <Input
                                        id="cardholderName"
                                        value={newCardForm.cardholderName}
                                        onChange={(e) => setNewCardForm({...newCardForm, cardholderName: e.target.value})}
                                        className="col-span-3"
                                        placeholder="Nom sur la carte"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="cardNumber" className="text-right">
                                        Numéro
                                      </Label>
                                      <Input
                                        id="cardNumber"
                                        value={newCardForm.cardNumber}
                                        onChange={(e) => setNewCardForm({...newCardForm, cardNumber: e.target.value})}
                                        className="col-span-3"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right">
                                        Expiration
                                      </Label>
                                      <div className="col-span-3 flex space-x-2">
                                        <Input
                                          value={newCardForm.expiryMonth}
                                          onChange={(e) => setNewCardForm({...newCardForm, expiryMonth: e.target.value})}
                                          placeholder="MM"
                                          maxLength={2}
                                          className="w-20"
                                        />
                                        <Input
                                          value={newCardForm.expiryYear}
                                          onChange={(e) => setNewCardForm({...newCardForm, expiryYear: e.target.value})}
                                          placeholder="YYYY"
                                          maxLength={4}
                                          className="w-24"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="cvv" className="text-right">
                                        CVV
                                      </Label>
                                      <Input
                                        id="cvv"
                                        value={newCardForm.cvv}
                                        onChange={(e) => setNewCardForm({...newCardForm, cvv: e.target.value})}
                                        className="col-span-1"
                                        placeholder="123"
                                        maxLength={4}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsAddCardModalOpen(false)}>
                                      Annuler
                                    </Button>
                                    <Button onClick={handleAddCard} className="bg-gray-900 hover:bg-gray-800">
                                      Ajouter
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}