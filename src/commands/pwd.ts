import { Command } from "../types";

const pwd: Command = {
    name: "pwd",
    description: "Print working directory",
    config: undefined,
    execute: async function (args: string[], getPath: CallableFunction): Promise<string> {
        return getPath('.').solved_path;
    },
    location: "terminal"
}
export { pwd };