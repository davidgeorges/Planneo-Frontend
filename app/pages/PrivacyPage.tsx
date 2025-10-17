import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Shield, Lock, Eye, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrivacyPage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-gray-500 font-light">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          {/* Points clés */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: 'Protection',
                description: 'Vos données sont protégées et sécurisées'
              },
              {
                icon: Lock,
                title: 'Chiffrement',
                description: 'Communications chiffrées end-to-end'
              },
              {
                icon: Eye,
                title: 'Transparence',
                description: 'Utilisation claire de vos données'
              },
              {
                icon: Trash2,
                title: 'Contrôle',
                description: 'Suppression de données à tout moment'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="font-light text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-light">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="prose prose-gray max-w-none">
                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">1. Collecte des données</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous collectons différents types de données pour vous fournir et améliorer notre service :
                  </p>
                  <div className="text-gray-600 font-light leading-relaxed">
                    <h3 className="font-medium text-gray-800 mb-2">Données que vous nous fournissez :</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>Informations de compte (nom, email, téléphone)</li>
                      <li>Préférences de réservation</li>
                      <li>Communications avec notre support</li>
                    </ul>
                    
                    <h3 className="font-medium text-gray-800 mb-2">Données collectées automatiquement :</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Données de navigation et d'utilisation</li>
                      <li>Adresse IP et informations de localisation</li>
                      <li>Données sur l'appareil utilisé</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">2. Utilisation des données</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous utilisons vos données personnelles pour :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                    <li>Gérer votre compte et vos réservations</li>
                    <li>Vous envoyer des confirmations et rappels</li>
                    <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
                    <li>Vous proposer des recommandations personnalisées</li>
                    <li>Assurer la sécurité de la plateforme</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">3. Partage des données</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous ne vendons jamais vos données personnelles. Nous pouvons les partager dans les cas suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                    <li>Avec les établissements pour vos réservations</li>
                    <li>Avec nos prestataires de services (hébergement, paiement)</li>
                    <li>Si requis par la loi ou pour protéger nos droits</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">4. Sécurité des données</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                    <li>Chiffrement des données en transit et au repos</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance continue de nos systèmes</li>
                    <li>Formation régulière de nos équipes</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">5. Vos droits</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                    <li><strong>Droit d'accès :</strong> consulter vos données personnelles</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données</li>
                    <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                    <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">6. Cookies</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez 
                    gérer vos préférences de cookies dans les paramètres de votre navigateur.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">7. Conservation des données</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Nous conservons vos données personnelles uniquement le temps nécessaire 
                    aux finalités pour lesquelles elles ont été collectées, ou selon les 
                    obligations légales applicables.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-light text-gray-900 mb-4">8. Contact</h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    Pour toute question concernant cette politique de confidentialité ou 
                    pour exercer vos droits, contactez-nous :
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <ul className="space-y-2 text-gray-600 font-light">
                      <li><strong>Email :</strong> privacy@planneo.fr</li>
                      <li><strong>Adresse :</strong> Planneo, 123 rue de la Tech, 75001 Paris</li>
                      <li><strong>DPO :</strong> dpo@planneo.fr</li>
                    </ul>
                  </div>
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