/**
 * @internal
 * ArgMap exports a map of arguments passed to the application
 * @module ArgMap
 * @category Configuration
 */

/**
 * Class representing a map of command line arguments
 */
export class CommandLineArgumentsMap {
  /**
   * Map of arguments name and values
   */
  private argumentsMap: Map<string, string>;

  /**
   * Creates an instance of CommandLineArgumentsMap.
   * @param {string[]} [commandLineArguments=process.argv] - Array of command line arguments
   */
  constructor(commandLineArguments: string[] = process.argv) {
    this.argumentsMap = new Map<string, string>();
    commandLineArguments.forEach((argument, index) => {
      if (argument.startsWith("--")) {
        let name: string;
        let value: string;
        argument = argument.slice(2);
        if (argument.includes("=")) {
          [name, value] = argument.split("=").slice(0, 2);
        } else {
          name = argument;
          value = commandLineArguments[index + 1] || "";
        }
        this.argumentsMap.set(name, value);
      }
    });
  }
  /**
   * Gets the value of the specified argument
   * @param {string} arg - argument name
   * @returns {(string | undefined)} - argument value or undefined
   */
  get(arg: string): string | undefined {
    return this.argumentsMap.get(arg);
  }

  public forEach(callback: (value: string, key: string) => void): void {
    this.argumentsMap.forEach(callback);
  }
}
