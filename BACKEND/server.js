import app from "./app.js";
import http from 'http';
const PORT=process.env.PORT || 300;
const server=http.createServer(app);

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});