import { Container } from "react-bootstrap";
import SignUp from "../components/SignUp";

function SignUpPage() {
    return (
        <Container style={{ minHeight: "100vh", display: "block", alignItems: "center", justifyContent: "center" }}>
            <SignUp />
        </Container>
    );
}

export default SignUpPage;