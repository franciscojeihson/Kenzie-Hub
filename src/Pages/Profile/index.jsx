import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Button } from "../../Components/Button";
import { Logo } from "../../Components/Logo";
import { TechCard } from "../../Components/TechCard";
import { Grey2, Grey3 } from "../../Styles/global";
import { Container, Nav } from "./styles";

export const Profile = ({ setName, auth, setAuth }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("@KenzieHub:user")));

  const techs = user.techs;

  useEffect(() => {
    setName(user.name);
  }, [setName, user.name]);

  if (!auth) {
    return <Redirect to="/" />;
  }

  const logout = () => {
    localStorage.clear();
    setAuth(false);
  };

  return (
    <Container>
      <Nav>
        <Logo />
        <Button
          fontSize="12px"
          height="30px"
          padding="0 17px"
          width="auto"
          backgroundColor={Grey3}
          onHover={Grey2}
          onClick={logout}
        >
          Sair
        </Button>
      </Nav>
      <header>
        <h2>Olá, {user.name}</h2>
        <h3>{user.course_module}</h3>
      </header>
      <main>
        <section>
          {techs.map((tech) => (
            <TechCard key={tech.id} tech={tech} />
          ))}
        </section>
      </main>
    </Container>
  );
};
