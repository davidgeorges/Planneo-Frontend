import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, MapPin, Star, Clock, Filter, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import { ImageWithFallback } from '../image/ImageWithFallback';
import { motion } from 'motion/react';

interface Filters {
  categories: string[];
  priceRange: number[];
  rating: number;
  distance: number;
  availability: string;
  features: string[];
  openNow: boolean;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 200],
    rating: 0,
    distance: 5,
    availability: 'any',
    features: [],
    openNow: false
  });

  const allEstablishments = [
    {
      id: 1,
      name: 'Le Petit Bistrot',
      type: 'Restaurant',
      category: 'Cuisine française',
      rating: 4.9,
      reviews: 234,
      distance: 0.3,
      nextAvailable: 'Ce soir 19h30',
      price: 45,
      priceSymbol: '€€',
      verified: true,
      features: ['Terrasse', 'Wi-Fi', 'Parking'],
      openNow: true,
    },
    {
      id: 2,
      name: 'Fitness Club Premium',
      type: 'Salle de sport',
      category: 'Fitness & Musculation',
      rating: 4.7,
      reviews: 189,
      distance: 0.8,
      nextAvailable: 'Demain 8h00',
      price: 80,
      priceSymbol: '€€€',
      verified: true,
      features: ['Sauna', 'Piscine', 'Coach'],
      openNow: false,
    },
    {
      id: 3,
      name: 'Salon Élégance',
      type: 'Salon de coiffure',
      category: 'Beauté & Coiffure',
      rating: 4.9,
      reviews: 156,
      distance: 0.5,
      nextAvailable: 'Aujourd\'hui 14h30',
      price: 65,
      priceSymbol: '€€',
      verified: true,
      features: ['Colorimétrie', 'Lissage', 'Extensions'],
      openNow: true,
    },
    {
      id: 4,
      name: 'Yoga Studio Zen',
      type: 'Studio de yoga',
      category: 'Bien-être',
      rating: 4.8,
      reviews: 92,
      distance: 1.2,
      nextAvailable: 'Demain 18h00',
      price: 25,
      priceSymbol: '€',
      verified: false,
      features: ['Méditation', 'Cours collectifs'],
      openNow: true,
    },
    {
      id: 5,
      name: 'Spa Détente',
      type: 'Spa',
      category: 'Relaxation',
      rating: 4.6,
      reviews: 78,
      distance: 2.1,
      nextAvailable: 'Après-demain 10h00',
      price: 150,
      priceSymbol: '€€€€',
      verified: true,
      features: ['Jacuzzi', 'Hammam', 'Massage'],
      openNow: false,
    },
    {
      id: 6,
      name: 'Café Moderne',
      type: 'Café',
      category: 'Boissons & Snacks',
      rating: 4.4,
      reviews: 145,
      distance: 0.7,
      nextAvailable: 'Maintenant',
      price: 15,
      priceSymbol: '€',
      verified: false,
      features: ['Wi-Fi', 'Brunch', 'Vegan'],
      openNow: true,
    },
    {
      id: 7,
      name: 'Clinique Dentaire Plus',
      type: 'Cabinet dentaire',
      category: 'Santé',
      rating: 4.8,
      reviews: 321,
      distance: 1.5,
      nextAvailable: 'Lundi 9h00',
      price: 120,
      priceSymbol: '€€€',
      verified: true,
      features: ['Urgences', 'Orthodontie', 'Implants'],
      openNow: false,
    },
    {
      id: 8,
      name: 'Auto Service Pro',
      type: 'Garage automobile',
      category: 'Services',
      rating: 4.3,
      reviews: 89,
      distance: 3.2,
      nextAvailable: 'Demain 14h00',
      price: 90,
      priceSymbol: '€€',
      verified: true,
      features: ['Diagnostic', 'Révision', 'Pneus'],
      openNow: false,
    }
  ];

  const categories = [
    { id: 'restaurant', name: 'Restaurants', count: 3 },
    { id: 'beauty', name: 'Beauté & Bien-être', count: 2 },
    { id: 'fitness', name: 'Sport & Fitness', count: 2 },
    { id: 'health', name: 'Santé', count: 1 },
    { id: 'services', name: 'Services', count: 1 }
  ];

  const features = [
    'Wi-Fi', 'Parking', 'Terrasse', 'Sauna', 'Piscine', 'Coach',
    'Colorimétrie', 'Méditation', 'Jacuzzi', 'Hammam', 'Massage',
    'Brunch', 'Vegan', 'Urgences', 'Orthodontie', 'Diagnostic'
  ];

  // Filtrage des établissements
  const filteredEstablishments = allEstablishments.filter(establishment => {
    // Filtre par catégorie
    if (filters.categories.length > 0) {
      const categoryMatch = filters.categories.some(cat => 
        establishment.category.toLowerCase().includes(cat) ||
        establishment.type.toLowerCase().includes(cat)
      );
      if (!categoryMatch) return false;
    }

    // Filtre par prix
    if (establishment.price < filters.priceRange[0] || establishment.price > filters.priceRange[1]) {
      return false;
    }

    // Filtre par note
    if (establishment.rating < filters.rating) {
      return false;
    }

    // Filtre par distance
    if (establishment.distance > filters.distance) {
      return false;
    }

    // Filtre par ouverture
    if (filters.openNow && !establishment.openNow) {
      return false;
    }

    // Filtre par fonctionnalités
    if (filters.features.length > 0) {
      const hasFeature = filters.features.some(feature => 
        establishment.features.includes(feature)
      );
      if (!hasFeature) return false;
    }

    return true;
  });

  // Tri des établissements
  const sortedEstablishments = [...filteredEstablishments].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const handleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleFeatureFilter = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 200],
      rating: 0,
      distance: 5,
      availability: 'any',
      features: [],
      openNow: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de recherche */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-light text-gray-900 mb-8 text-center">
              Trouvez votre établissement idéal
            </h1>
            
            {/* Barre de recherche */}
            <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Que recherchez-vous ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 border-gray-200 rounded-2xl font-light focus:border-gray-400"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Où ?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-14 border-gray-200 rounded-2xl font-light focus:border-gray-400"
                  />
                </div>
              </div>
              <Button 
                size="lg"
                className="h-14 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-light"
              >
                Rechercher
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Barre d'outils avec filtres et tri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <span className="text-gray-600 font-light">
                    {sortedEstablishments.length} établissement{sortedEstablishments.length > 1 ? 's' : ''} trouvé{sortedEstablishments.length > 1 ? 's' : ''}
                  </span>
                  
                  {/* Filtres actifs */}
                  {(filters.categories.length > 0 || filters.features.length > 0 || filters.openNow) && (
                    <div className="flex items-center space-x-2">
                      {filters.categories.map(category => (
                        <Badge key={category} variant="secondary" className="flex items-center gap-1">
                          {category}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => handleCategoryFilter(category)}
                          />
                        </Badge>
                      ))}
                      {filters.features.slice(0, 2).map(feature => (
                        <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                          {feature}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => handleFeatureFilter(feature)}
                          />
                        </Badge>
                      ))}
                      {filters.features.length > 2 && (
                        <Badge variant="secondary">
                          +{filters.features.length - 2} autres
                        </Badge>
                      )}
                      {filters.openNow && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Ouvert maintenant
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => setFilters(prev => ({ ...prev, openNow: false }))}
                          />
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Effacer tout
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Tri */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 h-10 border-gray-200 rounded-full font-light">
                      <SelectValue placeholder="Trier par..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Mieux notés</SelectItem>
                      <SelectItem value="distance">Plus proches</SelectItem>
                      <SelectItem value="price-low">Prix croissant</SelectItem>
                      <SelectItem value="price-high">Prix décroissant</SelectItem>
                      <SelectItem value="reviews">Plus d'avis</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mode d'affichage */}
                  <div className="flex border border-gray-200 rounded-full p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className="h-8 px-3 rounded-full"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className="h-8 px-3 rounded-full"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Filtres avancés */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-full px-6 font-light"
                      >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filtres
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-80 sm:w-96">
                      <SheetHeader>
                        <SheetTitle className="text-xl font-light">Filtres de recherche</SheetTitle>
                      </SheetHeader>
                      
                      <div className="py-6 space-y-8">
                        {/* Catégories */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">Catégories</h3>
                          <div className="space-y-3">
                            {categories.map(category => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={category.id}
                                  checked={filters.categories.includes(category.id)}
                                  onCheckedChange={() => handleCategoryFilter(category.id)}
                                />
                                <label htmlFor={category.id} className="font-light text-gray-700 flex-1">
                                  {category.name} ({category.count})
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Prix */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">
                            Prix ({filters.priceRange[0]}€ - {filters.priceRange[1]}€)
                          </h3>
                          <Slider
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                            max={200}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <Separator />

                        {/* Note minimale */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">
                            Note minimale ({filters.rating > 0 ? filters.rating : 'Toutes'})
                          </h3>
                          <div className="flex space-x-2">
                            {[0, 3, 4, 4.5].map(rating => (
                              <Button
                                key={rating}
                                variant={filters.rating === rating ? 'default' : 'outline'}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setFilters(prev => ({ ...prev, rating }))}
                              >
                                {rating === 0 ? 'Toutes' : `${rating}★`}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Distance */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">
                            Distance maximale ({filters.distance} km)
                          </h3>
                          <Slider
                            value={[filters.distance]}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value[0] }))}
                            max={10}
                            min={0.5}
                            step={0.5}
                            className="w-full"
                          />
                        </div>

                        <Separator />

                        {/* Disponibilité */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">Disponibilité</h3>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="openNow"
                              checked={filters.openNow}
                              onCheckedChange={(checked) => setFilters(prev => ({ ...prev, openNow: !!checked }))}
                            />
                            <label htmlFor="openNow" className="font-light text-gray-700">
                              Ouvert maintenant
                            </label>
                          </div>
                        </div>

                        <Separator />

                        {/* Fonctionnalités */}
                        <div>
                          <h3 className="font-light text-gray-900 mb-4">Fonctionnalités</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {features.slice(0, 12).map(feature => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature}
                                  checked={filters.features.includes(feature)}
                                  onCheckedChange={() => handleFeatureFilter(feature)}
                                />
                                <label htmlFor={feature} className="font-light text-gray-700 text-sm">
                                  {feature}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-full font-light"
                            onClick={clearFilters}
                          >
                            Effacer
                          </Button>
                          <Button className="flex-1 bg-gray-900 hover:bg-gray-800 rounded-full font-light">
                            Appliquer
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grille ou liste des établissements */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {sortedEstablishments.map((establishment, index) => (
            <motion.div
              key={establishment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/establishment/${establishment.id}`} className="group block">
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white ${
                  viewMode === 'grid' ? 'group-hover:scale-105' : ''
                }`}>
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <div className="aspect-[4/3] relative bg-gray-100">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTk2MTI0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={establishment.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Rating badge */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-900">{establishment.rating}</div>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mx-auto" />
                            </div>
                          </div>

                          {establishment.verified && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-blue-500/90 backdrop-blur-sm text-white border-0">
                                Vérifié
                              </Badge>
                            </div>
                          )}

                          {establishment.openNow && (
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-green-500/90 backdrop-blur-sm text-white border-0">
                                Ouvert
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-light text-gray-900 mb-2">{establishment.name}</h3>
                          <p className="text-gray-500 font-light mb-2">{establishment.type}</p>
                          <p className="text-sm text-gray-400 font-light mb-3">{establishment.category}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-400 font-light mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{establishment.distance} km</span>
                            </div>
                            <div>{establishment.reviews} avis</div>
                            <div>{establishment.priceSymbol}</div>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {establishment.features.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {establishment.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{establishment.features.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Availability */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            <span className="text-gray-600 font-light">Disponible {establishment.nextAvailable}</span>
                          </div>
                        </div>

                        <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light">
                          Voir les créneaux
                        </Button>
                      </CardContent>
                    </>
                  ) : (
                    /* Vue liste */
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTk2MTI0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={establishment.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-light text-gray-900">{establishment.name}</h3>
                                {establishment.verified && (
                                  <Badge className="bg-blue-500 text-white border-0 text-xs">
                                    Vérifié
                                  </Badge>
                                )}
                                {establishment.openNow && (
                                  <Badge className="bg-green-500 text-white border-0 text-xs">
                                    Ouvert
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-500 font-light mb-1">{establishment.type} • {establishment.category}</p>
                              <div className="flex items-center text-sm text-gray-400 font-light mb-3">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{establishment.distance} km • {establishment.reviews} avis • {establishment.priceSymbol}</span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-full px-3 py-1 border border-gray-200">
                              <div className="flex items-center space-x-1 text-sm font-medium text-gray-900">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{establishment.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {establishment.features.slice(0, 4).map(feature => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {establishment.features.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{establishment.features.length - 4} autres
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 mr-2 text-green-500" />
                              <span className="text-gray-600 font-light">Disponible {establishment.nextAvailable}</span>
                            </div>
                            
                            <Button className="h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light">
                              Voir les créneaux
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* État vide */}
        {sortedEstablishments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">
              Aucun établissement trouvé
            </h3>
            <p className="text-gray-500 font-light mb-8">
              Essayez de modifier vos critères de recherche ou filtres
            </p>
            <Button 
              onClick={clearFilters}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 font-light"
            >
              Effacer les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}