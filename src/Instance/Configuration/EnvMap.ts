/**
 * @internal
 * EnvMap exports a map of arguments passed to the application
 * @module EnvMap
 * @category Configuration
 */

/**
 * Class representing a map of environment variables
 */

export class EnvironmentVariablesMap {
  /**
   * Map of environment variable name and values
   */
  private environmentVariablesMap: Map<string, string>;

  /**
   * Creates an instance of EnvironmentVariablesMap.
   * @param {NodeJS.ProcessEnv} [environmentVariables=process.env] - Object containing environment variables
   */
  constructor(environmentVariables: NodeJS.ProcessEnv = process.env) {
    this.environmentVariablesMap = new Map<string, string>();
    for (const key in environmentVariables) {
      if (environmentVariables.hasOwnProperty(key)) {
        const value = environmentVariables[key];
        if (value !== undefined) {
          this.environmentVariablesMap.set(key, value);
        }
      }
    }
  }
  /**
   * Gets the value of the specified environment variable
   * @param {string} variable - environment variable name
   * @returns {(string | undefined)} - environment variable value or undefined
   */
  get(variable: string): string | undefined {
    return this.environmentVariablesMap.get(variable);
  }

  /**
   * Iterates over the environment variables and invokes the callback function for each environment variable
   * @param {(value: string, key: string) => void} callback - Callback function
   */
  public forEach(callback: (value: string, key: string) => void): void {
    this.environmentVariablesMap.forEach(callback);
  }
}
