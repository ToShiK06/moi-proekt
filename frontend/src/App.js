import react from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Contacts from './components/contacts/Contacts';
import Scroll from "../src/components/scroll/Scroll";
import Catalog from './components/catalog/Catalog';
import Info from './components/info/info'


function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Info/>
      <Scroll />
      <Catalog/>
      <Contacts/>
    </div>
  );
}

export default App;
