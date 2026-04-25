import { useState, useCallback } from 'react';

export const PAGES = ['home', 'nowplaying', 'comingsoon', 'theatres', 'giftcards', 'location', 'signin', 'join', 'moviedescription'];

export function useNavigation(initial = 'home') {
  const [currentPage, setCurrentPage] = useState(initial);

  const navigate = useCallback((page) => {
    if (PAGES.includes(page)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { currentPage, navigate };
}
