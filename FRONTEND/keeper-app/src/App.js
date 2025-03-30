
import './App.css';
import Header from "./components/header/header"
import AddKeeper from "./components/addKeeper/addKeeper";
import ShowKeeper from "./components/showKeeper/showKeeper"
import { useState } from 'react';


function App() {

  const [keeperList, setKeeperList] =useState([]);
  const [flag , setFlag ] = useState(false);
  return (


    <div className="App">
      <Header/>
      <AddKeeper keeperList ={keeperList} setKeeperList ={setKeeperList} flag ={flag} setFlag ={setFlag}/>
      <ShowKeeper keeperList ={keeperList} flag ={flag} setFlag ={setFlag} />
    </div>
  );
}

export default App;
