import { useNavigate } from "react-router-dom";


function Home (props){
    const navigate = useNavigate();

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // 24시간제 사용
        };
      
        return new Intl.DateTimeFormat('ko-KR', options).format(date).replace(/\./g, '-');
      }

      const formattedDate = props.coin && props.coin.length > 0 && props.coin[0].last_updated
      ? formatDateTime(props.coin[0].last_updated)
      : "날짜 정보 없음";

    return (        
        <div className="home-wrap">
            <h2>가장 신뢰받는 실시간 코인시세 사이트</h2>
            <p>빠르고 편리하게 코인시세를 알려드립니다.</p>
            <div className="home-info">
                <div className="home-info-time">
                    <p>{formattedDate}</p>
                    <p>Last Updated</p>
                </div>
                <div className="home-info-coins">
                    <p>26</p>
                    <p>coins</p>
                </div>
            </div>
            <button className="home-btn" onClick={()=>{ navigate('/detail/1')}}>코인시세 보러가기</button>
        </div>
    )
}


export default Home;