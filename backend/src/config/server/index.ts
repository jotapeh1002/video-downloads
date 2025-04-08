import { serverApp } from "../app";

const _PORT = 3333;

serverApp.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
})