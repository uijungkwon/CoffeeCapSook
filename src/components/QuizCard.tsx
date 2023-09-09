import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { RouteComponentProps,withRouter } from "react-router-dom";
import quiz from "../contents/questions";
import { useRecoilValue } from 'recoil';
import {  isMemIdAtom } from '../atoms';
import { useQuery } from 'react-query';

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
  background-color:whitesmoke;
`;

const Div = styled(motion.div)`
  background-color:whitesmoke;
  width: 600px; 
  height: 600px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black; 
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
    margin-bottom:30px;
`;
const ImgBox = styled.div`
    width:540px;
    height:300px;
`;
const Button = styled.button`
	width:300px;
    height:40px;
    font-family:"Hanna" ;
    font-weight:bold;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 23px;
	color: ${(props) => props.theme.accentColor};
    margin-top:21px;
    &:hover {//바로 위 태그를 가리킴
      color: #213fff;
      cursor: pointer;
    }
`;

interface MatchParams {
    id:string;
};

interface IContent{//질문에 대한 대답, 대답에 대한 점수
    answer:string;
    weight:number[];
    value:number;
}
interface IQuiz {//질문 제목, 질문 내용
    title:string;
    content: IContent[];
};
interface IScore {//점수 매길 때 최고 번호, 최고 점수 
    maxIdx:number;
    maxScore:number;
};
const QuizWrapper = styled.div`
  text-align : center;
  margin : 0;
  padding : 0;
`;
//배열에 타입 지정 - 점수 배정
const score:[number[], IScore] = [
    [0, 0, 0, 0, 0, 0, 0, 0],  //score[0]
    {
        'maxScore': 0,         //score[1]
        'maxIdx':0, 
    }
];
//사용자가 누른 버튼 값 저장
const buttonValue:number[] = [0,0,0,0,0];

/* 반환 데이터 값 예시로 작성 */
interface ITest{
  capsule_type:string;
  capsule_id:string; //캡슐 id만 넘겨 받을지, 전체 속성을 다 줄지 의논!
};

const QuizCard: React.FC<RouteComponentProps<MatchParams>>
      = ({match}) => {//match는 퀴즈 번호 ex) 1,2,3 ...
        //0) recoil 값 가져오기  & API fetch 하기
        const member_id = useRecoilValue(isMemIdAtom);

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
            
            if(num === 4){
                console.log(buttonValue); //=>> 해당 배열을 서버에 전송할 수 있음 - 정상 출력
        /*서버 전송 코드 
          axios.post( `https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/favorite-test/${member_id}`,
          { //왼쪽 값: 서버 데이터 변수 이름(일단 샘플로 작성), 오른쪽 값: 프론트 변수 이름 
            n1:buttonValue[0]+",
            n2:buttonValue[1]+",
            n3:buttonValue[2]+",
            n4:buttonValue[3]+",
            n5:buttonValue[4]+",
          },
          {
            headers: {
              //'Content-Type': 'application/json',
              "Access-Control-Allow-Origin" : "*",

            }
          })
          .then((response) => {//서버에 데이터가 제대로 전송되었을 경우
          }).catch((error) => { //서버에 데이터가 제대로 전송되지 않은 경우
            console.log("서버와 연결되지 않습니다");
            window.alert(error);
          })
        */
                setNum((num)=> 0);//퀴즈 번호 0번 질문으로 초기화
                
            }
            getScore(item.weight);
        }
        const getScore = (arr:number[]) => {
            let idx = 0;
            arr.map((item => {
                score[0][idx] = +score[0][idx] + item;
                if (score[0][idx] > +score[1].maxScore) {
                    score[1].maxScore = score[0][idx];
                    score[1].maxIdx = idx;
                }
                idx++;
            }));
        };
    return (
        <Wrapper>
          <AnimatePresence>  
            <QuizWrapper>              
                {parseInt(match.params.id) < 5 &&
                <Div
                key={match.params.id} //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 2 }}
                variants={divVariants}
                >
                <Title>
                    <h1 style = {{color:"black", fontSize:"45px",fontWeight:"bold"}}>Q{match.params.id}</h1>
                    <h1 style = {{color:"black"}}>ㅣ</h1>
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                </Title>
                    <ImgBox>
                      <img src={require(`../images/${match.params.id}.png`)}/>
                    </ImgBox>
                    {curQuiz?.content && curQuiz?.content.map((item, index) => (
                        <Link to={`/QuizPage/${id}`} key={index} >
                            <Button 
                                onClick={ () => onclick(item)/*() => getScore(item.weight)*/}> {item.answer}
                            </Button>
                        </Link>
                    ))}
                </Div>
                }
            
                {parseInt(match.params.id) == 5 &&
                <Div
                key={match.params.id} //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 2 }}
                variants={divVariants}
                >
                <Title>
                    <h1 style = {{color:"black", fontSize:"30px",}}>Q{match.params.id}</h1>
                    <br />
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                </Title>
                <ImgBox>
                      <img  src={require(`../images/${match.params.id}.png`)}/>
                </ImgBox>
                    {curQuiz?.content && curQuiz?.content.map((item:any, index:number) => (
                        <Link to={`/ResultPage/${score[1].maxIdx}`} key={index}>
                            
                            <Button 
                                onClick={() => onclick(item)
                                }>{item.answer}
                            </Button>
                        </Link>
                    ))}
                </Div>
            }
          
            </QuizWrapper>
        </AnimatePresence>
        </Wrapper>
    );
};

export default withRouter(QuizCard);