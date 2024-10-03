import { Command } from "../types";
import fs from 'fs'

const ls : Command = {
    name: "",
    description: "",
    config: undefined,
    execute: async function (args: string[], getPath: CallableFunction): Promise<string> {
        const { solved_path, mainpath } = getPath('.');
        // console.log(mainpath)
        return fs.readdirSync(mainpath)?.toString().split(',').join("   ")||"Empty Directory"; 
    },
    location: ""
} 
export {ls};


