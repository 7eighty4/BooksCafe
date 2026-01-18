
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Library from './components/Library';
import ReaderView from './components/ReaderView';
import Dictionary from './components/Dictionary';
import Settings from './components/Settings';
import { useTheme } from './hooks/useTheme';
import { db } from './services/db';

type View = 'library' | 'dictionary' | 'settings';

const App: React.FC = () => {
  const [theme, setTheme] = useTheme();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<View>('library');

  const handleSelectBook = useCallback((id: number) => {
    db.books.update(id, { lastOpened: new Date() }).catch(err => {
      console.error("Failed to update lastOpened timestamp:", err);
    });
    setSelectedBookId(id);
  }, []);

  const handleCloseReader = useCallback(() => {
    setSelectedBookId(null);
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setSelectedBookId(null); // Close reader when navigating
    setCurrentView(view);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 bg-bg text-text`}>
      <Header theme={theme} setTheme={setTheme} onNavigate={handleNavigate} />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {selectedBookId ? (
          <ReaderView bookId={selectedBookId} onClose={handleCloseReader} theme={theme} />
        ) : (
          <>
            {currentView === 'library' && <Library onSelectBook={handleSelectBook} onNavigate={handleNavigate} />}
            {currentView === 'dictionary' && <Dictionary />}
            {currentView === 'settings' && <Settings theme={theme} setTheme={setTheme} />}
          </>
        )}
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        Made with ❤️ by Paras
      </footer>
    </div>
  );
};

export default App;
