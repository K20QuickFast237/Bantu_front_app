import React from 'react';
import { Star } from 'lucide-react'; // Pour les étoiles de notation

// Importez vos images existantes
import LeftArrowIcon from '../assets/gauche.png';
import RightArrowIcon from '../assets/droite.png';
import ReginaMilesImage from '../assets/temoigne.png'; // L'image de la personne
import GraffittiRedIcon from '../assets/Grafitti.png'; 

// Nouvelle importation pour l'image du téléphone
import PhoneImage from '../assets/telephone.png'; // Assurez-vous que ce fichier existe

const TestimonialsSection = () => {
    // Les données de vos témoignages (vous pouvez en ajouter plus)
    const testimonials = [
        {
            id: 1,
            quote: "Bantulink vous aide à voir combien de jours supplémentaires il vous reste à travailler pour atteindre votre objectif.",
            name: "Regina Miles",
            role: "Designer",
            rating: 4, // Nombre d'étoiles
        },
        {
            id: 2,
            quote: "Une expérience incroyable ! L'équipe a dépassé toutes mes attentes. Je recommande vivement leurs services.",
            name: "John Doe",
            role: "Développeur",
            rating: 5,
        },
        {
            id: 3,
            quote: "Très satisfait du résultat final. La qualité est au rendez-vous et le support client est excellent.",
            name: "Jane Smith",
            role: "Entrepreneur",
            rating: 4,
        },
    ];

    return (
        <>
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <img src={GraffittiRedIcon} alt="Decorative lines" className="h-17 w-16 mt-[-40px] ml-90" />
            <div className="max-w-7xl mx-auto">
                {/* Titre et flèches de navigation - Partie existante, non modifiée */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <h2 className="text-4xl lg:text-3xl font-bold text-gray-800 text-center md:text-left leading-tight md:max-w-lg mb-8 md:mb-0">
                        Satisfaire Nos Clients Est <br className="hidden md:inline"/> Notre Meilleure Publicité.
                    </h2>
                    <div className="flex space-x-4">
                        <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200">
                            <img src={LeftArrowIcon} alt="Previous" className="w-6 h-6" />
                        </button>
                        <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200">
                            <img src={RightArrowIcon} alt="Next" className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Section des témoignages - Partie existante, non modifiée */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between h-full">
                            <div className="mb-6">
                                {/* Icône de citation */}
                                <span className="text-6xl text-blue-600 font-serif leading-none block relative -top-4 -left-2">“</span>
                                <p className="text-gray-700 text-lg leading-relaxed ">
                                    {testimonial.quote}
                                </p>
                            </div>
                            <hr className='border-gray-300 mb-1' />
                            <div>
                                {/* Informations de l'auteur */}
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-600 flex-shrink-0">
                                        {/* Utilisation de l'image de la personne dans le rond */}
                                        <img src={ReginaMilesImage} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                {/* Étoiles de notation */}
                                <div className="flex justify-center md:justify-start">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>

        
                {/* Nouvelle section "Jetez un œil à l'intérieur de notre SuperApp" */}
                <div className=" bg-blue-600 py-13 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    {/* Formes décoratives sur les côtés */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500 rounded-full opacity-30 blur-xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-700 rounded-full opacity-30 blur-xl translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-400 rounded-full opacity-40 blur-lg"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple-400 rounded-full opacity-40 blur-lg"></div>


                    <div className="relative z-10 flex flex-col items-center text-white text-center">
                        <h3 className="text-3xl sm:text-3xl font-medium mb-4">
                            Jetez un œil à l'intérieur de <br /> notre SuperApp
                        </h3>
                        <p className="text-lg mb-10 max-w-2xl">
                            Problème visant à résoudre le cloisonnement entre emploi, commerce local et développement de compétences en Afrique francophone.
                        </p>
                        <div className="relative w-full max-w-2xl flex justify-center items-end">
                            {/* Les deux images de téléphone superposées, avec l'image principale au milieu */}
                            <img 
                                src={PhoneImage} 
                                alt="SuperApp mobile interface" 
                                className="w-1/2 max-w-sm h-auto relative z-10" 
                            />
                        </div>
                    </div>
                </div>

        </>
    );
};

export default TestimonialsSection;