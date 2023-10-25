import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import {RouteComponentProps,useHistory,withRouter } from "react-router-dom";
import results from '../contents/results';
import { coffee} from '../data/coffee';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ICoffeeTop3,  coffeeTop3, coffeeTop3Atom, testData,  } from '../atoms';
const loading = require("../images/spinner.gif");
const Wrapper = styled.div`
  overflow-x: hidden;
  height:100%vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:#e3e3e3;
`;
const Div = styled(motion.div)`//화면을 부드럽게 넘기는 모션 적용
  margin-top: 70px;
  width: 700px; 
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  padding: 22px 22px 22px 22px;
  background-color: whitesmoke;

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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        color:black;
        font-size:37px;
        font-weight: bold;
        background-color: #dedddd;
        border-radius: 10px;
        box-shadow: 2px 2px 2px;
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
        font-size:21px;
        
        
    strong{
      font-weight: bold;
      //background-color: lightgray;
      border-radius: 20px;
     }
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
    //const coffee = useRecoilValue<ICoffee>(coffeeState);

    //3) TOP3의 데이터를 한번에 가져오는 state 

    const coffeeTop= useRecoilValue<ICoffeeTop3[]>(coffeeTop3Atom);

    //4) 결과 페이지 나타날 때, 렌더링
    useEffect(()=> {
      //num = getRandom(2, 143);//난수 생성
        const tick = setTimeout(() => {
            setShowResult(true); //3초 후 결과를 보여줌
        }, 10000);
        
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
                        <h1  >{results[parseInt(coffeeTop[0].type)].title}</h1>
                      
                     </Title>   
                     <Content>
                       <h1>{results[parseInt(coffeeTop[0].type)].content}</h1>
                     </Content>
                     <br></br>
                     <Hr></Hr>
                     <Content>
                     <h2 style = {{color:"black",fontSize:"27px",marginBottom:"20px", fontWeight:"bold",width:"40%",borderRadius:"10px", backgroundColor:"#dedddd", boxShadow:"2px 2px 2px" }}>이런 커피가 잘 맞아요</h2>
                     <h1>{results[parseInt(coffeeTop[0].type)].feature} </h1>
                     </Content>
                     <br></br>
                     <Hr></Hr>
                     <Content>
                     <h2 style = {{color:"black",fontSize:"30px",marginBottom:"30px", fontWeight:"bold",borderRadius:"10px", backgroundColor:"#cc9933db", boxShadow:"2px 2px 2px"  , width:"20%"}}>TOP 1</h2>
                     <img style = {{width:"27%", height:"27%"}}
                        src={require(`../images/capsule/${coffeeTop[0].coffee_id}.png`)}
                      /> 
                       <ul style = {{textAlign:"left",listStyle:"square", color:"black"}}>
                        <li >
                         <h1 style ={{fontSize:"20px"}}><strong>캡슐 이름</strong> : {coffeeTop[0].coffeeName}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"20px"}} ><strong>맛</strong>: {coffeeTop[0].tasteAndAroma}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"20px"}}><strong>커피 강도</strong>: {coffeeTop[0].strength}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"20px"}}><strong>커피 머신</strong>: {coffeeTop[0].compatible}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"20px"}}><strong>구매링크</strong> :<ClickButton style = {{borderRadius:"30px ", backgroundColor:"lightgray", fontWeight:"bold"}} onClick = {()=>{url = coffeeTop[0].purchaseLink;window.open(url)}}>click</ClickButton></h1>
                        </li>
                       </ul>
                     <br></br>
                     <Hr></Hr>
                     <div
                     style = {{display:"flex",flexDirection:"row", marginBottom:"40px"}}
                     >
                      <div>
                       <h2 style = {{color:"black",fontSize:"23px",marginTop:"35px",marginBottom:"10px",fontWeight:"bold" ,borderRadius:"10px", backgroundColor:"#cc9933db", boxShadow:"2px 2px 2px", width:"40%", marginLeft:"40px"}}>TOP 2</h2>
                       <img style = {{width:"40%", height:"40%"}}
                        src={require(`../images/capsule/${coffeeTop[1].coffee_id}.png`)}
                      />
                      <ul style = {{textAlign:"left", listStyle:"square",marginLeft:"60px", color:"black"}}>
                      <li>
                         <h1 style ={{fontSize:"18px"}}><strong>캡슐 이름</strong> : {coffeeTop[1].coffeeName}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}} ><strong>맛</strong>: {coffeeTop[1].tasteAndAroma}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>커피 강도</strong>: {coffeeTop[1].strength}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>커피 머신</strong>: {coffeeTop[1].compatible}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>구매링크</strong> :<ClickButton style = {{borderRadius:"30px ", backgroundColor:"lightgray", fontWeight:"bold"}} onClick = {()=>{url = coffeeTop[1].purchaseLink;window.open(url)}}>click</ClickButton></h1>
                        </li>
                      </ul>
                      </div>


                      <div style = {{}}>
                       <h2 style = {{color:"black",fontSize:"23px",marginTop:"35px",marginBottom:"20px",fontWeight:"bold" ,borderRadius:"10px", backgroundColor:"#cc9933db", boxShadow:"2px 2px 2px", width:"40%", marginLeft:"65px" }}>TOP 3</h2>
                       <img style = {{width:"40%", height:"40%"}}
                        src={require(`../images/capsule/${coffeeTop[2].coffee_id}.png`)}
                      />
                      <ul style = {{textAlign:"left", listStyle:"square",marginLeft:"80px", color:"black"}}>
                      <li>
                         <h1 style ={{fontSize:"18px"}}><strong>캡슐 이름</strong> : {coffeeTop[2].coffeeName}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>맛</strong>: {coffeeTop[2].tasteAndAroma}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>커피 강도</strong>: {coffeeTop[2].strength}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px"}}><strong>커피 머신</strong>: {coffeeTop[2].compatible}</h1>
                        </li>
                        <li>
                         <h1 style ={{fontSize:"18px", marginBottom:"-200px"}}><strong>구매링크</strong> :<ClickButton style = {{borderRadius:"30px ", backgroundColor:"lightgray", fontWeight:"bold"}} onClick = {()=>{url = coffeeTop[2].purchaseLink;window.open(url)}}>click</ClickButton></h1>
                        </li>
                      </ul>
                      </div>

                      
                    </div>

                     </Content>
                       <Link to = "/AllResults"><Button> 전체 유형 보기</Button></Link>
                       <Link to = "/QuizPage/1"><Button>다시 하기</Button></Link>
                    </Div>
                 
                }
            
                {!showResult &&
                <>
                    <div style = {{marginTop:"200px", height:"100vh", alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                     <img src = {loading}></img>
                     <h1 style = {{color:"black", fontSize:"35px", alignItems:"center",justifyContent:"center", flexDirection:"column"}}>Loading......</h1>
                    </div>
                    
                    
                </>
                }
              </AnimatePresence>
            </Wrapper>
        </>
    );
};

export default withRouter(ResultCard);