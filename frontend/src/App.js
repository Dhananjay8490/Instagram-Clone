import './App.css';
import {BrowserRouter} from 'react-router-dom';
import VariablesState from './context/VariablesContext';
import Navigation from './Navigation';


export default function App() {


  return (
   <BrowserRouter>
    <VariablesState>
      <Navigation/>
    </VariablesState>
   </BrowserRouter>
  );
}


