import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const AnalyticsSection = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-1 p-5 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t('analytics.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <p>{t('analytics.inProgress')}</p>
            <p>{t('analytics.comingSoon')}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AnalyticsSection;