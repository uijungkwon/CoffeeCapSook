import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useParams,RouteComponentProps,useLocation,useHistory,useRouteMatch ,withRouter } from "react-router-dom";
import quiz from "../contents/questions";
import results from '../contents/results';
import { coffee } from '../data/coffee';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataState } from '../atoms';
import { IData } from '../atoms';
const loading = require("../images/spinner.gif");


const Wrapper = styled.div`
  overflow-x: hidden;
  height:130vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:#e7e7e7;
`;
const Div = styled(motion.div)`//화면을 부드럽게 넘기는 모션 적용
  margin-top: 70px;
  background-color:whitesmoke;
  width: 700px; 
  //height: 900px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  padding: 22px 22px 22px 22px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const divVariants = {
    initial: {
      opacity: 0
    },
    in: { 
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };
const Title = styled.div`
    //background-color: #e7e7e7;
    //margin-top:-400px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        color:black;
        font-size:37px;
        font-weight: bold;
    }
`;
const Content = styled.div`
    width:620px;
    //height:200px;
    //background-color: #81eaff;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    h1{
        color:black;
        font-size:23px;
    }
`;
const Hr = styled.hr`
    background-color:black;
    width:90%;
    height:0.5px;
`;
const Button = styled.button`
  margin-top:20px;
	width:200px;
  height:50px;
  font-weight: bold;
  font-family:"Hanna" ;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 25px;
	color: ${(props) => props.theme.accentColor};
    //margin-top:50px;
    //margin-left:50px;
`;

interface MatchParams {
    tendency:string;
};
interface IResult {
    title:string;
    content: string;
};
const Img = styled.img`
    width:200px;
    height: 800px;
`;
const ResultCard: React.FunctionComponent<RouteComponentProps<MatchParams>> 
      = ({match}) => {
    const [showResult, setShowResult] = useState(false);
     console.log(match.params.tendency);
     ////////////////////////////
     //const setData = useSetRecoilState(dataState);// key = "data"
     const [data,setData] = useRecoilState(dataState);
     var num =0;
     const getRandom = (min:number, max:number) =>Math.floor(Math.random() * (max - min) + min);
     
     useEffect(()=> {
      num = getRandom(2, 143);
        const tick = setTimeout(() => {
            setShowResult(true);
        }, 3000);
        setData(oldData =>{
          const locStorageResult :IData[]= [ {id:coffee.find(item =>item.id === num)?.id || 5 , name:coffee.find(item =>item.id === num)?.name || " ",성분:coffee.find(item =>item.id === num)?.성분 || " ", 강도:coffee.find(item =>item.id === num)?.강도 || " ", 맛:coffee.find(item =>item.id === num)?.맛 || " ", 커피머신:coffee.find(item =>item.id === num)?.커피머신 || " ", 구매링크:coffee.find(item =>item.id === num)?.구매링크 || " ",  },...oldData];
          localStorage.setItem('alldata', JSON.stringify(locStorageResult));
         
          console.log(locStorageResult);
          return locStorageResult;
              } 
            );
        
        
        return () => clearTimeout(tick);
        
    }, []);
    




const history = useHistory();
const onclick = () =>{
    //추천된 캡슐 정보 저장 하는 코드 작성 
    
}
var url;
//로컬 스토리지!!

return (
        <>
            <Wrapper>
             <AnimatePresence>
                { showResult &&
                
                    <Div
                    //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={{ duration: 2 }}
                    variants={divVariants}
                    
                    >
                     <Title>
                        <h1  >{results[parseInt(match.params.tendency)].title}</h1>
                      
                     </Title>   
                     <Content>
                       <h1>{results[parseInt(match.params.tendency)].content}</h1>
                     </Content>
                     <br></br>
                     <Hr></Hr>
                     <Content>
                     <h2 style = {{color:"black",fontSize:"27px",marginBottom:"20px", fontWeight:"bold" }}>이런 커피가 잘 맞아요</h2>
                     <h1>{results[parseInt(match.params.tendency)].feature} </h1>
                     </Content>
                     <br></br>
                     <Hr></Hr>
                     <Content>
                     <h2 style = {{color:"black",fontSize:"27px",marginBottom:"20px", fontWeight:"bold" }}>추천 캡슐</h2>
                     <img style = {{width:"25%", height:"35%"}}
                        src={require(`../images/capsule/${data[0].id}.png`)}
                      /> 
                       <ul style = {{textAlign:"left", listStyle:"square", fontSize:"10px", color:"black"}}>
                        <li>
                         <h1  >캡슐 이름 : {data[0].name}</h1>
                        </li>
                        <li>
                         <h1 >맛: {data[0].맛}</h1>
                        </li>
                        <li>
                         <h1 >커피 머신: {data[0].커피머신}</h1>
                        </li>
                        <li>
                         <h1>구매링크 :<button style = {{borderRadius:"30px ", backgroundColor:"lightgray"}} onClick = {()=>{url = data[0].구매링크;window.open(url)}}>click</button></h1>
                        </li>
                       </ul>
                     </Content>
                     <br></br>
                     <br></br>
                       <Link to = "/AllResults"><Button> 전체 유형 보기</Button></Link>
                       <Link to = "/QuizPage/1"><Button>다시하기</Button></Link>
                    </Div>
                 
                }
            
                {!showResult &&
                <>
                    <div>
                     <img src = {loading}></img>
                    </div>
                    <div style = {{color:"black", fontSize:"35px"}}>Loading...</div>
                </>
                }
              </AnimatePresence>
            </Wrapper>
        </>
    );
};

export default withRouter(ResultCard);
/*
<Button onClick = {onClick}>저장하기</Button>
//저장하기 버튼 보류(자동 저장 되도록 생성)
*/