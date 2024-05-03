import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faRepeat } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [coin, setCoin] = useState([]);
  const [krw, setKrw] =useState('krw');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoinData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${krw}&ids=bitcoin,ethereum,ripple,cardano,litecoin,dogecoin,polkadot,chainlink,stellar,monero,tezos,cosmos,algorand,aave,uniswap,solana,terra,compound,filecoin,maker,dash,decred,theta,tron,neo,vechain,eos,zcash,binancecoin,bitcoincash
        `);
        setCoin(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCoinData();
  }, [krw]);

  console.log(coin);

  return (
    <div className="App">
      <header>
        <div className='container'>
          <div className='logo' onClick={()=>{ navigate('/')}}>
            <span>Live coin</span>
          </div>
          <button className='krw-btn' onClick={()=>{
            setKrw(krw === 'krw' ? 'usd' : 'krw');
          }}>KRW <FontAwesomeIcon icon={faRepeat} /> USD</button>
        </div>
      </header>
      <div className='coinlist'>
      {isLoading ? (
          <p>Loading...</p>  // 로딩 상태 표시
        ) : (
          <ul>
            {coin.map((a, i) => {
              return (
                <li className='coinlist-item' onClick={() => { navigate(`/detail/${a.market_cap_rank}`) }} key={i}>
                  <div className='coinlist-img'>
                    <img src={a.image} alt={`${a.name} logo`} />
                  </div>
                  <p>{a.name}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail coin={coin} krw={krw}/>}/>
      </Routes>

    </div>
  );
}

export default App;
