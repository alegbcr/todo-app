import { useState, useEffect } from 'react';

const useStorageListener = (sincronize) => {
  const [storageChange, setStorageChange] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === 'TODOS_V1') {
      setStorageChange(true);
    }
  };

  const toggleShow = () => {
    sincronize();
    setStorageChange(false);
  };

  return {
    show: storageChange,
    toggleShow,
  };
};

export { useStorageListener };

// 'use client';
// import { useState } from 'react';

// const useStorageListener = (sincronize) => {
//   const [storageChange, setStorageChange] = useState(false);

//   window.addEventListener('storage', (change) => {
//     if (change.key === 'TODOS_V1') {
//       setStorageChange(true);
//     }
//   });

//   const toggleShow = () => {
//     sincronize();
//     setStorageChange(false);
//   };

//   return {
//     show: storageChange,
//     toggleShow,
//   };
// };

// export { useStorageListener };
