import { setupWorker } from "msw";
import { handlers } from "./handlers";

async function initMocks() {
  const worker = setupWorker(...handlers);
  worker.start();
}

export default initMocks;
