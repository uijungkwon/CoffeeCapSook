import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { RouteComponentProps,withRouter } from "react-router-dom";
import quiz from "../contents/questions";
import { useRecoilState, useRecoilValue } from 'recoil';
import {   ICoffeeTop3, coffeeTop3, coffeeTop3Atom, isMemIdAtom } from '../atoms';
import { useQuery } from 'react-query';
import axios from 'axios';
const Bg = require("../images/coffee.jpg");
const Wrapper = styled.div`
  overflow-x: hidden;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  //background-color:rgba(248, 248, 248, 0.788);
  background-image:linear-gradient(rgba(0, 0, 0, 0.117), #000000ae), url(${Bg});
`;

const Div = styled(motion.div)`
  background-color:whitesmoke;
  width: 600px; 
  height: 600px;
  border-radius: 30px;
  box-shadow: 0px 4px 8px black; 
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
//화면 넘길 때 나타나는 애니메이션 효과 적용
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
    width:550px;
    height:130px;
    margin-bottom:40px;
    background-color: rgba(230, 228, 228, 0.788);
    border: none;
	  border-radius: 10px;
`;
const ImgBox = styled.div`
    width:540px;
    height:300px;
`;
const Button = styled.button`
	width:90px;
  height:40px;
  font-family:"Hanna" ;
  font-weight:bold;
	background-color: rgba(196, 196, 196, 0.798);
  //background-color:#eee6C4;
	border: none;
  margin-right: 20px;
	border-radius: 80px;

	font-size: 20px;
	color: ${(props) => props.theme.accentColor};
    margin-top:21px;
    &:hover {//바로 위 태그를 가리킴
      color: #fdfdfd;
      cursor: pointer;
    }
`;
interface MatchParams {
    id:string;
};
interface IContent{//질문에 대한 대답, 대답에 대한 점수
    answer:string;
    weight:number[];
    value:string;
}
interface IQuiz {//질문 제목, 질문 내용
    title:string;
    content: IContent[];
};
const QuizWrapper = styled.div`
  text-align : center;
  margin : 0;
  padding : 0;
`;
//사용자가 누른 버튼 값 저장
const buttonValue:string[] = ["0","0","0","0","0","0","0","0"];
const QuizCard: React.FC<RouteComponentProps<MatchParams>>
      = ({match}) => {//match는 퀴즈 번호 ex) 1,2,3 ...
        

        //0) recoil 값 가져오기  & API fetch 하기
        const member_id = useRecoilValue(isMemIdAtom);//나의 멤버 아이디 값
        const [coffee, setCoffee]= useRecoilState<ICoffeeTop3[]>(coffeeTop3Atom);//커피 객체 담을 변수 
        

        //1) 퀴즈 페이지 넘길 때마다 퀴즈 번호 렌더링
        const [curQuiz, setQuiz] = useState<IQuiz>();
        const [id, setId] = useState<number>(0);
        
        //2) 페이지 변경 되었을 때, state 변경
        useEffect(() => {
            const num = parseInt(match.params.id);
            if (quiz) {
                setQuiz(quiz[num - 1]);//렌더링 시 질문 설정 (현재 주소 파라미터에서 질문 번호 가져옴)
                setId(num + 1);
            }
        }, [match]);//페이지 넘길 때마다 다른 질문이 나오도록 생성

        //3) 버튼 클릭시, 결과를 나타내기 위한 점수 누적
        const [num,setNum] = useState(0);
        const onclick =(item:IContent)=> {
            buttonValue[num] = item.value; //사용자가 선택한 버튼 번호를 입력
            setNum((num)=> num+1);
            
            if(num === 7){
                console.log(buttonValue); //=>> 해당 배열을 서버에 전송할 수 있음
          
          axios.post( `https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/favorite-test/${member_id}`,
          { 
            n1:buttonValue[0],
            n2:buttonValue[1],
            n3:buttonValue[2],
            n4:buttonValue[3],
            n5:buttonValue[4],
            n6:buttonValue[5],
            n7:buttonValue[6],
            n8:buttonValue[7],

            type:"4",
            coffee_id1:"34",
            coffee_id2:"35",
            coffee_id3:"37",
          },
          {
            headers: {
              //'Content-Type': 'application/json',
              "Access-Control-Allow-Origin" : "*",

            }
          })
          .then((response) => {//서버에 데이터가 제대로 전송되었을 경우
            console.log(response?.data);
            setCoffee((coffee) => response?.data);//목록 전체를 가져옴
          }).catch((error) => { //서버에 데이터가 제대로 전송되지 않은 경우

            console.log("서버와 연결되지 않습니다");
            window.alert(error);
          })
        
                setNum((num)=> 0);//퀴즈 번호 0번 질문으로 초기화
                
            }
        }
    return (
        <Wrapper>
          <AnimatePresence>  
            <QuizWrapper>              
                {parseInt(match.params.id) < 8 &&
                <Div
                key={match.params.id} //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 2 }}
                variants={divVariants}
                >
                <Title>
                    <h1 style = {{color:"black", fontSize:"40px",fontWeight:"bold"}}>Q{match.params.id}</h1>
                    <h1 style = {{color:"black"}}>ㅣ</h1>
                    <h1 style = {{color:"black", fontSize:"25px",}}>{curQuiz?.title}</h1>
                    {parseInt(match.params.id) == 4 &&
                    <h1 style = {{color:"black", fontSize:"17px", marginTop:"10px"}}> 
                      **로스팅 강도가 약할 수록 산미가 강해지고,강할 수록 쓴맛이 강해진다.
                    </h1>

                    }
                </Title>
                <div
                style = {{flexDirection: "row"}}
                  >
                  {curQuiz?.content && curQuiz?.content.map((item, index) => (
                        <Link to={`/QuizPage/${id}`} key={index} >
                            <Button 
                                onClick={ () => onclick(item)}> {item.answer}
                            </Button>
                        </Link>
                    ))}
                </div>
                    
                </Div>
                }
            
                {parseInt(match.params.id) == 8 &&
                <Div
                key={match.params.id} //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 2 }}
                variants={divVariants}
                >
                <Title>
                    <h1 style = {{color:"black", fontSize:"40px",fontWeight:"bold"}}>Q{match.params.id}</h1>
                    <h1 style = {{color:"black"}}>ㅣ</h1>
                    <h1 style = {{color:"black", fontSize:"25px",}}>{curQuiz?.title}</h1>
                </Title>
                <div
                style = {{flexDirection: "row"}}
                  >
                    {curQuiz?.content && curQuiz?.content.map((item, index) => (
                    //"추천 결과 유형 보여줌 ->"
                        <Link to={`/ResultPage/${coffee[0]?.type}`} key={index}> 
                            <Button 
                                onClick={ () => onclick(item)}> {item.answer}
                            </Button>
                        </Link>
                    ))}
                  
                </div>
                </Div>
            }
          
            </QuizWrapper>
        </AnimatePresence>
        </Wrapper>
    );
};
/*

{curQuiz?.content && curQuiz?.content.map((item, index) => (
                    //"추천 결과 유형 보여줌 ->"
                        <Link to={`/ResultPage/${coffee[0].type}`} key={index}> 
                            <Button 
                                onClick={ () => onclick(item)}> {item.answer}
                            </Button>
                        </Link>
                    ))}
*/
export default withRouter(QuizCard);