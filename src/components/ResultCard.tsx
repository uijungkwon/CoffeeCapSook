import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import {RouteComponentProps,useHistory,withRouter } from "react-router-dom";
import results from '../contents/results';
import { coffee } from '../data/coffee';
import { useRecoilState } from 'recoil';
import { dataState } from '../atoms';
import { IData } from '../atoms';
const loading = require("../images/spinner.gif");
const Wrapper = styled.div`
  overflow-x: hidden;
  height:155vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:whitesmoke;
`;
const Div = styled(motion.div)`//화면을 부드럽게 넘기는 모션 적용
  margin-top: 70px;
  width: 700px; 

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
    h2{
    }
`;
const Hr = styled.hr`
    background-color:black;
    width:90%;
    height:0.5px;
`;
const ClickButton = styled.button`
border-radius: 30px;
background-color: lightgray;
&:hover {//바로 위 태그를 가리킴
      color: #0059ff;
      cursor: pointer;
    }
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
  &:hover {//바로 위 태그를 가리킴
      color: #213fff;
      cursor: pointer;
    }
`;
interface MatchParams {
    tendency:string;
};

const ResultCard: React.FunctionComponent<RouteComponentProps<MatchParams>> 
      = ({match}) => {
    //1) 결과가 로딩중인지 확인해주는 state
    const [showResult, setShowResult] = useState(false);
    var url;
    //2) 캡슐 데이터를 업데이트 해주는 state
    const [data,setData] = useRecoilState(dataState);
    var num =0;
    const getRandom = (min:number, max:number) =>Math.floor(Math.random() * (max - min) + min);//일단 랜덤 추천으로 구현
    //3) 결과 페이지 나타날 때, 렌더링
    useEffect(()=> {
      num = getRandom(2, 143);//난수 생성
        const tick = setTimeout(() => {
            setShowResult(true); //3초 후 결과를 보여줌
        }, 3000);
        //추천된 캡슐 데이터를 리스트 형태로 저장
        setData(oldData =>{
          const locStorageResult :IData[]= [ {id:coffee.find(item =>item.id === num)?.id || 5 , name:coffee.find(item =>item.id === num)?.name || " ",성분:coffee.find(item =>item.id === num)?.성분 || " ", 강도:coffee.find(item =>item.id === num)?.강도 || " ", 맛:coffee.find(item =>item.id === num)?.맛 || " ", 커피머신:coffee.find(item =>item.id === num)?.커피머신 || " ", 구매링크:coffee.find(item =>item.id === num)?.구매링크 || " ",  },...oldData];
          localStorage.setItem('alldata', JSON.stringify(locStorageResult));
         
          //console.log(locStorageResult);
          return locStorageResult;
              } 
            );
        return () => clearTimeout(tick);
    }, []);
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
                         <h1>구매링크 :<ClickButton style = {{borderRadius:"30px ", backgroundColor:"lightgray"}} onClick = {()=>{url = data[0].구매링크;window.open(url)}}>click</ClickButton></h1>
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
                    <div >
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