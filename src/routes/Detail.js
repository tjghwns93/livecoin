import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


function Detail (props){
    const [red, setRed] = useState('');
    const {id} = useParams();
    const findId = props.coin.find((x)=>{
        return x.market_cap_rank == id
    });

    useEffect(() => {
        if (findId) { // findId가 존재하는지 확인
            if (findId.price_change_percentage_24h > 0) {
                setRed('red');
            } else {
                setRed('blue');
            }
        }
    }, [findId]);
    if (!findId) {
        return <div>Loading...</div>;  // 또는 로딩 스피너 컴포넌트
    }


    console.log(props.krw)

    return (
        <div className="detail-wrap">
            <div className="detail">
                <div className="detail-header">
                    <div className="detail-image">
                        <img src={findId.image}/>
                    </div>
                    <h2>{findId.name}</h2>
                    <p>{findId.symbol}/{props.krw}</p>
                </div>
                <div className="detail-body">
                    <div className={`detail-price ${red}`}>
                        <p>{Number(findId.current_price.toFixed(1)).toLocaleString()}</p>
                        <p>{props.krw}</p>
                    </div>
                    <div className={`detail-24h ${red}`}>
                        <p>{findId.price_change_percentage_24h.toFixed(2)}%</p>
                        <div className="updown">
                        {
                        findId.price_change_percentage_24h > 0 
                        ? <FontAwesomeIcon icon={faCaretUp} />
                        : <FontAwesomeIcon icon={faCaretDown} />
                        }
                        </div>
                        <p>{Number(findId.price_change_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                    <div className="detail-highlow">
                        <span>고가(24H)</span>
                        <p className="high">{Number(findId.high_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                    <div className="detail-highlow">
                        <span>저가(24H)</span>
                        <p className="low">{Number(findId.low_24h.toFixed(1)).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;