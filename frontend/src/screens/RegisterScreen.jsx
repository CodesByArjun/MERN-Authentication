import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";


const RegisterScreen = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [register, { isLoading }] = useRegisterMutation();
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {
            try {
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }
    return (
        <>
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={confirmPassword} placeholder="Re-Enter Password" onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Sign Up
                    </Button>
                    {isLoading && <Loader />}
                    <Row className="py-3">
                        <Col>
                            Already have an account?? <Link to='/login'>Login</Link>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>

        </>

    )
}

export default RegisterScreen;