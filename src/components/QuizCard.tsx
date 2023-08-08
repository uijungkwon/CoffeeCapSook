import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useParams,RouteComponentProps,useLocation,useHistory,useRouteMatch ,withRouter } from "react-router-dom";
import quiz from "../contents/questions";

const Wrapper = styled.div`
  overflow-x: hidden;
  height:110vh;
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
  background-color:whitesmoke;
  width: 700px; 
  height: 700px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;

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
    margin-bottom:30px;
`;
const ImgBox = styled.div`
    //background-color: pink;
    width:640px;
    height:350px;
`;
const Button = styled.button`
	width:300px;
    height:60px;
    font-family:"Hanna" ;
    font-weight:bold;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 23px;
	color: ${(props) => props.theme.accentColor};
    margin-top:21px;
`;

interface MatchParams {
    id:string;
};

interface IContent{//질문에 대한 대답, 대답에 대한 점수
    answer:string;
    weight:number[];
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

//배열에 타입 지정 - 점수 배정정
const score:[number[], IScore] = [
    [0, 0, 0, 0, 0, 0, 0, 0],  //score[0]
    {
        'maxScore': 0,         //score[1]
        'maxIdx':0, 
    }
];

// 이 페이지에서 item의 answer 값 가져와서 전체 객체로 저장해서 백으로 넘기는 방법 구현
const QuizCard: React.FC<RouteComponentProps<MatchParams>>
      = ({match}) => {//match는 질문 번호 ex) 1,2,3 ...
        const [curQuiz, setQuiz] = useState<IQuiz>();
        const [id, setId] = useState<number>(0);
    
        useEffect(() => {
            const num = parseInt(match.params.id);
            if (quiz) {
                setQuiz(quiz[num - 1]);//렌더링 시 질문 설정 (현재 주소 파라미터에서 질문 번호 가져온다.
                setId(num + 1);
            }
        }, [match]);//페이지 넘길 때마다 다른 질문이 나오도록 생성

        //답안 버튼 클릭 했을 때 적용 시킬 수 있는 함수
        const onclick = (item:IContent) =>{
            getScore(item.weight);
            console.log(item.answer);//답안 버튼 출력해보기!

        }
    
        //버튼 클릭시 작동되는 함수
        //버튼 값을 저장하는 함수로 변경할지 고민
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
                    <h1 style = {{color:"black", fontSize:"30px",}}>Q{match.params.id}</h1>
                    <br />
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                </Title>
                <ImgBox>
                      <img src={require(`../images/${match.params.id}.png`)}/>
                </ImgBox>
                    {curQuiz?.content && curQuiz?.content.map((item:any, index:number) => (
                        <Link to={`/ResultPage/${score[1].maxIdx}`} key={index}>
                            
                            <Button 
                                onClick={() => onclick(item)}>{item.answer}
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