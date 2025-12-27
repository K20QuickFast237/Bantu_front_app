import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import JobCard from "@/components/app/JobCard";
import { useNavigate } from "react-router-dom";
import marcheImage from "@/assets/slide1.jpg";
import { Search, MapPin, Filter, Shield, Users, TrendingUp, UserPlus, BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/FooterHire";

const HireHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    { name: 'Informatique', icon: '💻', count: 320 },
    { name: 'Vente & Commerce', icon: '🛍️', count: 210 },
    { name: 'Marketing', icon: '📣', count: 150 },
    { name: 'Santé', icon: '🩺', count: 90 },
    { name: 'Finance', icon: '💰', count: 120 },
    { name: 'Administration', icon: '🏢', count: 75 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden px-20">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${marcheImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/50 to-secondary/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Bienvenue sur BantuHire</h1>
              <p className="text-xl text-white/90 mb-6">Trouvez des opportunités adaptées à vos compétences. Connectez-vous pour voir les détails complets et postuler.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" onClick={() => navigate('/all-jobs')} className="w-full sm:w-auto"><UserPlus className="mr-2 h-5 w-5" />Commencer a postuler</Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/auth?mode=register&type=candidate')} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white"><BriefcaseBusiness className="mr-2 h-5 w-5" />Devenir recruteur</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters + Featured jobs */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters (desktop) */}
              <div className="hidden lg:block col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Filtres</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Mots-clés</label>
                      <div className="mt-2 relative">
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Titre du poste, entreprise..." className="w-full border rounded-md p-2 pr-10" />
                        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Localisation</label>
                      <div className="mt-2 relative">
                        <input value={locationTerm} onChange={(e) => setLocationTerm(e.target.value)} placeholder="Ville, pays..." className="w-full border rounded-md p-2 pr-10" />
                        <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Type de contrat</label>
                      <select value={selectedContract} onChange={(e) => setSelectedContract(e.target.value)} className="w-full border rounded-md p-2">
                        <option value="">Tous</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Niveau d'études</label>
                      <select value={selectedEducation} onChange={(e) => setSelectedEducation(e.target.value)} className="w-full border rounded-md p-2">
                        <option value="">Tous</option>
                        <option value="Bac">Bac</option>
                        <option value="Bac+2">Bac+2</option>
                        <option value="Bac+3">Bac+3</option>
                        <option value="Bac+5">Bac+5</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => { /* les filtres sont appliqués en direct via props */ }} variant="secondary">Appliquer</Button>
                      <Button onClick={() => { setSearchTerm(''); setLocationTerm(''); setSelectedContract(''); setSelectedEducation(''); }} variant="outline">Réinitialiser</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job list */}
              <div className="col-span-1 lg:col-span-3">
                {/* Mobile filter toggle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="md:hidden">
                    <Button variant="outline" onClick={() => setShowMobileFilters((s) => !s)}>
                      {showMobileFilters ? 'Masquer filtres' : 'Afficher filtres'}
                    </Button>
                  </div>
                </div>

                {/* Mobile filters panel */}
                {showMobileFilters && (
                  <div className="mb-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold mb-3">Filtres</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Mots-clés</label>
                          <div className="mt-2 relative">
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Titre du poste, entreprise..." className="w-full border rounded-md p-2 pr-10" />
                            <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Localisation</label>
                          <div className="mt-2 relative">
                            <input value={locationTerm} onChange={(e) => setLocationTerm(e.target.value)} placeholder="Ville, pays..." className="w-full border rounded-md p-2 pr-10" />
                            <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Type de contrat</label>
                          <select value={selectedContract} onChange={(e) => setSelectedContract(e.target.value)} className="w-full border rounded-md p-2">
                            <option value="">Tous</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Stage">Stage</option>
                            <option value="Freelance">Freelance</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Niveau d'études</label>
                          <select value={selectedEducation} onChange={(e) => setSelectedEducation(e.target.value)} className="w-full border rounded-md p-2">
                            <option value="">Tous</option>
                            <option value="Bac">Bac</option>
                            <option value="Bac+2">Bac+2</option>
                            <option value="Bac+3">Bac+3</option>
                            <option value="Bac+5">Bac+5</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => { /* les filtres sont appliqués en direct via props */ }} variant="secondary">Appliquer</Button>
                          <Button onClick={() => { setSearchTerm(''); setLocationTerm(''); setSelectedContract(''); setSelectedEducation(''); setShowMobileFilters(false); }} variant="outline">Réinitialiser</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Offres recommandées</h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    Filtres appliqués
                  </div>
                </div>

                <JobCard
                  searchTerm={searchTerm}
                  locationTerm={locationTerm}
                  selectedContract={selectedContract}
                  selectedEducation={selectedEducation}
                  paginationEnabled={false}
                  limit={6}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-20">
            <h2 className="text-3xl font-bold text-center mb-8">Catégories d'offres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(`/all-jobs?category=${encodeURIComponent(category.name)}`)}>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} offres</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-20">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir BantuHire</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 text-center bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Employeurs vérifiés</h3>
                <p className="text-muted-foreground">Nous vérifions les entreprises pour réduire les offres frauduleuses et augmenter la confiance.</p>
              </div>

              <div className="p-6 text-center bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Grande communauté</h3>
                <p className="text-muted-foreground">Des milliers de recruteurs et candidats actifs pour augmenter vos chances de réussite.</p>
              </div>

              <div className="p-6 text-center bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Matching intelligent</h3>
                <p className="text-muted-foreground">Algorithme de matching pour vous proposer les offres les plus pertinentes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden px-20">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${marcheImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/60 to-secondary/70"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à trouver le talent ou le poste idéal ?</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">Publiez une offre en quelques minutes ou créez votre profil candidat pour recevoir des alertes personnalisées.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/auth?mode=register&type=recruiter')}
                className="w-full sm:w-auto"
              >
                Je suis candidat
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/auth?mode=register&type=candidate')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white"
              >
                Je suis recruteur
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HireHome;
