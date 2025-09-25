import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EmailSecureIcon from '../../assets/emailsecure.png';

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successResend, setSuccessResend] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail: contextVerify } = useAuth();

  const emailAddress = location.state?.email || 'Votre email';

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const handleVerifyEmail = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Code incomplet');
      return;
    }
    setLoading(true);
    setError('');

    // Simulation pour test (sans backend réel) : Code hardcoded "123456" pour succès
    const SIMULATED_CODE = '123456';
    if (fullCode !== SIMULATED_CODE) {
      setError('Code invalide. Utilisez 123456 pour tester.');
      setLoading(false);
      return;
    }

    // Si code OK, simule login (user fictif + token vide pour test)
    const result = await contextVerify(emailAddress, fullCode);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleResendCode = () => {
    setSuccessResend(true);
    setTimeout(() => setSuccessResend(false), 3000);
    console.log('Code renvoyé (simulation). Utilisez 123456.');
  };

  const handleChangeEmail = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <img src={EmailSecureIcon} alt="Email sécurisé" className="w-24 h-24 object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vérifiez votre adresse e-mail</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Nous venons d'envoyer un code de confirmation
          à votre adresse email <span className="font-semibold">{emailAddress}</span>.
          <br /><small className="text-gray-500">(Pour test : Utilisez le code 123456)</small>
        </p>

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

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <p className="text-gray-500 mb-6 text-sm">
          <span className="font-semibold">Email incorrect ?</span>{' '}
          <button
            onClick={handleChangeEmail}
            className="text-green-600 hover:text-green-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Changez ici
          </button>
        </p>

        <button
          onClick={handleVerifyEmail}
          disabled={loading || code.join('').length !== 6}
          className="w-full bg-[#10B981] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg
                     shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4 disabled:opacity-50"
        >
          {loading ? 'Vérification...' : 'Vérifier l\'email'}
        </button>

        <button
          onClick={handleResendCode}
          disabled={loading}
          className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50"
        >
          Renvoyer le code
        </button>
        {successResend && <p className="text-green-500 text-sm mt-2">Code renvoyé ! (123456)</p>}
      </div>
    </div>
  );
};

export default EmailVerification;