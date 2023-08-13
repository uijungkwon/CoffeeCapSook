import { motion } from "framer-motion";
import { styled } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {atom, useRecoilState, useRecoilValue} from "recoil";
import axios from "axios";
import { isLoginAtom } from "../atoms";

const Wrapper = styled.div`
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color: whitesmoke;
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
const CreateForm = styled.form`
  padding: 0px 20px;
	display: flex;
	position: relative;
	width: 100%;
	height: 1 px;
	margin: 0 auto;
	margin-bottom: 10px;
	background-color: ${(props) => props.theme.cardColor};
  flex-direction: column;//위아래로 input 창 뜨게 만들기
  margin-left:40px;
`;

const Input = styled.input`
  width:300px;
  height:55px;
	border: 1;
	border-radius: 10px;
	background-color: rgba(242, 242, 242, 0.798);
	padding: 8px 15px;
  margin-bottom:20px;
	font-size: 20px;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.textColor};
`;
const Button = styled.button`
	width:200px;
  height:50px;
  font-family:"Hanna" ;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 25px;
	color: ${(props) => props.theme.accentColor};
  margin-top:50px;
  margin-left:50px;
`;
const Label = styled.label`
  font-size:20px;
  color:black;
`;
const Span = styled.span`
  color:red;
  font-weight:bold;
`
interface IForm { //start 값의 타입
    email: string;
    pw: string;
  }
  
function Login(){
    //로그인 폼 구현
  const [log, setLog] = useRecoilState(isLoginAtom);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const history = useHistory();

  const { register, handleSubmit, setValue , formState: { errors },} = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      pw:""
    },
  });
  
  
  const onSubmit = ({email,pw}:IForm) =>{
    /*
    axios.post('배포한 서버URL',
    {
      email: email ,
      password :pw,
    },
    {
      headers: {
        //'Content-Type': 'application/json',
        //"Access-Control-Allow-Origin" : "*",

      }
    })
    .then((response) => {
      window.alert('로그인 완료되었습니다.')
      setMember((member=> response?.data?.member_id));
      console.log(response?.data?.member_id);
      history.push('/')
    })
    .catch((error) => {
      //console.log(error.response.data);
      window.alert(error);
    })
    */

    //입력 값 초기화
    alert('로그인이 완료되었습니다');
    setValue("email", "");
    setValue("pw","");
    setLog((log) => email); // recoil로 전역변수로써 한번 저장하면 계속 사용할 수 있음
    //실제로는 서버에서 반환받은 이메일 작성!
    history.push('/');
  }


  return (
    <>
    <Wrapper>
        <Title>로그인</Title>
        <Box>
            <CreateForm onSubmit={handleSubmit(onSubmit)}>
                    <Label>이메일</Label>
                    <Input 
                      {...register("email", 
                      { required: "이메일을 입력하세요",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                        message:"이메일 형식에 맞지 않습니다.",
                      }, 
                      })} placeholder="이메일을 입력하세요" 
                    />  
                    <Span>{errors?.email?.message}</Span>

                    <Label>비밀번호</Label>
                    <Input 
                        {...register("pw",{
                        required:"Please write pw",
                      })}
                      type={showPswd ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요" 
                    />
                    <Button  >로그인</Button>
                    </CreateForm>
            
                    </Box>
                </Wrapper>
                </>
            );
}
export default Login;
/*
return (
        <>
        <Wrapper>
            <Title>로그인</Title>
            <Box>
                <CreateForm onSubmit={handleSubmit(onSubmit)}>
                        <Label>이메일</Label>
                        <Input 
                          {...register("email", 
                          { required: "Email is required",
                            pattern: {
                            value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
                            message:"이메일 형식에 맞지 않습니다.",
                          }, 
                          })} placeholder="이메일을 입력하세요" 
                        />  
                        <Span>{errors?.email?.message}</Span>

                        <Label>비밀번호</Label>
                        <Input 
                            {...register("pw",{
                            required:"Please write pw",
                          })}
                          type={showPswd ? "text" : "password"}
                          placeholder="비밀번호를 입력하세요" 
                        />
                        <Button /*onClick={signIn} >로그인</Button>
                        </CreateForm>
                
                        </Box>
                    </Wrapper>
                    </>
                );
*/
/*
return (
    <>
    <Wrapper>
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
    </Wrapper>
    </>

  );
*/