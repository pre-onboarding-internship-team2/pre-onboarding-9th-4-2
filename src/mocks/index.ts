import { setupWorker } from "msw";
import { handlers } from "./handlers";

function initMocks() {
  const worker = setupWorker(...handlers);
  worker.start();
}

export default initMocks;
