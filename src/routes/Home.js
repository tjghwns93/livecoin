import { useNavigate } from "react-router-dom";


function Home (){
    const navigate = useNavigate();

    return (        
        <div className="home-wrap">
            <h2>가장 신뢰받는 실시간 코인시세 사이트</h2>
            <p>빠르고 편리하게 코인시세를 알려드립니다.</p>
            <button className="home-btn" onClick={()=>{ navigate('/detail/1')}}>코인시세 보러가기</button>
        </div>
    )
}


export default Home;