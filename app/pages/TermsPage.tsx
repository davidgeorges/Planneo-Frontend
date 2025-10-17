import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-6 rounded-full font-light"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour
              </Link>
            </Button>
            
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Conditions d'utilisation
            </h1>
            <p className="text-gray-500 font-light">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="prose prose-gray max-w-none">
                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">1. Acceptation des conditions</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    En utilisant Planneo, vous acceptez les présentes conditions d'utilisation. 
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">2. Description du service</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Planneo est une plateforme de réservation en ligne qui permet aux utilisateurs 
                    de réserver des services dans différents établissements (restaurants, salons de coiffure, 
                    salles de sport, etc.).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">3. Compte utilisateur</h2>
                  <div className="text-gray-600 font-light leading-relaxed space-y-3">
                    <p>Pour utiliser certaines fonctionnalités, vous devez créer un compte :</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Vous devez fournir des informations exactes et complètes</li>
                      <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
                      <li>Vous devez nous informer immédiatement de toute utilisation non autorisée</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">4. Réservations</h2>
                  <div className="text-gray-600 font-light leading-relaxed space-y-3">
                    <p>Concernant les réservations :</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Les réservations sont soumises à la disponibilité</li>
                      <li>Vous recevrez une confirmation par email</li>
                      <li>Les annulations doivent respecter les politiques de chaque établissement</li>
                      <li>Planneo n'est pas responsable des services fournis par les établissements</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">5. Paiements</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Les paiements peuvent être effectués en ligne ou directement dans l'établissement, 
                    selon les modalités définies par chaque partenaire. Planneo peut percevoir 
                    des frais de service dans certains cas.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">6. Propriété intellectuelle</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Tous les contenus de la plateforme (textes, images, logos, etc.) sont protégés 
                    par les droits de propriété intellectuelle et appartiennent à Planneo ou à ses partenaires.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">7. Limitation de responsabilité</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Planneo agit en tant qu'intermédiaire entre les utilisateurs et les établissements. 
                    Nous ne sommes pas responsables de la qualité des services fournis par nos partenaires.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">8. Modification des conditions</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous nous réservons le droit de modifier ces conditions à tout moment. 
                    Les modifications prendront effet dès leur publication sur la plateforme.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">9. Contact</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Pour toute question concernant ces conditions d'utilisation, 
                    vous pouvez nous contacter à : legal@planneo.fr
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 font-light"
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