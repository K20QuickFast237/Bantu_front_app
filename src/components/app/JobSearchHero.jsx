import { User, Download, Bookmark, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion'; // Importer le hook
import api from '@/services/api';
import { toast } from 'sonner';
// Composant Button simplifié pour cet exemple
const Button = ({ variant, size, className, children, ...props }) => {
  let baseClasses = "rounded-md transition-colors font-medium";
  
  if (variant === "default") {
    baseClasses += " bg-primary hover:bg-primary/90 text-primary-foreground";
  } else if (variant === "outline") {
    baseClasses += " border border-input bg-background hover:bg-accent hover:text-accent-foreground";
  }
  
  if (size === "sm") {
    baseClasses += " h-8 px-3 text-xs";
  }
  
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Composant Card simplifié pour cet exemple
const Card = ({ className, children }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ className, children }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

const App = ({ onOpenProfileModal }) => {
  const { user, particulier } = useAuth();
  const { profileCompletion } = useProfileCompletion(); // Utiliser le hook
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);

  const handleVisibilityToggle = async (checked) => {
    setIsUpdatingVisibility(true);
    const newVisibility = checked ? 1 : 0;

    try {
      const response = await api.put('/profile/particulier', { is_visible: newVisibility });

      // Déclenche un événement pour que la page parente (Profil.jsx) rafraîchisse les données.
      window.dispatchEvent(new CustomEvent('profile-updated'));
      toast.success(`Votre profil est maintenant ${newVisibility === 1 ? 'visible' : 'caché'}.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la visibilité:", error.response?.data || error.message);
      toast.error("Erreur lors de la mise à jour de la visibilité.");
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  return (
    <div className="w-full mx-auto py-6 px-10 space-y-8 bg-background font-sans text-gray-800">
      {/* Welcome Header - Nom dynamique avec fix ultime */}
      <div>
        <h1 className="text-2xl font-bold space-x-1 text-[#10B981] mb-2">Bienvenue {user?.nom} {user?.prenom}</h1>
        <p className="text-sm font-semibold">Vos statistiques</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Link to="/mesCandidatures">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="mt-8 ml-8">
              <div className='flex'>
                  <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center ">
                <User className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">00</div>
              </div>
              <div className="text-lg text-gray-800 mt-2 mb-2">Candidatures en cours</div>
              <button className="text-lg text-[#10B981] underline">Voir plus →</button>
            </CardContent>
          </Card>
        </Link>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="mt-8 ml-8">
            <div className='flex'>
                <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex items-center justify-center ">
              <Download className="w-6 h-6 text-gray-900" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">00</div>
            </div>
            <div className="text-lg text-gray-800 mt-2 mb-2">Opportunités reçues</div>
            <button className="text-lg text-[#10B981] underline">Voir plus →</button>
          </CardContent>
        </Card>
        <Link to="/offresFavorites">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="mt-8 ml-8">
              <div className='flex'>
                  <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex items-center justify-center ">
                <Bookmark className="w-6 h-6 text-gray-900" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">00</div>
              </div>
              <div className="text-lg text-gray-800 mt-2 mb-2">Offres sauvegardées</div>
              <button className="text-lg text-[#10B981] underline">Voir plus →</button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Profile Visibility Section */}
      {particulier && Object.keys(particulier).length > 0 && (
        <div className="space-y-4 p-3 rounded-2xl border-2 border-solid ">
          <h2 className={`text-lg font-semibold ${particulier?.is_visible ? 'text-green-600' : 'text-red-500'}`}>
            {particulier?.is_visible ? "Votre profil est visible par les recruteurs." : "Votre profil est actuellement caché des recruteurs."}
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className=" font-bold text-gray-900">Rendre mon profil visible des recruteurs</span>
              {particulier?.is_visible ? (
                // Si le profil est visible, afficher un seul bouton pour le cacher
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-100 border-green-300 text-green-800 px-4 py-1 h-8 text-xs flex items-center gap-2 disabled:opacity-70"
                  onClick={() => handleVisibilityToggle(false)}
                  disabled={isUpdatingVisibility}
                >
                  {isUpdatingVisibility ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  Profil Visible
                </Button>
              ) : (
                // Si le profil est caché, afficher les deux options
                <div className="flex items-center space-x-2 ">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#10B981] text-white px-4 py-1 h-8 text-xs flex items-center justify-center w-16"
                    onClick={() => handleVisibilityToggle(true)}
                    disabled={isUpdatingVisibility}
                  >
                    {isUpdatingVisibility ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Oui'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-4 py-1 h-8 text-xs w-16"
                    onClick={() => handleVisibilityToggle(false)}
                    disabled={isUpdatingVisibility}
                  >
                    Non
                  </Button>
                </div>
              )}
            </div>
            {/* TODO */}
            {/* <div className="flex items-center justify-between">
              <span className=" font-bold text-gray-900">Recevoir des recommandations d'offres d'emploi</span>
              ...
            </div> */}
          </div>
        </div>
      )}

      {/* Profile Section - Nom dynamique avec fix ultime */}
      <section className='flex flex-col items-center justify-center space-y-4 border-2 border-solid p-4 rounded-2xl'>
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-yellow-400 overflow-hidden border-4 border-yellow-200">
          <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl ">{particulier?.name || user?.nom}</h3>
          <p className="text-sm text-gray-900 mb-3">{particulier?.titre_professionnel || 'Veillez completer votre profil'}</p>
          {particulier && Object.keys(particulier).length > 0 ? (
          <Link to={"/profil"}>
             <Button className="bg-[#10B981] text-white px-6 py-2 text-sm">
            Voir mon profil
          </Button>
          </Link>
          ) : (
          <Button onClick={onOpenProfileModal} className="bg-[#10B981] text-white px-6 py-2 text-sm">
            Compléter mon profil
          </Button>
          )}
          
          <div className="mt-2">
            <span className="text-lg font-semibold text-gray-900">Profil complété à </span>
            <span className="text-3xl font-bold text-orange-500">{profileCompletion}%</span>
          </div>
        </div>
      </div>
      </section>

      {/* Job Suggestions */}
      <div>
        <h2 className="text-xl font-bold text-[#10B981]">Suggestions de jobs en fonction de votre profil</h2>
      </div>
    </div>
  );
};

export default App;