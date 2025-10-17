import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Calendar, MapPin, Star, Clock, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '../image/ImageWithFallback';
import { motion } from 'motion/react';

export default function HomePage() {
  const categories = [
    { name: 'Restaurants', count: 1245, emoji: '🍽️', color: 'from-orange-400 to-red-500' },
    { name: 'Beauté', count: 892, emoji: '✨', color: 'from-pink-400 to-purple-500' },
    { name: 'Sport', count: 567, emoji: '💪', color: 'from-blue-400 to-cyan-500' },
    { name: 'Santé', count: 789, emoji: '🏥', color: 'from-green-400 to-emerald-500' },
  ];

  const featuredEstablishments = [
    {
      id: 1,
      name: 'Le Petit Bistrot',
      type: 'Restaurant',
      rating: 4.9,
      distance: '0.3 km',
      nextAvailable: 'Ce soir 19h30',
      verified: true,
    },
    {
      id: 2,
      name: 'Fitness Club Premium',
      type: 'Salle de sport',
      rating: 4.7,
      distance: '0.8 km',
      nextAvailable: 'Demain 8h00',
      verified: true,
    },
    {
      id: 3,
      name: 'Salon Élégance',
      type: 'Salon de coiffure',
      rating: 4.9,
      distance: '0.5 km',
      nextAvailable: 'Aujourd\'hui 14h30',
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Ultra minimal */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 tracking-tight">
              Planneo
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              Réservez partout, simplement
            </p>
          </motion.div>
          
          {/* Search minimal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Que recherchez-vous ?"
                className="pl-14 pr-6 h-16 text-lg bg-white border-gray-200 rounded-full shadow-lg focus:shadow-xl transition-all duration-300 focus:border-gray-300"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 h-12 w-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white p-0"
                asChild
              >
                <Link to="/search">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats minimaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center gap-12 text-gray-400 text-sm"
          >
            <div>8K+ établissements</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>500K+ réservations</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>4.8★ moyenne</div>
          </motion.div>
        </div>

        {/* Scroll indicator minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-300 animate-bounce" />
        </motion.div>
      </section>

      {/* Categories - Design ultra épuré */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Explorez
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Tous vos besoins en un seul endroit
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/search?category=${category.name.toLowerCase()}`}>
                  <Card className="group border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-gray-50 hover:bg-white">
                    <CardContent className="p-12 text-center">
                      <div className="text-4xl mb-6">{category.emoji}</div>
                      <h3 className="text-xl font-light text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-400 text-sm font-light">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured establishments - Style carte produit */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Sélection
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Établissements recommandés près de vous
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {featuredEstablishments.map((establishment, index) => (
              <motion.div
                key={establishment.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link to={`/establishment/${establishment.id}`} className="group block">
                  <Card className="border-0 shadow-none hover:shadow-2xl transition-all duration-700 bg-white group-hover:scale-105">
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <div className="aspect-[4/3] relative bg-gray-100">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbiUyMGx1eHVyeXxlbnwxfHx8fDE3NTk2MTI0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt={establishment.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Rating badge minimal */}
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{establishment.rating}</div>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mx-auto" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-light text-gray-900 mb-2">{establishment.name}</h3>
                        <p className="text-gray-500 font-light mb-4">{establishment.type}</p>
                        <div className="flex items-center text-sm text-gray-400 font-light mb-4">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{establishment.distance}</span>
                        </div>
                      </div>
                      
                      {/* Availability */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-gray-600 font-light">Disponible {establishment.nextAvailable}</span>
                        </div>
                      </div>

                      <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light">
                        Réserver
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Ultra simple */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Simple
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Trois étapes pour réserver
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Explorez", description: "Découvrez les établissements près de vous" },
              { step: "02", title: "Choisissez", description: "Sélectionnez votre créneau idéal" },
              { step: "03", title: "Confirmez", description: "Votre réservation est validée instantanément" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-extralight text-gray-200 mb-6">{item.step}</div>
                <h3 className="text-xl font-light text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Minimal et élégant */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8">
              Commencez maintenant
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui simplifient leurs réservations avec Planneo
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-14 px-12 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-light text-lg" asChild>
                <Link to="/search">
                  Réserver maintenant
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="h-14 px-12 border-white/20 text-white hover:bg-white/5 rounded-full font-light text-lg" asChild>
                <Link to="/business-signup">
                  Ajouter mon établissement
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}