import React, { useState } from "react";
import { auth } from "../database/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./userAuthentication.css";

function Authentication() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <>
      <div className="background">
        <Container className="log-container">
          <Row className="justify-content-center">
            <h1 className="text-left mb-3"style={{ fontSize: "44px", color: "#71CF48" }} >
              {isLogin ? "Login" : "Create an account"}
            </h1>
            <Form onSubmit={loginSubmit}>
              <Form.Group>
                <Form.Control className="input-form"  type="email"  placeholder="Enter email"  onChange={(event) => setEmail(event.target.value)}   />
              </Form.Group>
              <Form.Group>
                <Form.Control   className="input-form"  type="password"  placeholder="Password"  onChange={(event) => setPassword(event.target.value)}  />
              </Form.Group>
              <Button type="submit"  className="submit-btn "  style={{  height: "50px",   backgroundColor: "#68C142",  borderBlockColor: "#68C142", }}>
                Submit
              </Button>
              <div>
                <p className="m-3 ">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Button className=" mt-4 mb-4"style={{ color: "#68C142", fontSize: "20px" }}variant="link"onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Create an account" : "Login"}
                  </Button>
                </p>
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Authentication;
