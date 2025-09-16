import React from 'react';
import { FileText } from 'lucide-react';

// Composants UI réutilisables
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default: 'bg-[#009739] text-white hover:bg-[#007a2f] focus:ring-green-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };

  const sizes = {
    default: 'h-9 px-3 text-sm',
    sm: 'h-7 px-2 text-xs',
    lg: 'h-11 px-7'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

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

const Avatar = ({ children, className = '', ...props }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full font-medium ${className}`} {...props}>
    {children}
  </div>
);

const ApplicationsSection = () => {
  const recentApplications = [
    {
      name: 'Sarah Martinez',
      position: 'Frontend Dev',
      time: '2 hours ago',
      avatar: 'SM',
      color: 'bg-blue-500'
    },
    {
      name: 'Paul Samuelle',
      position: 'Designer',
      time: '1 day ago',
      avatar: 'PS',
      color: 'bg-green-500'
    },
    {
      name: 'Sarah Shaule',
      position: 'Developer',
      time: '3 days ago',
      avatar: 'SS',
      color: 'bg-red-500'
    },
    {
      name: 'David Stranges',
      position: 'Manager',
      time: '1 week ago',
      avatar: 'DS',
      color: 'bg-orange-500'
    }
  ];

  return (
    <main className="flex-1 p-5 overflow-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Applications</CardTitle>
          <Button variant="outline" size="sm" className="text-[#009739] border-[#009739] hover:bg-green-50 hover:scale-105 transition-transform">
            View All Applications
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentApplications.map((application, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transform hover:scale-105 transition-all"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className={`${application.color} text-white text-xs`}>
                  {application.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">{application.name}</p>
                <p className="text-xs text-gray-600">{application.position}</p>
                <p className="text-xs text-gray-500">{application.time}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs hover:scale-105 transition-transform">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default ApplicationsSection;