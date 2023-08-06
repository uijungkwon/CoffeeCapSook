import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
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
const Title = styled.div`
    position: absolute;
    margin-top:-550px;
    font-size:40px;
    font-weight:bold;
    color:black;
`;
const Box = styled(motion.div)`
  //background: #f5f5f50;
  width: 450px;
  height: 450px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  //flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
	width:200px;
    height:50px;
    font-family:"Hanna" ;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 20px;
	color: ${(props) => props.theme.accentColor};
    margin-top:50px;
    margin-left:50px;
`;

interface MatchParams {
    id:string;
};

interface QuizCardProps extends RouteComponentProps<MatchParams> {
  }
interface IContent{
    answer:string;
    weight:number[];
}
interface IQuiz {
    title:string;
    content: IContent[];
};
interface IScore {
    maxIdx:number;
    maxScore:number;
};
const QuizWrapper = styled.div`
  text-align : center;
  margin : 0;
  padding : 0;
`;

//배열에 타입 지정 
const score:[number[], IScore] = [
    [0, 0, 0, 0, 0, 0, 0, 0],  //score[0]
    {
        'maxScore': 0,         //score[1]
        'maxIdx':0, 
    }
];
// 이 페이지에서 item의 answer 값 가져와서 전체 객체로 저장해서 백으로 넘기는 방법 구현
const QuizCard: React.FC<RouteComponentProps<MatchParams>>
      = ({match}) => {
        const [curQuiz, setQuiz] = useState<IQuiz>();
        const [id, setId] = useState<number>(0);
    
        useEffect(() => {
            const num = parseInt(match.params.id);
            if (quiz) {
                setQuiz(quiz[num - 1]);    //렌더링 시 질문 설정 (현재 주소 파라미터에서 질문 번호 가져온다.
                setId(num + 1);
            }
        }, [match]);

       
    
        const getScore = (arr:number[]) => {
            let idx = 0;
            arr.map((item => {
                score[0][idx] = +score[0][idx] + item;  //score value가 NaN이라 형변환 해줌
                if (score[0][idx] > +score[1].maxScore) {
                    score[1].maxScore = score[0][idx];
                    score[1].maxIdx = idx;
                }
                idx++;
            }));
            
        };
        
    return (
        <Wrapper>
            <QuizWrapper>
                {parseInt(match.params.id) < 8 &&
                <div>
                    <h1 style = {{color:"black", fontSize:"30px",}}>Q{match.params.id}</h1>
                    <br />
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                    {curQuiz?.content && curQuiz?.content.map((item, index) => (
                        <Link to={`/QuizPage/${id}`} key={index} >
                            <Button 
                                onClick={() => getScore(item.weight)}> {item.answer}
                            </Button>
                        </Link>
                    ))}
                </div>
                }
                {parseInt(match.params.id) == 8 &&
                <div>
                    <h1 style = {{color:"black", fontSize:"30px",}}> Q{match.params.id}</h1>
                    <br />
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                    {curQuiz?.content && curQuiz?.content.map((item:any, index:number) => (
                        <Link to={`/ResultPage/${score[1].maxIdx}`} key={index}>
                            
                            <Button 
                                onClick={() => getScore(item.weight)}>{item.answer}
                            </Button>
                        </Link>
                    ))}
                </div>
            }
            </QuizWrapper>
        </Wrapper>
    );
};

export default withRouter(QuizCard);
//결과 링크로 옮김
/*
{parseInt(match.params.id) == 8 &&
                <div>
                    <h1 style = {{color:"black", fontSize:"30px",}}> Q{match.params.id}</h1>
                    <br />
                    <h1 style = {{color:"black", fontSize:"30px",}}>{curQuiz?.title}</h1>
                    {curQuiz?.content && curQuiz?.content.map((item:any, index:number) => (
                        <Link to={`/Result/${score[1].maxIdx}`} key={index}>
                            
                            <Button 
                                onClick={() => getScore(item.weight)}>{item.answer}
                            </Button>
                        </Link>
                    ))}
                </div>
            }
*/