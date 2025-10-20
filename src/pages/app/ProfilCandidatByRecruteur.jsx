import React from 'react';
import { Mail, Phone, MapPin, Download, Share2 } from 'lucide-react';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';

export default function ProfilCandidatByRecruteur() {
  return (
    <div className="min-h-screen bg-gray-50">
       <HeaderProfil/>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Candidature | Web design | Abraham TADZONG MBIPE</h1>
          <p className="text-gray-600 text-sm">Date de candidature : 10/9/2025</p>
        </div>

        {/* Personal Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Informations Personnelles</h2>
          <div className="flex gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center relative">
                <span className="text-gray-400 text-4xl">👤</span>
                <div className="absolute bottom-2 right-2 w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-white text-lg">📷</span>
                </div>
              </div>
            </div>

            {/* Center Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">ABRAHAM TADZONG MBIPE</h3>
              <p className="text-gray-700 text-sm mb-6">Concepteur Et Développeur D'application</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span>✉️</span>
                  <span className="text-gray-700">tadzongmbipeabraham@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>👤</span>
                  <span className="text-gray-700">Homme</span>
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-green-600 font-semibold mb-2">Vous Êtes :</p>
                <div className="border border-gray-300 rounded px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                    <span className="text-gray-700 text-sm">En recherche active</span>
                  </div>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span>📞</span>
                  <span className="text-gray-700">+237 674 882 527</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>in</span>
                  <a href="#" className="text-green-600 hover:underline">http://linkedin.com/in/atomabraham</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Résumé Du Profil</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem ipsum is simply dummy Text Of The Printing And Typesetting industry. Lorem ipsum has been the industry's Standard Dummy, text ever since the 1500s, when an Unknown Printer took a galley of type and Scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic Typesetting, remaining Essentially Unchanged. Lorem ipsum is simply dummy Text Of The Printing And Typesetting industry. Lorem ipsum has been the industry's Standard Dummy text ever since the 1500s, when an Unknown Printer took a galley of type and Scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Experiences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Expériences</h2>
          <div className="space-y-6">
            {[
              { title: 'Développeur Web', company: 'AFDA TECH', location: 'Douala, Cameroon', type: 'Freelance', date: 'Jan 2022 - Apr 2022' },
              { title: 'UI/UX Designer', company: 'AFDA TECH', location: 'Douala, Cameroon', type: 'Freelance', date: 'Jan 2022 - Apr 2022' },
              { title: 'Graphiste', company: 'AFDA TECH', location: 'Douala, Cameroon', type: 'Freelance', date: 'Jan 2022 - Apr 2022' },
              { title: 'Développeur Web', company: 'AFDA TECH', location: 'Douala, Cameroon', type: 'Freelance', date: 'Jan 2022 - Apr 2022' }
            ].map((exp, idx) => (
              <div key={idx} className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-gray-600 text-sm">{exp.company} • {exp.location}</p>
                <p className="text-gray-600 text-sm">{exp.type}</p>
                <p className="text-gray-500 text-sm">{exp.date}</p>
                <p className="text-gray-500 text-sm mt-1">-----------</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Compétences</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS',
              'Adobe Photoshop Pro', 'Laravel', 'React JS'
            ].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-gray-700 text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Diplômes & Formations</h2>
          <div className="space-y-6">
            {[
              { school: 'AFDA TECH', location: 'Douala, Cameroon', title: 'Profession', date: 'Jan 2022 - Apr 2022', skills: '-----------' },
              { school: 'SubHere.Profil', location: 'Douala, Cameroon', title: 'Profession', date: 'Jan 2022 - Apr 2022', skills: 'Photoshop, Illustrator' },
              { school: 'AFDA TECH', location: 'Douala, Cameroon', title: 'Profession', date: 'Jan 2022 - Apr 2022', skills: '-----------' },
              { school: 'AFDA TECH', location: 'Douala, Cameroon', title: 'Profession', date: 'Jan 2022 - Apr 2022', skills: 'Report JS' }
            ].map((edu, idx) => (
              <div key={idx} className="border-l-4 border-green-600 pl-4">
                <p className="text-gray-600 text-sm">{edu.school}</p>
                <p className="font-semibold text-gray-800">{edu.location}</p>
                <p className="text-gray-600 text-sm">{edu.title}</p>
                <p className="text-gray-500 text-sm">{edu.date}</p>
                <p className="text-gray-500 text-sm mt-1">{edu.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Autres Ressources</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">CV :</span>
              <a href="#" className="text-green-600 hover:underline text-sm flex items-center gap-2">
                <span>S3_TADZONG MBIPE.pdf</span>
                <Download size={16} />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Site internet / Portefeuille :</span>
              <a href="#" className="text-green-600 hover:underline text-sm">https://www.ntechfeeds.com/portfolio/abra</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">LinkedIn :</span>
              <a href="#" className="text-green-600 hover:underline text-sm">https://www.behance.net/abrahamtadzong</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">GitHub :</span>
              <a href="#" className="text-green-600 hover:underline text-sm">https://github.com/tadzong</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}