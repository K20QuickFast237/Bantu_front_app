const Footer = () => {
    return (
        <footer className="bg-[#0A2342] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="group cursor-pointer">
                        <div className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors duration-300">
                            Bantulink
                        </div>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            La plateforme qui connecte les talents aux opportunités et les vendeurs aux acheteurs.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer">BantuHire</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Chercher un emploi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Publier une offre</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Entreprises</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer">BantuMarket</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Vendre</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Acheter</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Catégories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Centre d'aide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Conditions</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                        © 2025 Bantulink. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;