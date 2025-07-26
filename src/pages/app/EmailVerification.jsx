import React, { useState, useRef } from 'react';
// Assurez-vous que le chemin est correct en fonction de votre structure de projet
import EmailSecureIcon from '../../assets/emailsecure.png'; // Renommage pour être plus descriptif

const EmailVerification = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']); // Array pour chaque chiffre du code
    const inputRefs = useRef([]); // Références pour chaque input afin de gérer le focus

    const emailAddress = "tadzongmbipeabraham@gmail.com"; // L'adresse email à afficher

    const handleChange = (e, index) => {
        const value = e.target.value;
        // Permet seulement un chiffre par input
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Passer au champ suivant si un chiffre est saisi et qu'il n'est pas le dernier
        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Retour arrière : efface le champ actuel et passe au précédent
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            e.preventDefault(); // Empêche le comportement par défaut de backspace
            inputRefs.current[index - 1]?.focus();
            const newCode = [...code];
            newCode[index - 1] = ''; // Efface le champ précédent
            setCode(newCode);
        }
    };

    const handleVerifyEmail = () => {
        const fullCode = code.join('');
        console.log("Code de confirmation saisi :", fullCode);
        // Ici, vous intégreriez votre logique d'API pour vérifier le code
        alert(`Vérification du code: ${fullCode}`);
    };

    const handleResendCode = () => {
        console.log("Renvoyer le code.");
        // Ici, vous intégreriez votre logique d'API pour renvoyer le code
        alert("Nouveau code envoyé !");
    };

    const handleChangeEmail = () => {
        console.log("Changer l'email.");
        // Ici, vous intégreriez votre logique pour permettre à l'utilisateur de changer l'email
        alert("Redirection pour changer l'email.");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                {/* Icône de l'email sécurisé */}
                <div className="mb-6 flex justify-center">
                    <img src={EmailSecureIcon} alt="Email sécurisé" className="w-24 h-24 object-contain" />
                </div>

                {/* Titre */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Vérifiez votre adresse e-mail</h1>

                {/* Description avec l'adresse email */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Nous venons d'envoyer un code de confirmation
                    à votre adresse email <span className="font-semibold">{emailAddress}</span>
                </p>

                {/* Champs de saisie du code */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={el => inputRefs.current[index] = el}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold text-gray-800
                                       border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1
                                       focus:ring-green-500 outline-none transition-all duration-200
                                       bg-gray-100 placeholder-gray-400"
                            aria-label={`Code digit ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Lien "Email incorrect ?" */}
                <p className="text-gray-500 mb-6 text-sm">
                    <span className="font-semibold">Email incorrect ?</span>{' '}
                    <button
                        onClick={handleChangeEmail}
                        className="text-green-600 hover:text-green-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Changez ici
                    </button>
                </p>

                {/* Bouton de vérification */}
                <button
                    onClick={handleVerifyEmail}
                    className="w-full bg-[#10B981] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg
                               shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
                >
                    Vérifier l'email
                </button>

                {/* Lien "Renvoyer le code" */}
                <button
                    onClick={handleResendCode}
                    className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                    Renvoyer le code
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;