import { useState, useEffect } from 'react';
import Select from 'react-select';
import { 
  Home,
  Settings, User, Briefcase, GraduationCap, Award, 
  Bell, Save,
} from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';
import Experiences from '../../components/app/Experiences';
import DiplomesFormations from '../../components/app/DiplomesFormations';
import HeaderProfil from '@/components/app/HeaderProfil';
import PageWrapper from '@/components/public/PageWrapper';

// J'ai renommé 'Certifications' en 'Competences' pour correspondre à votre demande précédente.
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'profil', label: 'Configuration du Profil', icon: User, active: true },
    { id: 'experience', label: 'Expérience professionnelle', icon: Briefcase },
    { id: 'Formations', label: 'Formations', icon: GraduationCap },
    { id: 'Competences', label: 'Certications', icon: Award },
    { id: 'emploi', label: 'Alerte Emploi', icon: Bell },
  ];

  return(
    <aside className="lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-md p-4 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-2">Paramètres</h2>
        <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === item.id
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
      </div>
    </aside>
  );
};

// Options de compétences pour le composant Select
const skillOptions = [
  { value: 'react', label: 'React' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'gestion-de-projet', label: 'Gestion de projet' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'figma', label: 'Figma' },
  { value: 'sql', label: 'SQL' },
  { value: 'devops', label: 'DevOps' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'communication', label: 'Communication' },
];

const ProfileView = () => {
  const [firstName, setFirstName] = useState('Jospin Duclair');
  const [lastName, setLastName] = useState('NANFACK');
  const [aboutMe, setAboutMe] = useState('');
  const [location, setLocation] = useState('Douala, Littoral, Cameroon');
  const [lastSchool, setLastSchool] = useState('');
  const [lastCompany, setLastCompany] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('Aucun');
  // L'état des compétences est maintenant un tableau d'objets
  const [skills, setSkills] = useState([
    { value: 'react', label: 'React' }, { value: 'nodejs', label: 'Node.js' }
  ]);
  const [languages, setLanguages] = useState('');


  return (
    <>
      {/* Profile Banner */}
      <div className="relative mb-8">
        <div className="relative h-48 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 rounded-lg overflow-hidden">
          {/* Bokeh effect overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-8 w-6 h-6 bg-white rounded-full blur-sm"></div>
            <div className="absolute top-12 right-16 w-3 h-3 bg-pink-200 rounded-full blur-sm"></div>
            <div className="absolute top-20 left-20 w-8 h-8 bg-purple-200 rounded-full blur-md"></div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full blur-sm"></div>
            <div className="absolute top-32 right-12 w-6 h-6 bg-pink-300 rounded-full blur-md"></div>
            <div className="absolute top-16 left-6 w-2 h-2 bg-white rounded-full blur-sm"></div>
            <div className="absolute bottom-8 left-14 w-10 h-10 bg-purple-300 rounded-full blur-lg"></div>
            <div className="absolute bottom-16 right-10 w-8 h-8 bg-pink-200 rounded-full blur-lg"></div>
          </div>
          
          {/* Profile Info */}
          <div className="relative z-10 flex items-end h-full p-6">
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                alt="Jospin Duclair NANFACK"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="text-white">
                <h2 className="text-xl font-bold mb-1">Jospin Duclair NANFACK</h2>
                <p className="text-purple-100">@nanfackjospinduclair</p>
              </div>
            </div>
            
            <div className="ml-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Save size={16} />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
              placeholder="Votre prénom"
            />
          </div>

          {/* Nom de famille */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de famille
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
              placeholder="Votre nom de famille"
            />
          </div>

          {/* À propos de moi */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              À propos de moi
            </label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors resize-none"
              placeholder="Parlez-nous de vous..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Décrivez-vous en quelques mots pour que les autres puissent mieux vous connaître.
            </p>
          </div>

          {/* Lieu de résidence */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Votre lieu de résidence</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
          </div>

          {/* Dernière école fréquentée */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dernière école fréquentée</label>
            <input type="text" value={lastSchool} onChange={(e) => setLastSchool(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
          </div>

          {/* Dernière entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dernière entreprise</label>
            <input type="text" value={lastCompany} onChange={(e) => setLastCompany(e.target.value)} placeholder="e.g. Apple" className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
          </div>

          {/* Site Web de l'entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Web de l'entreprise</label>
            <input type="url" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
          </div>

          {/* Site Web personnel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Web</label>
            <input type="url" value={personalWebsite} onChange={(e) => setPersonalWebsite(e.target.value)} placeholder="https://mon-portfolio.com" className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
          </div>

          {/* Relation */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
            <select value={relationshipStatus} onChange={(e) => setRelationshipStatus(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors">
              <option>Aucun</option>
              <option>Célibataire</option>
              <option>En couple</option>
              <option>Marié(e)</option>
              <option>C'est compliqué</option>
            </select>
          </div>

          {/* Compétences */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences
            </label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              value={skills}
              onChange={setSkills}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Sélectionnez ou tapez vos compétences..."
              noOptionsMessage={() => "Aucune compétence trouvée"}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#f3f4f6', // bg-gray-100
                  borderColor: '#e5e7eb', // border-gray-200
                  padding: '0.35rem',
                  borderRadius: '0.5rem',
                  '&:hover': {
                    borderColor: '#d1d5db', // border-gray-300
                  },
                  boxShadow: 'none',
                }),
                input: (base) => ({
                  ...base, 'input:focus': { boxShadow: 'none' }
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#e0f2fe',
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#0c4a6e',
                }),
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Commencez à taper pour rechercher et ajouter des compétences.
            </p>
          </div>

          {/* Langues */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langues
            </label>
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
              placeholder="Ex: Français, Anglais, Ewondo..."
            />
             <p className="text-sm text-gray-500 mt-2">
              Séparez les langues par des virgules.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

const GeneralView = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user && user.id) {
      // Pré-remplir avec les données de base de l'utilisateur
      setUsername(user.nom || '');
      setEmail(user.email || '');

      // Charger les données complétées depuis le localStorage
      const profileDataString = localStorage.getItem(`user_${user.id}_profile`);
      if (profileDataString) {
        const profileData = JSON.parse(profileDataString);
        setPhone(profileData.telephone || '');
        setBirthday(profileData.date_naissance || '');
        setGender(profileData.sexe || '');
        setCountry(profileData.pays || '');
        setCity(profileData.ville || '');
        setAddress(profileData.adresse || '');
        // Le champ 'region' n'est pas dans le formulaire de complétion, il reste vide ou à gérer autrement.
      }
    }
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Paramètres Généraux</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Save size={16} />
          <span>Sauvegarder</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom d'utilisateur */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Anniversaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Anniversaire</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Sexe */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
          <div className="flex items-center space-x-6">
            {['Homme', 'Femme'].map((g) => (
              <label key={g} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pays */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors">
            <option>Cameroon</option>
            <option>France</option>
            <option>Nigeria</option>
          </select>
        </div>

        {/* Région */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Région / Province / État*</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors">
            <option>Littoral</option>
            <option>Centre</option>
            <option>Ouest</option>
          </select>
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ville*</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adresse (Ex: Makepe)</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors" />
        </div>
      </div>
    </div>
  );
};

const ExperienceView = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Expérience Professionnelle</h1>
      </div>
      <Experiences />
    </div>
  );
};

const FormationsView = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Formations</h1>
      </div>
      <DiplomesFormations />
    </div>
  );
};

const PlaceholderView = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    <p className="mt-4 text-gray-600">Contenu pour {title} à venir...</p>
  </div>
);

const renderActiveView = (activeMenu) => {
  switch (activeMenu) {
    case 'profil':
      return <ProfileView />;
    case 'general':
      return <GeneralView />;
    case 'experience':
      return <ExperienceView />;
    case 'Formations':
      return <FormationsView />;
    case 'Competences':
      return <PlaceholderView title="Compétences" />;
    case 'emploi':
      return <PlaceholderView title="Alerte Emploi" />;
    default:
      return <ProfileView />;
  }
};

export default function ProfileConfiguration() {
  const [activeMenu, setActiveMenu] = useState('profil');

  return (
    <PageWrapper>
      <HeaderProfil />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-md">
              {renderActiveView(activeMenu)}
            </div>
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}