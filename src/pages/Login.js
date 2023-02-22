import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label,Form, Button, Row, Col } from "reactstrap";
import { doLogin } from "../auth";

import Base from "../components/Base";
import userContext from "../context/userContext";
import { loginUser } from "../services/user-service";

const Login = () => {

    const userContextData = useContext(userContext);

    const navigate = useNavigate();

    const [loginDetail,setLoginDetail] = useState({
        username:'',
        password:''
    })

    const handleChange = (event, field) => {
        setLoginDetail({...loginDetail,[field]:event.target.value})
    }

    const handleReset =() =>{
        setLoginDetail({
            username:'',
            password:''
        })
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault();

        //validation
        if(loginDetail.username.trim()==='' || loginDetail.password.trim()===''){
            toast.error("Username or Password is required!!");
            return;
        }

        //submit the data to server to generate token
        loginUser(loginDetail).then((data)=>{
            console.log("user login::")
            console.log(data);
            doLogin(data,()=>{
                userContextData.setUser({
                    data:data.user,
                    login:true
                })
                if(data.user.roles[0].id===502){
                    navigate("/")
                }else{
                    navigate("/admin/dashboard")
                }
            });
            toast.success("Login Success"); 
        }).catch(error=>{
            console.log(error);
            if(error.response.status==400 || error.response.status==404){
                toast.error(error.response.data.message);
            }else{toast.error("Something went wrong on server");
        }
        })
    }

    return (
        <Base>
        <Container>
        <Row className="mt-4">
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
        <CardHeader>
         Login Here!!
        </CardHeader>
        <CardBody>
            {/* Creating Form */}
        <Form onSubmit={handleFormSubmit}>
            {/* Email Field */}
            <FormGroup>
                <Label for="email">Enter Email</Label>
                <Input
                type="text"
                placeholder="Enter here"
                id="email"
                value={loginDetail.username}
                onChange={(e)=> handleChange(e,'username')}
                />
            </FormGroup>
             {/* Password Field */}
              <FormGroup>
                <Label for="password">Enter Password</Label>
                <Input
                type="password"
                placeholder="Enter here"
                id="password"
                value={loginDetail.password}
                onChange={(e)=>handleChange(e,'password')}

                />
            </FormGroup>
            
            <Container className="text-center">

                <Button color="light" outline>Login</Button>
                <Button onClick={handleReset} color="secondary" outline type="reset" className="ms-2">Reset</Button>
            </Container>
        </Form>

        </CardBody>
        </Card>
            </Col>
        </Row>
      </Container>
        </Base>
    )
};

export default Login; 