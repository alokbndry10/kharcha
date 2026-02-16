import React from 'react';

type AuthFormWrapperProps = {
  tag?: 'LOGIN' | 'RESET' | 'CHECK INBOX' | 'RESET-SUCCESS' | 'RESET PASSWORD';
  titles?: string[];
  subtitle?: React.ReactNode;
  children: React.ReactNode;
};

export function AuthFormWrapper({ tag, titles, subtitle, children }: AuthFormWrapperProps) {
  return (
    <div className="bg-white w-full max-w-[425px] px-4 space-y-8 pt-4 2xl:pt-0 animate-appear-top-xs border border-gray-400 rounded-2xl shadow-lg shadow-primary-200">
      <header className="space-y-2.5 mt-4">
        <div>
          {tag && <p className="text-xs font-semibold text-primary-500">{tag}</p>}
          {titles?.map((title, index) => (
            <p key={index} className="text-2xl font-medium text-text-900">
              {title}
            </p>
          ))}
        </div>
        {subtitle && <p className="text-base text-text-700">{subtitle}</p>}
      </header>
      <div className="p-6">{children}</div>
    </div>
  );
}
