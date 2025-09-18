import React from 'react';
import { MessageSquare } from 'lucide-react';

// Composants UI réutilisables
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1 p-5 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const MessagesSection = () => {
  return (
    <main className="flex-1 p-5 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <p>Aucun message pour le moment.</p>
            <p>Vous recevrez les messages des candidats ici.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default MessagesSection;