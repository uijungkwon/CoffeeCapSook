import { motion } from "framer-motion";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useRecoilState} from "recoil";
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
    margin-top:-500px;
    font-size:40px;
    font-weight:bold;
    color:black;
`;
const Box = styled(motion.div)`
  width: 450px;
  height: 450px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;
  margin-top:15px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-weight:bold;
`;
const Span = styled.span`
  color:red;
  font-weight:bold;
`
interface IForm {
    email: string;
    pw: string;
  }
  
function Login(){
  //1) 로그인 완료 후, 이메일 상태 변화
  const [log, setLog] = useRecoilState(isLoginAtom);
  //2) 비밀번호 설정
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const history = useHistory();
  //3) 이메일,비밀번호 state 생성
  const { register, handleSubmit, setValue , formState: { errors },} = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      pw:""
    },
  });
  
  //서버에 로그인 폼 제출
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
      setLog((log) => response?.data?.email);//로그인 완료되면, log값을 반환받은 이메일 값으로 변경
      console.log(log));//"email" 이름으로 반환받는 다고 가정
      history.push('/') //로그인 후 홈화면으로 돌아가기
    })
    .catch((error) => {
      console.log(error.response.data);
      window.alert(error);
    })
    */

    //폼 입력 값 초기화
    alert('로그인이 완료되었습니다');
    setValue("email", "");
    setValue("pw","");
    setLog((log) => email); 
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