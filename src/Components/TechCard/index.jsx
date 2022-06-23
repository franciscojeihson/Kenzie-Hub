import { Container } from "./styles";

export const TechCard = ({ tech, ...rest }) => {
  return (
    <Container {...rest}>
      <p>{tech.title}</p>
      <span>{tech.status}</span>
    </Container>
  );
};
