import { Command } from "./types";
import fs from 'fs'



//todo history
//todo cls


class Terminal {
    private rootDir: string;
    user:string|undefined;
    host:string|undefined;

    private currentDir: string; // has to end in '/'
    inbuiltCommands: Command[];


    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.currentDir = '/';
        this.inbuiltCommands = this.getCommands() || [];
    }


    getCurrentDir(){
        return this.currentDir.endsWith('/') ? this.currentDir : this.currentDir+'/';
    }

    private getCommands(): Command[] | [] {

        const sudo:Command={
            name: "sudo",
            description: "login to your account to begin",
            config: undefined,
            execute: function (args: string[], getpath: CallableFunction): Promise<string> {
                throw new Error("Function not implemented.");
            },
            location: ""
        }
         
        const cd: Command = {
            name: "cd",
            description: " Change directory \n -h , --help : ",
            location: "terminal",
            config: {},
            execute: async (args: string[], getPath:CallableFunction): Promise<string> => {
                if(args.length===0)
                    return "No Arguments Passed, use -h for help"
                try{
                    const { solved_path, mainpath } = getPath(args[0]);
                    if(fs.lstatSync(mainpath).isDirectory())
                    {this.currentDir = solved_path;return "";}
                    else
                        return "Not a directory"
                }
                catch(e: any){
                   return e.message
                }
                
            },
          };

        return [cd,sudo];
    }

    getRootDir(): string {
        return this.rootDir;
    }

    prompt():string{
        if(this.user===undefined || this.host===undefined)
            return `user@$personal ${this.getCurrentDir()}:`
        else
            return `\n${this.user}@${this.host} :`
    }
    setUser(user:string,host:string){
        this.user = user;
        this.host = host;
    }

    async stdin(input: string): Promise<string|void> {
        let inputArr = input.split(" ").filter(arg=>arg!=""?arg:[]); //split into command and args
        let command_name = inputArr[0];
        let args = inputArr.slice(1);

        
            // TODO: Code Debt
            // execute command
            for(const command of this.inbuiltCommands){
                if (command.name == command_name)
                {   
                    const stdout = await command.execute(args,this.dirCrawler())
                    return stdout;
                }
            }



            const stdout = import(`./commands/${command_name}.ts`)
                .then((command) => {
                    return command[command_name].execute(args, this.dirCrawler());
                })
                .catch((err) => {
                    return `Error: ${err}`;
                });
            return stdout;
        }
      

    dirCrawler():CallableFunction{                              // DIRECTORY CRAWLER
        const currentDir= this.getCurrentDir();
        
            return (path:string)=>{
                if(path===''){
                    throw Error("path missing")
                }

                var dirs = []              // dir stack

                if(path.startsWith('/'))   // is abs path ?
                    dirs = path.split("/")
                else 
                    dirs = currentDir.split("/").concat(path.split("/"))

                var res = [];
                for (const dir of dirs) {
                    if (dir == "..") res.pop();
                    else if (dir == "." || dir == "") continue;
                    else res.push(dir);
                }
                // prolly a bad idea but ill only check for validity after the final abs path is setup.
                var solved_path = '/' + res.join('/');
                const mainpath =this.rootDir+solved_path 
                if(fs.existsSync(mainpath))
                {
                    return {solved_path , mainpath}
                }
                else 
                    throw new Error(solved_path+" doesnt exist")
            }
    }

    // TODO: DO NOT RELEASE dev functions
    setCurrentDir(abs_path: string) {
        this.currentDir = abs_path;
    }
}
export { Terminal };
