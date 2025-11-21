import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SecondLayoutProps {
  children: ReactNode;
}

const SecondLayout: React.FC<SecondLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  
  return (
    <>

    <div className='BgLayout'>
        {children}
      </div>
    </>
  );
}

export default SecondLayout;