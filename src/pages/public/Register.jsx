import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock } from 'lucide-react'; 
import { useFormik } from 'formik';
import { validationRegisterSchema } from '../../schemas';

// Importation des images depuis le dossier assets
// Assurez-vous que ces fichiers existent dans le répertoire '../assets/' par rapport à ce composant
import personnesImage from '../../assets/personnes.png'; // Image d'illustration sur le panneau de gauche
import googleLogo from '../../assets/google.png';       // Logo Google
import appleLogo from '../../assets/apple.png';        // Logo Apple
import facebookLogo from '../../assets/facebook.png';      // Logo Facebook
import PageWrapper from '../../components/public/PageWrapper';
import { registerUser } from '../../services/auth';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      await registerUser(values);
      toast.success("Inscription réussie !", {
        description: "Un code de verification vous a ete envoye par mail, verifier votre boite courriel",
        duration: 3000,
      });
      setTimeout(() => {
        actions.resetForm();
        navigate('/EmailVerification', { state: { email: values.email } });
      }, 1000);
    } catch (err) {
      toast.error("Erreur lors de l'inscription", {
        description: `${err.response.data.message}` || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        duration: 5000,
      });
    } 
  };

  const {values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit} = useFormik({
    initialValues: {
      nom: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit,
  });
  return (
    // Conteneur principal de la page. Prend toute la hauteur de l'écran.
    // Utilise flexbox pour diviser en deux colonnes.
    // Le fond général de la page est un gris très clair, presque blanc, comme dans l'image.
    <PageWrapper>

      <div className="min-h-screen flex bg-gray-50 font-sans"> 

      {/* Section gauche : Illustration avec l'image personnes.png */}
      {/* Cachée sur mobile, affichée en mode flex sur les écrans larges (lg) */}
      {/* Le fond de cette section est blanc pur. */}
      {/* C'est ici que la flèche "Retour" sera placée, en haut à gauche de ce panneau. */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white px-8 relative"> {/* Ajout de 'relative' ici pour le positionnement absolu de la flèche */}
        {/* Flèche de retour : Positionnée de manière absolue en haut à gauche de ce panneau BLANC. */}
        <div className="absolute top-8 left-4 sm:left-6 lg:left-8"> {/* Ajuster les valeurs left si nécessaire pour le pixel perfect */}
          <a href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 group"> {/* Couleur de texte pour le "Retour" fidèle à l'image (noir/gris foncé) */}
            {/* Icône de flèche SVG pour une personnalisation précise de la forme et de l'animation. */}
            <svg className="h-5 w-5 mr-2 transform -rotate-180 group-hover:rotate-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            Retour
          </a>
        </div>
        <img 
          src={personnesImage} // Utilisation de l'image "personnes.png"
          alt="Illustration de personnes travaillant ensemble" 
          className="max-w-full h-auto object-contain" // Permet à l'image de s'adapter tout en conservant ses proportions
        />
      </div>

      {/* Section droite : Formulaire d'enregistrement */}
      {/* Cette section prend l'espace restant. Son fond est un bleu très profond (bg-blue-950). */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:py-24 lg:px-16 bg-blue-950"> 
        <div className="mx-auto w-full max-w-md">
          {/* Le bouton retour n'est plus ici, il est dans la section gauche */}

          <div className=""> {/* Marge supérieure pour éloigner le contenu du haut de la page. */}
            {/* Titre "Créer mon compte" : Centré, texte blanc, très gras et grande taille. */}
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center"> 
              Créer mon compte
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete='off'>
              {/* Champs Nom et Prénom : Utilisent une grille pour un affichage côte à côte sur les écrans plus grands. */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-300"> {/* Label en gris clair. */}
                    Nom
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    {/* Icône de l'utilisateur : Maintenant DANS un carré orange, icône blanche. */}
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center"> {/* Carré orange avec padding */}
                        <UserIcon className="h-4 w-4 text-white" aria-hidden="true" /> {/* Icône blanche, taille réduite si nécessaire */}
                      </div>
                    </div>
                    <input
                      id="nom"
                      name="nom"
                      value={values.nom}
                      onChange={handleChange}
                      type="text"
                      autoComplete="family-name"
                      required
                      className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.nom && touched.nom ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')} // Fond blanc, bordure très fine et claire. pl-12 pour laisser de la place au carré orange
                      placeholder="Entrez votre nom"
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.nom && touched.nom && (
                    <div className="text-red-500">{errors.nom}</div>
                  )}
                </div>
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {/* Icône de mail : Maintenant DANS un carré orange, icône blanche. */}
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                     <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                     </div>
                  </div>
                  <input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                    required
                    className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.email && touched.email ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')} 
                    placeholder="Entrez votre adresse email"
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {/* Icône de cadenas : Maintenant DANS un carré orange, icône blanche. */}
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                     <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-white" aria-hidden="true" />
                     </div>
                  </div>
                  <input
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    autoComplete="new-password"
                    required
                    className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.password && touched.password ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')} 
                    placeholder="Entrez votre mot de passe"
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>)}
              </div>

              {/* Champ Confirmer le mot de passe */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                  Confirmer le mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {/* Icône de cadenas : Maintenant DANS un carré orange, icône blanche. */}
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                     <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-white" aria-hidden="true" />
                     </div>
                  </div>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    type="password"
                    autoComplete="new-password"
                    required
                    className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.password_confirmation && touched.password_confirmation ? ' border-red-500 focus:ring-red-500 focus:border-red-500 ' : '')} 
                    placeholder="Confirmez votre mot de passe"
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password_confirmation && touched.password_confirmation && (
                  <div className="text-red-500">{errors.password_confirmation}</div>
                )}
              </div>

              {/* Bouton S'inscrire : Grand bouton orange vif, texte blanc. */}
              <div>
              <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors duration-200" 
                >
                {isSubmitting ? <ClipLoader size={22} color="#fff" /> : "S'inscrire"}
                </button>
              </div>
            </form>

            {/* Séparateur "Continuer avec" : Ligne horizontale fine avec texte au milieu. */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700" /> {/* Bordure de couleur gris foncé. */}
              </div>
              <div className="relative flex justify-center text-sm">
                {/* Le texte est sur un fond de la même couleur que le panneau droit pour un effet "découpé". */}
                <span className="px-2 bg-blue-950 text-gray-400"> 
                  Continuer avec
                </span>
              </div>
            </div>

            {/* Boutons de connexion sociale : Disposés sur 3 colonnes sur les écrans moyens et plus. */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"> 
              {/* Bouton Google : Fond blanc, bordure très claire, texte gris foncé, logo couleur. */}
              <div>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <img src={googleLogo} alt="Google logo" className="h-5 w-5 mr-3" /> 
                  Google
                </button>
              </div>
              {/* Bouton Apple : Fond blanc, bordure très claire, texte gris foncé, logo couleur. */}
              <div>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <img src={appleLogo} alt="Apple logo" className="h-5 w-5 mr-3" /> 
                  Apple
                </button>
              </div>
              {/* Bouton Facebook : Fond bleu spécifique de Facebook, bordure bleue, texte blanc, logo blanc. */}
              <div>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 transition-colors duration-200">
                  <img src={facebookLogo} alt="Facebook logo" className="h-5 w-5 mr-3" /> 
                  Facebook
                </button>
              </div>
            </div>

            {/* Lien "Déjà inscrit ?" : Texte gris clair, avec le lien "Se connecter" en bleu-violet. */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Déjà inscrit ?{' '}
              <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Register;