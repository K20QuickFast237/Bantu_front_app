import React from 'react';
import { Briefcase, Eye } from 'lucide-react';

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

const JobPostsSection = () => {
  const jobPosts = [
    {
      title: 'Frontend Developer',
      company: 'Tech Company',
      postedDays: 2,
      applicants: 15,
      status: 'active',
      statusColor: 'bg-green-500'
    },
    {
      title: 'UI/UX Designer',
      company: 'Design Studio',
      postedDays: 5,
      applicants: 8,
      status: 'active',
      statusColor: 'bg-green-500'
    },
    {
      title: 'Backend Developer',
      company: 'StartupXYZ',
      postedDays: 1,
      applicants: 23,
      status: 'closed',
      statusColor: 'bg-red-500'
    }
  ];

  return (
    <main className="flex-1 p-5 overflow-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">My Job Posts</CardTitle>
          <Button className="transform hover:scale-105 transition-all">
            Create New Job
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {jobPosts.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transform hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2.5 h-2.5 rounded-full ${job.statusColor}`}></div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900">{job.title}</h4>
                  <p className="text-xs text-gray-600">{job.company}</p>
                  <p className="text-xs text-gray-500">Posted {job.postedDays} days ago • {job.applicants} applicants</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                View Applications
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default JobPostsSection;