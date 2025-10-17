import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { Search, Calendar, User, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(true);

   const navigation = [
    { name: 'Explorer', href: '/search', icon: Search, requiresAuth: false },
    { name: 'Mes réservations', href: '/appointments', icon: Calendar, requiresAuth: true },
    { name: 'Mon compte', href: '/dashboard', icon: User, requiresAuth: true },
  ];

  // Filtre les items selon l'état de connexion
  const visibleNavigation = navigation.filter(item => {
    if (item.requiresAuth) {
      return isLoggedIn; // Affiche seulement si connecté
    }
    return true; // Affiche toujours si pas de restriction
  });

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo ultra simple */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-light text-gray-900 tracking-wide">Planneo</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {visibleNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-light">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">

            { isLoggedIn ?  <Button 
              variant="outline" 
              className="border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-full px-6 font-light"
              asChild
            >
              
              <Link to="/business-signup">Ajouter mon établissement</Link>
            </Button> : null }


            

            {isLoggedIn ?  null : <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 font-light"
              asChild
            >
              <Link to="/login">Connexion</Link>
            </Button> }

            {isLoggedIn ?  <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 font-light"
              asChild
            >
              <Link to="/logout">Déconnexion</Link>
            </Button> : null}
            
          </div>

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-10 h-10 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-light">{item.name}</span>
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-full font-light" 
                  asChild
                >
                  <Link to="/business-signup">Ajouter mon établissement</Link>
                </Button>
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light" 
                  asChild
                >
                  <Link to="/login">Connexion</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}