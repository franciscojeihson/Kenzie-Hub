import { Container, Content } from "./styles"
import Input from '../Input'
import Button from "../Button"
import { useForm } from "react-hook-form"
import api from "../../services/api"
import {toast}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({token, skills, setSkills, setShouldOpenModal}) => {


    const {register, handleSubmit} = useForm()

    const onSubmitFunction = (data) => {
        api
        .post("/users/techs", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => setSkills([...skills, data]))
        .then(toast.success("Tecnologia adicionada"))
    }


    return(
        <Container>
            <Content>
                <div className="header-modal">
                    <h1>Cadastrar tecnologia</h1>
                    <button onClick={() => setShouldOpenModal(false)}>X</button>
                </div>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    
                    <Input 
                        register={register}
                        label="Nome"
                        name="title" 
                        placeholder="Nova tecnologia" 
                    />
                    <label>Selecionar status</label>
                    <select {...register("status")} >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <Button 
                        type="submit" 
                        backgroundColor="var(--pink)" 
                        color="var(--white)"
                    >Cadastrar Tecnologia</Button>
                </form>
            </Content>
        </Container>
    )
}
export default Modal