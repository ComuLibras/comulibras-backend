import { Registry } from "../registry";
import { registerProviders } from "./providers";
import { registerRepositories } from "./repositories";

export const container = Registry.getInstance();

registerRepositories();
registerProviders();
