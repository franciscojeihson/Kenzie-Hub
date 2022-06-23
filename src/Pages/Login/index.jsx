import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import { Logo } from "../../Components/Logo";
import { Button } from "../../Components/Button";
import {
  ColorPrimary,
  ColorPrimaryFocus,
  Grey1,
  Grey2,
} from "../../Styles/global";
import { Container } from "./styles";
import { Input } from "../../Components/Input";
import api from "../../Components/Api/api";

export const Login = ({ auth, setAuth }) => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha inválida"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (userInfo) => {
    api
      .post("/sessions", userInfo)
      .then((response) => {
        const { token } = response.data;
        const { user } = response.data;

        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:user", JSON.stringify(user));

        setAuth(true);

        return history.push("/profile");
      })
      .catch((err) =>
        toast.error("Email ou senha inválidos. Tente novamente.")
      );
  };

  if (auth) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container>
      <header>
        <Logo />
      </header>
      <main>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Input
            name="email"
            register={register}
            label="Email"
            placeholder="email@exemplo.com"
            error={errors.email?.message}
          />

          <Input
            borderColor={Grey2}
            name="password"
            register={register}
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            error={errors.password?.message}
          />
          <Button
            backgroundColor={ColorPrimary}
            onHover={ColorPrimaryFocus}
            type="submit"
          >
            Entrar
          </Button>
          <p>Ainda não possui uma conta?</p>
          <Button
            type="button"
            backgroundColor={Grey1}
            onHover={Grey2}
            onClick={() => history.push("/register")}
          >
            Cadastre-se
          </Button>
        </form>
      </main>
    </Container>
  );
};
