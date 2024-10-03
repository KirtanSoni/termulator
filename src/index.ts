import { Terminal } from "./terminal";
// import { test_dirCrawler } from "./tests/test_terminal";
import * as readline from 'readline';

const t = new Terminal('root');
// input from user forever
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

rl.setPrompt(t.prompt());
rl.prompt();
rl.on('line', async (input:any) => {
    var val = await t.stdin(input)
    val===""?null:console.log(val);
    rl.setPrompt(t.prompt());
    rl.prompt();
});



