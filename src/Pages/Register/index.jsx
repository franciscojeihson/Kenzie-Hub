import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { Logo } from "../../Components/Logo";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import {
  Grey3,
  ColorPrimaryNegative,
  Grey2,
  ColorPrimary,
} from "../../Styles/global";
import { Container } from "./styles";
import { Select } from "../../Components/Select";

export const Register = () => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Caracteres inválidos")
      .min(8, "Caracteres insuficientes")
      .required("Nome obrigatório"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Deve conter ao menos 8 caracteres, uma letra minuscula, uma maiúscula, um número e um carácter especial"
      )
      .required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Senha obrigatória"),
    bio: yup.string().required("Campo obrigatório"),
    contact: yup.number("Telefone inválido").required("Telefone obrigatório"),
    course_module: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    delete data.confirm_password;
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then(history.push("/"))
      .catch((err) => {
        toast.error("Ops! Algo deu errado");
      });
    toast.success("Conta criada com sucesso");
  };

  return (
    <Container>
      <nav>
        <Logo />
        <Button
          fontSize="12px"
          height="30px"
          padding="0 17px"
          width="auto"
          onHover={Grey2}
          backgroundColor={Grey3}
          onClick={() => history.push("/")}
        >
          Voltar
        </Button>
      </nav>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Crie sua conta</h2>
        <h3>Rapido e grátis, vamos nessa</h3>
        <Input
          name="name"
          register={register}
          label="Nome"
          placeholder="Digite aqui seu nome"
          error={errors.name?.message}
        />
        <Input
          name="email"
          register={register}
          label="Email"
          placeholder="Digite aqui seu email"
          error={errors.email?.message}
        />
        <Input
          name="password"
          register={register}
          label="Senha"
          placeholder="Digite aqui sua senha"
          error={errors.password?.message}
          type="password"
        />
        <Input
          name="confirmPassword"
          register={register}
          label="Confirmar Senha"
          placeholder="Digite aqui sua senha"
          error={errors.confirmPassword?.message}
          type="password"
        />
        <Input
          name="bio"
          register={register}
          label="Bio"
          placeholder="Digite aqui sua bio"
          error={errors.bio?.message}
        />
        <Input
          name="contact"
          register={register}
          label="Telefone"
          placeholder="Digite aqui seu número"
          error={errors.contact?.message}
        />
        <Select
          register={register}
          name="course_module"
          op1="Primeiro módulo"
          op2="Segundo módulo"
          op3="Terceiro módulo"
          width="91%"
          error={errors.course_module?.message}
        />
        <Button
          type="submit"
          onHover={ColorPrimary}
          backgroundColor={ColorPrimaryNegative}
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
};
