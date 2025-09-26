import { User, Download, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

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

const App = () => {
  const { user } = useAuth();

  // FIX ULTIME : Logique display robuste - prénom + nom si OK, sinon nom seul, sinon fallback
  let displayName = "Utilisateur";
  let displayWelcome = "UTILISATEUR";
  if (user) {
    const prenomPart = user.prenom ? `${user.prenom} ` : '';
    const nomPart = user.nom || '';
    displayName = (prenomPart + nomPart).trim() || "Utilisateur";
    displayWelcome = (prenomPart + nomPart).toUpperCase().trim() || "UTILISATEUR";
  }

  // Debug : Vérifie ce qui s'affiche (retire en prod)
  console.log('Display name calculé:', displayName, 'Welcome:', displayWelcome, 'User data:', user);

  return (
    <div className="w-full mx-auto py-6 px-10 space-y-8 bg-background font-sans text-gray-800">
      {/* Welcome Header - Nom dynamique avec fix ultime */}
      <div>
        <h1 className="text-2xl font-bold space-x-1 text-[#10B981] mb-2">Bienvenue {displayWelcome}</h1>
        <p className="text-sm font-semibold">Vos statistiques</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="mt-8 ml-8">
            <div className='flex'>
                <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center ">
              <User className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">15</div>
            </div>
            <div className="text-lg text-gray-800 mt-2 mb-2">Candidatures en cours</div>
            <button className="text-lg text-[#10B981] underline">Voir plus →</button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="mt-8 ml-8">
            <div className='flex'>
                <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex items-center justify-center ">
              <Download className="w-6 h-6 text-gray-900" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">01</div>
            </div>
            <div className="text-lg text-gray-800 mt-2 mb-2">Opportunités reçues</div>
            <button className="text-lg text-[#10B981] underline">Voir plus →</button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="mt-8 ml-8">
            <div className='flex'>
                <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex items-center justify-center ">
              <Bookmark className="w-6 h-6 text-gray-900" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1  ml-3 mt-2">05</div>
            </div>
            <div className="text-lg text-gray-800 mt-2 mb-2">Candidatures sauvegardées</div>
            <button className="text-lg text-[#10B981] underline">Voir plus →</button>
          </CardContent>
        </Card>
      </div>

      {/* Profile Visibility Section */}
      <div className="space-y-4 p-3 rounded-2xl border-2 border-solid ">
        <h2 className="text-lg font-semibold text-red-500">Votre profil est visible par les recruteurs.</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className=" font-bold text-gray-900">Rendre mon profil visible des recruteurs</span>
            <div className="flex items-center space-x-2 ">
              <Button
                variant="default"
                size="sm"
                className="bg-[#10B981] text-white px-4 py-1 h-8 text-xs"
              >
                Oui
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-4 py-1 h-8 text-xs"
              >
                Non
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className=" font-bold text-gray-900">Recevoir des recommandations d'offres d'emploi</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                className="bg-[#10B981] hover:bg-green-600 text-white px-4 py-1 h-8 text-xs"
              >
                Oui
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-4 py-1 h-8 text-xs"
              >
                Non
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section - Nom dynamique avec fix ultime */}
      <section className='flex flex-col items-center justify-center space-y-4 border-2 border-solid p-4 rounded-2xl'>
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-yellow-400 overflow-hidden border-4 border-yellow-200">
          <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl ">{displayName}</h3>
          <p className="text-sm text-gray-900 mb-3">Concepteur Développeur d'Applications</p>
          
          <Link to={"/profil"}>
             <Button className="bg-[#10B981] text-white px-6 py-2 text-sm">
            Voir mon profil
          </Button>
          </Link>
          
          <div className="mt-2">
            <span className="text-lg font-semibold text-gray-900">Profil complété à </span>
            <span className="text-3xl font-bold text-orange-500">50%</span>
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