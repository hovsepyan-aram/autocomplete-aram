import React from 'react';
import { AutocompleteInput } from './components/AutocompleteInput/AutocompleteInput';
import { getAutocompleteResults } from './services/autocomplete-service';
import './App.css';

function App() {
  return (
    <div className="App">
      <AutocompleteInput
        className="autocomplete-placement"
        noResultsText="No suggestions, please try a fruit name"
        fetchSuggestions={getAutocompleteResults}
      />
    </div>
  );
}

export default App;
