import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo/Original on Transparent.png";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";

function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2222/api/auth/login",
        {
          email,
          password,
        }
      );

      sessionStorage.setItem("token", response.data.token);
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="login-page">
      <img className="login__logo" src={Logo} alt="Logo" />
      <form className="login" onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <TextField
            type="text"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "white",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            LOGIN{" "}
          </Button>
        </Stack>
        {error && <div className="login__message">{error}</div>}
      </form>
    </main>
  );
}

export default Login;
