import React from 'react';
import {
  Eye,
  FileText,
  Calendar,
  Users,
  Plus,
  User,
  ArrowLeftRight,
  BarChart3,
  Search,
} from 'lucide-react';

// Composants UI réutilisables (copiés pour indépendance)
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

const DashboardSection = ({ animateCards }) => {
  const stats = [
    {
      title: '234',
      subtitle: 'Total Job Views',
      color: 'bg-blue-50 border-blue-200',
      icon: Eye,
      iconColor: 'text-blue-600'
    },
    {
      title: '28',
      subtitle: 'Applications This Week',
      color: 'bg-green-50 border-green-200',
      icon: FileText,
      iconColor: 'text-green-600'
    },
    {
      title: '5',
      subtitle: 'Interviews Scheduled',
      color: 'bg-yellow-50 border-yellow-200',
      icon: Calendar,
      iconColor: 'text-yellow-600'
    },
    {
      title: '12',
      subtitle: 'Active Candidates',
      color: 'bg-pink-50 border-pink-200',
      icon: Users,
      iconColor: 'text-pink-600'
    },
  ];

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

  const quickActions = [
    {
      title: 'Create Job Post',
      subtitle: 'Post a new position',
      icon: Plus,
      bgColor: 'bg-[#0A2342]',
      textColor: 'text-white',
      iconColor: 'text-white'
    },
    {
      title: 'Edit Profile',
      subtitle: 'Update your info',
      icon: User,
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-800'
    },
    {
      title: 'Switch Mode',
      subtitle: 'View as candidate',
      icon: ArrowLeftRight,
      bgColor: 'bg-white',
      textColor: 'text-green-600',
      iconColor: 'text-green-600'
    },
    {
      title: 'View Analytics',
      subtitle: 'Performance insights',
      icon: BarChart3,
      bgColor: 'bg-white',
      textColor: 'text-orange-500',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <main className="flex-1 p-5 overflow-auto">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back, Jean!</h1>
          <p className="text-sm text-gray-600">Here's your recruiting dashboard for today.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search candidates, jobs..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009739] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.color} border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                animateCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: animateCards ? 'fadeInUp 0.5s ease-out forwards' : 'none'
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
                  <p className="text-sm text-gray-700 font-medium">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Active Job Posts</CardTitle>
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
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Applications</CardTitle>
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
        </div>
      </div>

      <div className="mt-7">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${action.bgColor}`}
              >
                <CardContent className="p-4 flex items-center space-x-3">
                  <Icon className={`w-6 h-6 flex-shrink-0 ${action.iconColor}`} />
                  <div>
                    <h3 className={`font-semibold text-sm mb-0.5 ${action.textColor}`}>{action.title}</h3>
                    <p className={`text-xs opacity-90 ${action.textColor}`}>{action.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default DashboardSection;