import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroColaborador from "./pages/CadastroColaborador"
import PaginaBase from "./pages/PaginaBase"
import PaginaInicial from "./pages/PaginaInicial"
import Login from "./pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import CadastroTime from "./pages/CadastroTime"
import MostrarTime from "./pages/MostrarTime"
import MostrarColaboradores from "./pages/MostrarColaboradores"
import EditarColaborador from "./pages/EditarColaborador"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PaginaBase />}>

                    <Route path="/" element={<ProtectedRoute element={<PaginaInicial />} />} />

                    <Route path="/cadastrarColaborador" element={<ProtectedRoute element={<CadastroColaborador />} />} />

                    <Route path="/editarColaborador/:idColaborador" element={<ProtectedRoute element={<EditarColaborador />} />} />

                    <Route path="/cadastrarTime" element={<ProtectedRoute element={<CadastroTime />} />} />

                    <Route path="/mostrarTime/:idTime" element={<ProtectedRoute element={<MostrarTime/>}/>}/>

                    <Route path="/adicionarColaborador/:idTime" element={<ProtectedRoute element={<MostrarColaboradores adicionar={true}/>} />} />

                    <Route path="/colaboradores" element={<ProtectedRoute element={<MostrarColaboradores excluirEditar={true}/>} />} />

                    <Route path="/login" element={<Login/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes