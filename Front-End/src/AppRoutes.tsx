import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroColaborador from "./pages/CadastroColaborador"
import PaginaBase from "./pages/PaginaBase"
import PaginaInicial from "./pages/PaginaInicial"
import Login from "./pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import MostrarColaboradores from "./pages/MostrarColaboradores"
import EditarColaborador from "./pages/EditarColaborador"
import CadastroEquipe from "./pages/CadastroEquipe"
import MostrarEquipe from "./pages/MostrarEquipe"
import MostrarColaborador from "./pages/MostrarColaborador"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PaginaBase />}>

                    <Route path="/login" element={<Login/>}/>

                    <Route path="/" element={<ProtectedRoute element={<PaginaInicial />} />} />

                    <Route path="/cadastrarColaborador" element={<ProtectedRoute element={<CadastroColaborador />} />} />

                    <Route path="/editarColaborador/:idColaborador" element={<ProtectedRoute element={<EditarColaborador />} />} />

                    <Route path="/colaborador/:idColaborador" element={<ProtectedRoute element={<MostrarColaborador />} />} />

                    <Route path="/colaboradores" element={<ProtectedRoute element={<MostrarColaboradores excluirEditar={true}/>} />} />

                    <Route path="/cadastrarEquipe" element={<ProtectedRoute element={<CadastroEquipe />} />} />

                    <Route path="/equipe/:idEquipe" element={<ProtectedRoute element={<MostrarEquipe/>}/>}/>

                    <Route path="/adicionarColaborador/:idEquipe" element={<ProtectedRoute element={<MostrarColaboradores adicionar={true}/>} />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes