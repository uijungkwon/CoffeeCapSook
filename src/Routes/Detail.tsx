import { styled } from "styled-components";
import {  useParams} from "react-router-dom";
import {  motion} from "framer-motion";
import results from "../contents/results";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICoffeeTop3, coffeeTop3, coffeeTop3Atom } from "../atoms";
import { useQuery } from "react-query";
const Wrapper = styled.div`
  overflow-x: hidden;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color: #f3f3f3ed;
`;
interface RouteParams {
    num: string;
  }
  const Title = styled.div`
  border-radius: 10px;
  background-color: #cc9933db;
  box-shadow: 0px 2px 4px black;
  width:60%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
      color:black;
      font-size:37px;
      font-weight: bold;
  }
`;
const Content = styled.div`
  margin: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
      color:black;
      font-size:21px;
  }
  h2 {
    background-color: #cc9933db;
    text-align: center;
    width:45%;
    font-size:23px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px black;
  }
`;
const Box = styled(motion.div)`
  background: #ddddddc3;
  width: 300px;
  height: 100px;
  font-weight:bold;
  margin-top:50px;

  border-radius: 5px;
  box-shadow: 0px 2px 4px black;
  color: black;
  position: relative;

  cursor:pointer;
  display: flex;
  //align-items: center;
  //justify-content: center;
  //flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  margin-top:10px;
  width: 60px;
  height: 60px;
  margin-left:5px;
`;
const Div = styled(motion.div)`//화면을 부드럽게 넘기는 모션 적용
  margin-top: 70px;
  background-color: #f5f5f5;
  width: 800px; 
  border-radius: 30px;
  box-shadow: 0px 4px 8px black;
  padding: 22px 22px 22px 22px;

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
  const Button = styled.button`
  background-color: #fffbfb;
  font-size:14px;
  font-weight:bold;
  width:40px;

  border-radius: 30px;
  &:hover {//바로 위 태그를 가리킴
      color: #0059ff;
      cursor: pointer;
    }
`;
const Li = styled.li`
  margin-bottom: 10px;
  font-size: 15px;
  list-style-type: square;
  margin-top: 10px;
  margin-left: 60px;

`;
export function Detail(){
  const { num } = useParams<RouteParams>();


  //서버에서 받아온 3개의 객체 
  const coffee = useRecoilValue<ICoffeeTop3[]>(coffeeTop3);

  //test: 3개의 커피를 저장하는 전역 변수 -> 서버객체를 전부 저장 -> 테스트위해서 추가한 코드
  const [test,setTest] = useRecoilState(coffeeTop3Atom);
  setTest((item) => coffee);

  var url = "sample";
  const rarr = "-->";
  const n = parseInt(num);
  
  //타입 별 커피 목록 서버에서 가져오기-5개 데이터 목록 가져오기//

  function fetchcapsule_0() { //마이페이지에 저장된 캡슐 목록 가져오기
    return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/AllResults/0`) //예시 URL
    .then((response) =>
      response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
    );
  }
  const { isLoading, data: type0} = useQuery<ICoffeeTop3[]>('allCoffee0', fetchcapsule_0);


  function fetchcapsule_1() { //마이페이지에 저장된 캡슐 목록 가져오기
    return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/AllResults/1`) //예시 URL
    .then((response) =>
      response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
    );
  }
  const { isLoading : loading1, data: type1} = useQuery<ICoffeeTop3[]>('allCoffee1', fetchcapsule_1);

  function fetchcapsule_2() { //마이페이지에 저장된 캡슐 목록 가져오기
    return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/AllResults/2`) //예시 URL
    .then((response) =>
      response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
    );
  }
  const { isLoading : loading2, data: type2} = useQuery<ICoffeeTop3[]>('allCoffee2', fetchcapsule_2);

  function fetchcapsule_3() { //마이페이지에 저장된 캡슐 목록 가져오기
    return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/AllResults/3`) //예시 URL
    .then((response) =>
      response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
    );
  }
  const { isLoading :loading3, data: type3} = useQuery<ICoffeeTop3[]>('allCoffee3', fetchcapsule_3);

  function fetchcapsule_4() { //마이페이지에 저장된 캡슐 목록 가져오기
    return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/AllResults/4`) //예시 URL
    .then((response) =>
      response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
    );
  }
  const { isLoading :loading4, data: type4} = useQuery<ICoffeeTop3[]>('allCoffee4', fetchcapsule_4);
  
  
  /*
  const coffee = useRecoilValue<ICoffeeTop3[]>(coffeeTop3);
  const [coff,setCoff] = useRecoilState(coffeeTop3Atom);

  setCoff((coff) => coffee);
  console.log(coff);
*/

    return (
     <>
     <Wrapper>
            <Div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 2 }}
            variants={divVariants}
            >
                <Title>
                    <h1>{results[n].title}</h1>
                </Title>   
                <Content>
                  <h1>{results[n].content}</h1>
                </Content>
                
                <br></br>
                    
                <Content>
                  <h2 style = {{color:"black", fontSize:"30px", fontWeight:"bold", marginBottom:"25px"}}>이런 커피가 잘맞아요</h2>
                  <h1>{results[n].feature}</h1>
                  <h2 style = {{color:"black",fontSize:"30px",width:"25%", fontWeight:"bold",marginTop:"30px", marginBottom:"-33px"}}>추천 캡슐</h2>
                </Content>


            {n ==0 ?  (  //0번째 유형에 속하는 캡슐 목록 보여주기 - coffee 대신   "type0" 값 사용!
              <ul>
                <li>{type0?.map((item) => ( //coffee : 백에서 받은 커피 목록이라고 가정
                  <Box>
                    <Img
                    src={require(`../images/capsule/${item.coffee_id}.png`)}
                /> 
                   <ul>
                     <Li>
                      캡슐 이름 :{item.coffeeName}
                     </Li>
                     <Li>
                      맛: {item.tasteAndAroma}
                     </Li>
                     <Li><strong>구매 링크{rarr}</strong> 
                        <Button  onClick={()=>{
                           url = coffee.find((item) => item.coffee_id )?.purchaseLink || "/";
                            window.open(url);
                          
                          }}>click
                         </Button>
                     </Li>
                   </ul>
                    
                  </Box>
                ))}</li>
            </ul>
            ):(
                null
            ) }

            {n ==1 ?  (  //1번째 유형에 속하는 캡슐 목록 보여주기 (test)
              <ul>
                <li>{type1?.map((item) => ( //coffee : 백에서 받은 커피 목록이라고 가정
                  <Box>
                    <Img
                    src={require(`../images/capsule/${item.coffee_id}.png`)}
                /> 
                   <ul>
                     <Li>
                      캡슐 이름 :{item.coffeeName}
                     </Li>
                     <Li>
                      맛: {item.tasteAndAroma}
                     </Li>
                     <Li><strong>구매 링크{rarr}</strong> 
                        <Button  onClick={()=>{
                           url = coffee.find((item) => item.coffee_id )?.purchaseLink || "/";
                            window.open(url);
                          
                          }}>click
                         </Button>
                     </Li>
                   </ul>
                    
                  </Box>
                ))}</li>
            </ul>
            ):(
                null
            ) }

            {n ==2 ?  (  //2번째 유형에 속하는 캡슐 목록 보여주기 (test)
              <ul>
                <li>{type2?.map((item) => ( //coffee : 백에서 받은 커피 목록이라고 가정
                  <Box>
                    <Img
                    src={require(`../images/capsule/${item.coffee_id}.png`)}
                /> 
                   <ul>
                     <Li>
                      캡슐 이름 :{item.coffeeName}
                     </Li>
                     <Li>
                      맛: {item.tasteAndAroma}
                     </Li>
                     <Li><strong>구매 링크{rarr}</strong> 
                        <Button  onClick={()=>{
                           url = coffee.find((item) => item.coffee_id )?.purchaseLink || "/";
                            window.open(url);
                          
                          }}>click
                         </Button>
                     </Li>
                   </ul>
                    
                  </Box>
                ))}</li>
            </ul>
            ):(
                null
            ) }

            {n ==3 ?  (  //3번째 유형에 속하는 캡슐 목록 보여주기 (test)
              <ul>
                <li>{type3?.map((item) => ( //coffee : 백에서 받은 커피 목록이라고 가정
                  <Box>
                    <Img
                    src={require(`../images/capsule/${item.coffee_id}.png`)}
                /> 
                   <ul>
                     <Li>
                      캡슐 이름 :{item.coffeeName}
                     </Li>
                     <Li>
                      맛: {item.tasteAndAroma}
                     </Li>
                     <Li><strong>구매 링크{rarr}</strong> 
                        <Button  onClick={()=>{
                           url = coffee.find((item) => item.coffee_id )?.purchaseLink || "/";
                            window.open(url);
                          
                          }}>click
                         </Button>
                     </Li>
                   </ul>
                    
                  </Box>
                ))}</li>
            </ul>
            ):(
                null
            ) }

            {n ==4 ?  (  //4번째 유형에 속하는 캡슐 목록 보여주기 (test)
              <ul>
                <li>{type4?.map((item) => ( //coffee : 백에서 받은 커피 목록이라고 가정
                  <Box>
                    <Img
                    src={require(`../images/capsule/${item.coffee_id}.png`)}
                /> 
                   <ul>
                     <Li>
                      캡슐 이름 :{item.coffeeName}
                     </Li>
                     <Li>
                      맛: {item.tasteAndAroma}
                     </Li>
                     <Li><strong>구매 링크{rarr}</strong> 
                        <Button  onClick={()=>{
                           url = coffee.find((item) => item.coffee_id )?.purchaseLink || "/";
                            window.open(url);
                          
                          }}>click
                         </Button>
                     </Li>
                   </ul>
                    
                  </Box>
                ))}</li>
            </ul>
            ):(
                null
            ) }

            </Div>
     </Wrapper>
     </>
    );
}