import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Detail from './routes/Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faRepeat } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [coin, setCoin] = useState([]);
  const [krw, setKrw] =useState('krw');
  const [isLoading, setIsLoading] = useState(false);
  const [red, setRed] = useState('');
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

  useEffect(() => {
    if (coin.length > 0) {
      if (coin[0].price_change_percentage_24h > 0) {
        setRed('red');
      } else {
        setRed('blue');
      }
    }
  }, [coin]);

  console.log(coin);

  return (
    <div className="App">
      <header>
        <div className='container'>
          <div className='logo'>
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

      {coin.length > 0 && (
  <div className="detail-wrap">
            <div className="detail">
                <div className="detail-header">
                    <div className="detail-image">
                        <img src={coin[0].image}/>
                    </div>
                    <h2>{coin[0].name}</h2>
                    <p>{coin[0].symbol}/{krw}</p>
                </div>
                <div className="detail-body">
                    <div className={`detail-price ${red}`}>
                        <p>{Number(coin[0].current_price.toFixed(1)).toLocaleString()}</p>
                        <p>{krw}</p>
                    </div>
                    <div className={`detail-24h ${red}`}>
                        <p>{coin[0].price_change_percentage_24h.toFixed(2)}%</p>
                        <div className="updown">
                        {
                        coin[0].price_change_percentage_24h > 0 
                        ? <FontAwesomeIcon icon={faCaretUp} />
                        : <FontAwesomeIcon icon={faCaretDown} />
                        }
                        </div>
                        <p>{Number(coin[0].price_change_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                    <div className="detail-highlow">
                        <span>고가(24H)</span>
                        <p className="high">{Number(coin[0].high_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                    <div className="detail-highlow">
                        <span>저가(24H)</span>
                        <p className="low">{Number(coin[0].low_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                </div>
            </div>
  </div>
)}


      <Routes>
        <Route path='/detail/:id' element={<Detail coin={coin} krw={krw}/>}/>
      </Routes>

    </div>
  );
}

export default App;
