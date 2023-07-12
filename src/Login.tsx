import { motion } from "framer-motion";
import { styled } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
const homeBg = require("./images/homeBg.png");
const Wrapper = styled.div`
  overflow-x: hidden;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-image:linear-gradient(rgba(0, 0, 0, 0.195), #000000ca),
  url(${homeBg});// 첫번째 프레임 배경사진 삽입
  background-repeat: no-repeat;
`;
const FontBox = styled.div`
    position: absolute;
    margin-top:-700px;
    h1 {
    font-family:'Just Me Again Down Here', cursive;
    font-size: 80px;
    margin-left:100px;
    margin-top:30px;
    font-weight: bold;
    }
`;
const Box = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
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
    width: 65%;
	border: 1;
	border-radius: 10px;
	background-color: rgba(254, 176, 98, 0.798);
	padding: 8px 15px;
	font-size: 20px;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.textColor};
`;
const Button = styled.button`
	width: 40%;
	background-color: rgba(254, 176, 98, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 20px;
	color: ${(props) => props.theme.accentColor};
    margin-top:170px;
    margin-left:80px;
`;
const Label = styled.label`
  font-size:20px;
  color:black;
`;
interface IForm { //start 값의 타입
    id: string;
    pw: string;
  }
  
function Login(){
    //로그인 폼 구현
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const history = useHistory();

  const { register, handleSubmit, setValue } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      id:"",
      pw:""
    },
  });
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setId(value);
  };
  const onSubmit = (data:IForm) =>{
    console.log( data.id, " and ",data.pw );
    setValue("id","");
    setValue("pw","");
    history.push('/');
  }
    return (
        <>
        <Wrapper>
            <FontBox>
                <h1>coffe capsook</h1>
            </FontBox>
            <Box>
                <CreateForm onSubmit={handleSubmit(onSubmit)}>
                        <Label>아이디</Label>
                        <Input 
                            {...register("id",{
                            required:"Please write id",
                          })} 
                          placeholder="아이디를 입력하세요" 
                        />  
                        <Label>비밀번호</Label>
                        <Input 
                            {...register("pw",{
                            required:"Please write pw",
                          })}
                          type={showPswd ? "text" : "password"}
                          placeholder="비밀번호를 입력하세요" 
                        />
                        <Button >로그인</Button>
                 </CreateForm>
                
            </Box>
        </Wrapper>
        </>
    );
}
export default Login;