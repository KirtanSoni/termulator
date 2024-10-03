function assert(fn: any, expected: any, index: number) {
  // no need of assert inference as this is my testing framework.
  try {
    const output = fn;
    if (output === expected) {
      console.log("Test Case : " + index + " Passed ");
      return;
    } else {
      throw new Error(
        " Expected : " + "'" + (expected?.toString() ?? expected) + "'" +
        " Actual : " + "'" + output + "'\n"
      );
    }
  } catch (e) {
    
    throw new Error("Test Case : " + index + " Failed ! \n" + e);
  }
}
export { assert };


import { test_cd } from "./test_terminal";
import { test_dirCrawler } from "./test_terminal";

 test_cd();
 test_dirCrawler();
