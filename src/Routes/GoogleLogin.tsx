import { useGoogleLogin } from "@react-oauth/google";
import { styled } from "styled-components";
import axios from "axios";

const { google } = window;

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
const Button = styled.button`
	width:300px;
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
const GoogleLogin = () => {
  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    //1)로그인에 성공할 경우
    onSuccess: async ({ code }) => {
      
      axios
        .post("http://localhost:4000/auth/google/callback", { code })
        .then(({ data }) => {
          console.log(data);
        });
        
    },
    onError: (errorResponse) => {
      console.log("실패");
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  return (
    <Wrapper >
       
        
        <Button onClick={googleSocialLogin}><img style = {{width:"30px", height:"30px"}} src="https://www.svgrepo.com/show/355037/google.svg" /> Google Button</Button>
      
    </Wrapper>
  );
};

export default GoogleLogin;