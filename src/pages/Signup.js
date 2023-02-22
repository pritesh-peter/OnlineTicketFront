
import { useState } from "react";
import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label,Form, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import {toast} from 'react-toastify';
const Signup = () => {

    const [data,setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
    })
    
    const [error,setError] = useState({
        errors:{},
        isError:false,
    })

    //handles a change
    const handleChange =(event,field) =>{
        setData({...data,[field]:event.target.value})
    }

    const resetData =() =>{
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
        });
    };

    const submitForm=(event)=>{
        console.log(data);
        console.log(event);
        event.preventDefault();

        if(error.isError){
            toast.error("For data invalid");
            setError({...error,isError:false})
            return;
        }
        
        console.log(data);
        //data validation

        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp);
            console.log("success")
            toast.success("User Registered successfully");
            resetData();

        }).catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message);
            console.log("Error log")
            //handle errors in proper way
            setError({
                errors:error,
                isError:true,
            });

        });

    };

    return (
        <Base>
      <Container>
        <Row className="mt-4">
        { JSON.stringify(data) }
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
        <CardHeader>
         Fill your information to register!!
        </CardHeader>
        <CardBody>
            {/* Creating Form */}
        <Form onSubmit={submitForm}>
            {/* Name Field */}
            <FormGroup>
                <Label for="name">Enter Name</Label>
                <Input
                type="text"
                placeholder="Enter here"
                id="name"
                onChange={(e)=>handleChange(e,'name')}
                value={data.name}
                invalid={error.errors?.response?.data?.name ? true: false}
                />
                <FormFeedback>
                {error.errors?.response?.data?.name}
                </FormFeedback>
            </FormGroup>
             {/* Email Field */}
              <FormGroup>
                <Label for="email">Enter Email</Label>
                <Input
                type="email"
                placeholder="Enter here"
                id="email"
                onChange={(e)=>handleChange(e,'email')}
                value={data.email}
                invalid={error.errors?.response?.data?.email ? true: false}
                />
                <FormFeedback>
                    {error.errors?.response?.data?.email}
                </FormFeedback>
            </FormGroup>
             {/* Password Field */}
             <FormGroup>
                <Label for="password">Enter Password</Label>
                <Input
                type="password"
                placeholder="Enter here"
                id="password"
                onChange={(e)=>handleChange(e,'password')}
                value={data.password}
                invalid={error.errors?.response?.data?.password ? true: false}
                />
                <FormFeedback>
                {error.errors?.response?.data?.password}
                </FormFeedback>
            </FormGroup>
            {/* About Field */}
            <FormGroup>
                <Label for="about">Enter About yourself</Label>
                <Input
                type="textarea"
                placeholder="Enter here"
                id="about"
                onChange={(e)=>handleChange(e,'about')}
                value={data.about}
                invalid={error.errors?.response?.data?.about ? true: false}
                style={{height:"150px"}}
                />
                <FormFeedback>
                {error.errors?.response?.data?.about}
                </FormFeedback>
            </FormGroup>
            <Container className="text-center">

                <Button color="light" outline>Register</Button>
                <Button onClick={resetData} color="secondary" outline type="reset" className="ms-2">Reset</Button>
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

export default Signup; 