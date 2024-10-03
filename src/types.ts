interface Command{
    name: string;
    description: string;
    config:{}|undefined;
    execute(args: string[], getpath: CallableFunction): Promise<string>;    // function with 2 arguments, args and currentDir
    location: string;
}

export { Command };