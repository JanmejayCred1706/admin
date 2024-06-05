import React from 'react';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
};

export default Dashboard;
