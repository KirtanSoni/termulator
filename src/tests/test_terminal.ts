import { Terminal } from "../terminal";
import { assert } from "./index";


async function test_cd(){
  console.log("running cd Tests \n");
  const test = ['cd .','cd ./kirtan' , 'cd ..', 'cd ..']
  const terminal = new Terminal('/')
  for (const t of test){
    await terminal.stdin(t).then(o=>{})
     
}

}



function test_dirCrawler() {
  console.log("running dirCrawler Tests \n");
  const tests = [{ input: ".", output: "/", currentDir: "/" },
  ];
  const terminal = new Terminal("/");
  tests.map((test, index) => {
    terminal.setCurrentDir(test.currentDir);
    assert(terminal.dirCrawler()(test.input).solved_path, test.output, index + 1);
  });

 
  try {                     // expected Errors
    terminal.setCurrentDir("/");
    terminal.dirCrawler()("");
  } catch (e) {
    if (e instanceof Error && e.message === "path missing") {
      console.log("Expected Error Test Case Passed ");
    } else {
      throw e;
    }
  }

  console.log("\nAll dirCrawler Tests Passed! \n");
}

export { test_dirCrawler,test_cd };
