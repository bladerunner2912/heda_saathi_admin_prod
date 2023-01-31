import chalk from "chalk";

export default class Logging {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) => {
    try {
      console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
    } catch (e) {
      console.log(e);
    }
  }
  public static warn = (args: any) => {
    try {
      console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
    } catch (e) {
      console.log(e);
    }
  }
  public static error = (args: any) =>
  {
    try {
      console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.redBright(args) : args
  );
  } catch (e) {
    console.log(e);
  }
  }
}
