import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import axios from 'axios';
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
interface IForm { //start 값의 타입
    email: string;
    pw: string;
    pwconfirm:string;
  }
function Enroll(){
    const { register, handleSubmit, setValue , formState: { errors },getValues} = useForm<IForm>({
        mode: "onSubmit",
        defaultValues: {
        email: "",
        pw:"",
        pwconfirm:"",
        },
      });
      const history = useHistory();
      //회원 가입 폼 제출 시 서버 연결
      const onSubmit = ({email,pw,pwconfirm}:IForm) =>{
        
        axios.post('https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/join',
          { //왼쪽 값: 서버 데이터 변수 이름
            email: email ,
            password :pw ,
            password2 :pwconfirm,
          },
          {
            headers: {
              //'Content-Type': 'application/json',
              "Access-Control-Allow-Origin" : "*",
            }
          })
          .then((response) => {
            console.log(response?.data);//제대로 반환되었는지 데이터 확인
            window.alert('회원가입 되었습니다. 로그인해주세요.')
            history.push('/Login')
          }).catch((error) => {
            console.log(error);
            window.alert(error);
          })
    
        //입력 값 초기화
        //alert('회원가입이 완료되었습니다');//윈도우 창 알림
        setValue("email", "");
        setValue("pw","");
        setValue("pwconfirm","");
        
      }

    return (
        <>
        <Wrapper>
        <Title>회원 가입</Title>
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
                          })} 
                          id = "email"
                          placeholder="이메일을 입력하세요" 

                        />  
                        <Span>{errors?.email?.message}</Span>

                        <Label>비밀번호</Label>
                        <Input 
                            {...register("pw",{
                            required:"비밀번호를 입력하세요",
                            minLength: {
                              value: 7,
                              message: "7자리 이상 비밀번호를 입력하세요.",
                            },
                          })}
                          id = "pw"
                          type="password"
                          placeholder="비밀번호를 입력하세요" 
                        />

                      {errors.pw && (
                         <Span >{errors.pw.message}</Span>
                        )}
                        <Label>비밀번호 확인</Label>
                            <Input 
                                {...register("pwconfirm",{
                                required:"비밀번호를 한번 더 입력하세요",
                                validate: {
                                    check: (val) => {
                                      if (getValues("pw") !== val) {
                                        return "비밀번호가 같지 않습니다.";
                                      }
                                    }
                                  }
                             })}
                            id = "pwconfirm"
                            type="password"
                            placeholder="비밀번호를 한번 더 입력하세요" 
                            />
                    {errors?.pwconfirm && (
                        <Span>{errors.pwconfirm.message}</Span>
                        )}
                        <Button >회원 가입</Button>
                 </CreateForm>
                
            </Box>
        </Wrapper>
        </>
    );
}

export default Enroll;