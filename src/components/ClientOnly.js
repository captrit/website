'use client';

import { useEffect, useState } from 'react';

export default function ClientOnly({ children, ...delegated }) {
  // State to track if component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Return null on server-side rendering
  if (!hasMounted) {
    return null;
  }

  // Render children on client side
  return <div {...delegated}>{children}</div>;
}
