import React, { useState } from 'react';
import { useNavigation } from './hooks/useNavigation';
import NavBar from './components/NavBar';
import PageSwitcher from './components/PageSwitcher';

// Pages
import HomePage from './pages/HomePage';
import NowPlayingPage from './pages/NowPlayingPage';
import ComingSoonPage from './pages/ComingSoonPage';
import TheatresPage from './pages/TheatresPage';
import GiftCardsPage from './pages/GiftCardsPage';
import LocationPage from './pages/LocationPage';
import SignInPage from './pages/SignInPage';
import JoinPage from './pages/JoinPage';
import MovieDescriptionPage from './pages/MovieDescriptionPage';

function App() {
  const { currentPage, navigate } = useNavigation('home');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':             return <HomePage navigate={navigate} onSelectMovie={setSelectedMovie} />;
      case 'nowplaying':       return <NowPlayingPage navigate={navigate} onSelectMovie={setSelectedMovie} />;
      case 'comingsoon':       return <ComingSoonPage navigate={navigate} />;
      case 'theatres':         return <TheatresPage navigate={navigate} />;
      case 'giftcards':        return <GiftCardsPage navigate={navigate} />;
      case 'location':         return <LocationPage navigate={navigate} />;
      case 'signin':           return <SignInPage navigate={navigate} />;
      case 'join':             return <JoinPage navigate={navigate} />;
      case 'moviedescription': return <MovieDescriptionPage movie={selectedMovie} navigate={navigate} />;
      default:                 return <HomePage navigate={navigate} onSelectMovie={setSelectedMovie} />;
    }
  };

  return (
    <>
      <NavBar currentPage={currentPage} navigate={navigate} />
      {renderPage()}
      <PageSwitcher currentPage={currentPage} navigate={navigate} />
    </>
  );
}

export default App;
