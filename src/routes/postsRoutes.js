import express from "express"; // Importa o frameworl para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; 
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo
        cb(null, file.originalname);
    }
})

// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads" , storage})

// Define as rotas usando o objeto Express app
const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts 
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost)
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;