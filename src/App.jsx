import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import colorArray from './colorArray'
import './App.css'

function App() {

  const [ colors, setColors ] = useState([]);
  const [ boxColor, setBoxColor ] = useState('');
  const [ answer, setAnswer ] = useState(null);
  const [ buttonStyles, setButtonStyles ] = useState({});

  useEffect(() => {
    getRandomHex();
  },[]);


  const getRandomHex= () => {

    const shuffledArr = [...colorArray].sort(() => Math.random() - 0.5);
    const threeRandomHex = shuffledArr.slice(0, 3);
    const randomIndex = Math.floor(Math.random() * 3); //0, 1 or 2
    setColors(threeRandomHex);
    setBoxColor(threeRandomHex[randomIndex]);
    setAnswer(null);
    setButtonStyles(Array(3).fill({})); //[{}, {}, {}]
  };

  
  const handleClick = (id, index) => {
    setButtonStyles(Array(3).fill({}));
    if(boxColor === id){
      setAnswer(true)
      setButtonStyles((prev) => {
        const newStyles = [...prev];
        newStyles[index] = {backgroundColor:'rgb(49, 207, 49)'}
        return newStyles;
      });
    }else{
      setAnswer(false)
      setButtonStyles((prev) => {
        const newStyles = [...prev];
        newStyles[index] = {backgroundColor: 'red'}
        return newStyles
      });
    }
  };

  const hexCode = colors.map((color, index) => 
    <button 
      key={uuidv4()} 
      className='hex-num' 
      onClick={()=> {
        handleClick(color, index)
      }}
      style={buttonStyles[index]}
    >
      {color}
    </button>
  );

  return (
    <div className='container'>
      <div className="color-box" style={{backgroundColor: boxColor}}></div>
      <div className='list-container'>
        {hexCode}
      </div>
      <button className='next-btn' onClick={getRandomHex} >NEXT</button>
      {answer !== null && (
        <div className='answer' style={{color: answer? "rgb(49, 207, 49)": "red"}}>{answer? "CORRECT": "INCORRECT"}</div>
      )}
    </div>
  )
}

export default App


