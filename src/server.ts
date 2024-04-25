import { App } from "./app";
import { TesteController } from "./controller/teste";

const app = new App([
    new TesteController(),
])
app.listen()