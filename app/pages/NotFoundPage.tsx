import { Link } from 'react-router';
import { Button } from '../components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 404 géant */}
          <div className="mb-8">
            <h1 className="text-9xl font-extralight text-gray-200 mb-4">404</h1>
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Page introuvable
            </h2>
            <p className="text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-200 rounded-full font-light"
              asChild
            >
              <Link to="/search">
                <Search className="mr-2 w-4 h-4" />
                Explorer les établissements
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full h-12 rounded-full font-light text-gray-500"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Page précédente
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400 font-light mb-4">
              Liens utiles :
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/business-signup" className="text-gray-500 hover:text-gray-700 font-light">
                Ajouter mon établissement
              </Link>
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 font-light">
                Mon compte
              </Link>
              <Link to="/appointments" className="text-gray-500 hover:text-gray-700 font-light">
                Mes réservations
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}