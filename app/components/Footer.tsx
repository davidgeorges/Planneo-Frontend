import { Link } from 'react-router';
import { Users, MessageCircle, Camera, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* À propos */}
          <div>
            <h3 className="text-2xl font-light mb-6">Planneo</h3>
            <p className="text-gray-300 font-light leading-relaxed mb-6">
              La plateforme universelle pour toutes vos réservations. 
              Restaurants, salons, sports, santé... tout en un seul endroit.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Users, href: '#', label: 'Facebook' },
                { icon: MessageCircle, href: '#', label: 'Twitter' },
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: Briefcase, href: '#', label: 'LinkedIn' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-light text-lg mb-6">Découvrir</h4>
            <div className="space-y-3">
              {[
                { name: 'Rechercher', path: '/search' },
                { name: 'Restaurants', path: '/search?category=restaurant' },
                { name: 'Beauté & Bien-être', path: '/search?category=beauty' },
                { name: 'Sport & Fitness', path: '/search?category=fitness' },
                { name: 'Santé', path: '/search?category=health' },
                { name: 'Services', path: '/search?category=services' }
              ].map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-300 hover:text-white font-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Compte */}
          <div>
            <h4 className="font-light text-lg mb-6">Mon compte</h4>
            <div className="space-y-3">
              {[
                { name: 'Se connecter', path: '/login' },
                { name: 'Créer un compte', path: '/signup' },
                { name: 'Mes réservations', path: '/appointments' },
                { name: 'Mon profil', path: '/dashboard' }
              ].map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-300 hover:text-white font-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-8">
              <h5 className="font-light text-base mb-4">Professionnels</h5>
              <Link
                to="/business-signup"
                className="block text-gray-300 hover:text-white font-light transition-colors"
              >
                Ajouter mon établissement
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-light text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-light">contact@planneo.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-light">01 23 45 67 89</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <span className="text-gray-300 font-light">
                  123 rue de la Tech<br />
                  75001 Paris, France
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="font-light text-base mb-4">Support</h5>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white font-light transition-colors">
                  Centre d'aide
                </a>
                <a href="#" className="block text-gray-300 hover:text-white font-light transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bas de page */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-6 lg:mb-0">
            <p className="text-gray-400 font-light">
              © {currentYear} Planneo. Tous droits réservés.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white font-light transition-colors"
            >
              Conditions d'utilisation
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white font-light transition-colors"
            >
              Politique de confidentialité
            </Link>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white font-light transition-colors"
            >
              Cookies
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white font-light transition-colors"
            >
              Plan du site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}