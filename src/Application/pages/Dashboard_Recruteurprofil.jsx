import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Eye,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  User,
  Search,
  Bell
} from 'lucide-react';

// Composants UI réutilisables
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-8'
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
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', ...props }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`} {...props}>
    {children}
  </span>
);

const Avatar = ({ children, className = '', ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full font-medium ${className}`} {...props}>
    {children}
  </div>
);

// Composant Sidebar
const SlidebarDashRecru = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'job-posts', label: 'My Job Posts', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900">BantuLink</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === 'applications' && (
                <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5">
                  2
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Composant Header
const HeaderDashRecru = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Jean!</h1>
          <p className="text-gray-600 text-sm">Last login: Today at 9:30 AM</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Avatar className="hover:scale-110 transition-transform cursor-pointer">
            <AvatarFallback className="bg-blue-600 text-white">JM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

// Composant Main Dashboard
const MainDashRecru = ({ animateCards }) => {
  const stats = [
    { 
      title: '234', 
      subtitle: 'Job Applications', 
      description: '8% more than last week',
      color: 'bg-blue-50 border-blue-200',
      icon: FileText,
      iconColor: 'text-blue-600'
    },
    { 
      title: '28', 
      subtitle: 'Job Posts', 
      description: 'You have active 11% jobs',
      color: 'bg-green-50 border-green-200',
      icon: Briefcase,
      iconColor: 'text-green-600'
    },
    { 
      title: '5', 
      subtitle: 'Interviews', 
      description: 'Interviews Scheduled',
      color: 'bg-yellow-50 border-yellow-200',
      icon: Calendar,
      iconColor: 'text-yellow-600'
    },
    { 
      title: '12', 
      subtitle: 'Profile Views', 
      description: 'Profile Views',
      color: 'bg-pink-50 border-pink-200',
      icon: Eye,
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
      subtitle: 'Post a new job opening',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      title: 'Edit Profile',
      subtitle: 'Update your info',
      icon: User,
      color: 'bg-gray-100 hover:bg-gray-200',
      textColor: 'text-gray-900'
    },
    {
      title: 'Search Mode',
      subtitle: 'Find candidates',
      icon: Search,
      color: 'bg-gray-100 hover:bg-gray-200',
      textColor: 'text-gray-900'
    },
    {
      title: 'Job Analytics',
      subtitle: 'View job performance',
      icon: TrendingUp,
      color: 'bg-gray-100 hover:bg-gray-200',
      textColor: 'text-gray-900'
    }
  ];

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-gray-900">{stat.title}</h3>
                  <p className="text-gray-700 font-medium">{stat.subtitle}</p>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Job Posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Active Job Posts</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                Create New Job
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobPosts.map((job, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer transform hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${job.statusColor}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">Posted {job.postedDays} days ago • {job.applicants} applicants</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                    <Eye className="w-4 h-4 mr-2" />
                    View Applications
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
              <Button variant="outline" size="sm" className="text-blue-600 hover:scale-105 transition-transform">
                View All Applications
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((application, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transform hover:scale-105 transition-all"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={`${application.color} text-white text-sm`}>
                      {application.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{application.name}</p>
                    <p className="text-sm text-gray-600">{application.position}</p>
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

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${action.color}`}
              >
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${action.textColor}`} />
                  <h3 className={`font-semibold mb-1 ${action.textColor}`}>{action.title}</h3>
                  <p className={`text-sm opacity-80 ${action.textColor}`}>{action.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

// Composant principal DashboardRecruteurprofil
const DashboardRecruteurprofil = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Trigger card animations on mount
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SlidebarDashRecru 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col">
        <HeaderDashRecru />
        <MainDashRecru animateCards={animateCards} />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardRecruteurprofil;