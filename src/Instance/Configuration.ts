/**
 * Default Export is a singleton instance of Configuration class
 *
 * The Configuration class can be used to get settings as current values or as observables
 *
 * Settings can also be set though the Configuration class.
 *
 *
 *
 * @module Configuration
 * @category Configuration
 * @exports Configuration
 */

/**
 * The type definition for configuration settings.
 * Configuration settings can be a string, an object, or an array.
 * @typedef {string | Object | Array<any>} ConfigurationSetting
 */
import {
  defaultBalekConfiguration,
  BalekConfiguration,
} from "./Configuration/Defaults";
import { BehaviorSubject, Observable } from "rxjs";
import { MapObject } from "../Utility/DataStructures";

import { CommandLineArgumentsMap } from "./Configuration/ArgMap";
import { EnvironmentVariablesMap } from "./Configuration/EnvMap";
import * as fs from "node:fs";
import * as path from "path";
/**
 * The path to the package.json file
 */
const packageFilePath = "./package.json";
/**
 * The path to the balek.json Configuration file
 */
let balekFilePath = "./config/balek.json";
/**
 * Saves the Balek Configuration to the balek.json file
 *
 * @param configuration The Configuration to save
 */
const saveBalekConfiguration = (configuration: BalekConfiguration) => {
  const dirPath = path.parse(balekFilePath).dir
  //Check if the directory the config file is supposed to be in exists
  if(!fs.existsSync(dirPath)){
    //Create it and any parent directories
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(
    balekFilePath,
    JSON.stringify(configuration, null, 2),
    "utf-8"
  );
};

/**
 * Map to store the Configuration settings from the Balek Configuration file.
 */
const balekConfigurationMap = new Map<string, ConfigurationSetting>();

/**
 * Map to store the Configuration settings from the package.json file.
 */
const packageConfigurationMap = new Map<string, string | Object | Array<any>>();
const commandLineArguments = new CommandLineArgumentsMap();
const environmentArguments = new EnvironmentVariablesMap();

/**
 * The Configuration Class represents the main Configuration settings for the application.
 *
 * Loading settings from the environment, command line arguments, and Configuration files.
 *
 * This class offers both get and set methods to these settings.
 *
 * If a setting doesn't exist it will be created when set.
 *
 * It also provides a getObservable method for retrieving setting Observables that can be subscribed to.
 *
 *
 * @class Configuration
 *
 * @example
 * //import the Configuration class as Configuration
 * import Configuration from "../src/Instance/Configuration";
 * //get current value
 * const version = Configuration.get("version");
 * //get observable for setting
 * const portObservable = Configuration.getObservable("https.port");
 * //set the https port setting
 * Configuration.set("https.port", 443)
 *
 * @remarks
 * In the example, the Configuration class is imported as "Configuration". The current value of the version setting is retrieved using get().
 * An observable for the "https.port" setting is retrieved using getObservable().
 * The Configuration class is then used to set the "https.port" to 443.
 */

export class Configuration {
  /**
   * The singleton Configuration instance
   * @hidden
   */
  private static instance: Configuration;
  /**
   * Returns the singleton instance
   * @hidden
   */
  static getInstance() {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }
  /**
   * Private Map of setting observables.
   * @hidden
   */
  private balekConfigurationObservableMap = new Map<
    string,
    BehaviorSubject<ConfigurationSetting>
  >();
  /**
   * Private constructor to prevent direct instantiation of the `Configuration` class.
   * @hidden
   */
  private constructor() {
    try {
      let packageData = { version: undefined, balek: undefined };
      //create empty packageData
      if (fs.existsSync(packageFilePath)) {
        //if package file exists then load it into packageData as JSON
        packageData = JSON.parse(
          fs.readFileSync(packageFilePath, "utf-8").toString()
        );
      }
      MapObject(packageData, packageConfigurationMap);

      let balekConfiguration = defaultBalekConfiguration;
      //check if balek Configuration file has been specified
      let specifiedConfigPath = this.get("config") as string;
      if (specifiedConfigPath) {
        //if it has, update the default
        balekFilePath = specifiedConfigPath;
      }
      //check is the balek Configuration file exists
      if (fs.existsSync(balekFilePath)) {
        //read the file parsing the JSON into the default values
        balekConfiguration = {
          ...balekConfiguration,
          ...JSON.parse(fs.readFileSync(balekFilePath, "utf-8").toString()),
        };
      } else {
        //if the config file does not exist, create it with default values
        saveBalekConfiguration(balekConfiguration);
      }
      //Map the Configuration object into the Configuration map
      MapObject(balekConfiguration, balekConfigurationMap);
      //Create a Behaviour Subject for each mapped value
      balekConfigurationMap.forEach((setting, name) => {
        this.balekConfigurationObservableMap.set(
          name,
          new BehaviorSubject(setting)
        );
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * gets the rxjs Observable for the setting
   * @param {string} setting - name of setting for which the observable to retrieve
   * @returns {Observable<ConfigurationSetting>} - observable for the specified setting
   */
  getObservable(setting: string) {
    //get the observable for the setting
    let settingObservable = this.balekConfigurationObservableMap.get(setting);
    if (settingObservable === undefined) {
      //if the observable doesn't exist, create it
      settingObservable = new BehaviorSubject("" as ConfigurationSetting);
      //add it to tha map
      this.balekConfigurationObservableMap.set(setting, settingObservable);
    }
    return settingObservable.asObservable();
  }
  /**
   * Gets the value of the specified setting in order of the Balek Configuration Map,
   * Command Line Arguments Map, Package Configuration Map, or Environment Variables Map.
   * @param {string} setting - Setting name
   * @returns {(Object | string | Array<any> | undefined)} - Setting value or undefined
   */
  public get(setting: string): ConfigurationSetting | undefined {
    if (balekConfigurationMap.get(setting) !== undefined) {
      return balekConfigurationMap.get(setting);
    } else if (commandLineArguments.get(setting)) {
      return commandLineArguments.get(setting);
    } else if (packageConfigurationMap.get(`balek.${setting}`)) {
      return packageConfigurationMap.get(`balek.${setting}`);
    } else if (packageConfigurationMap.get(setting)) {
      return packageConfigurationMap.get(setting);
    } else if (environmentArguments.get(setting)) {
      return environmentArguments.get(setting);
    }
    return;
  }
  /**
   * set the value of the specified setting
   * @param {string} setting - setting for which the value is to be set
   * @param {ConfigurationSetting} value - value to be set for the specified setting
   */
  public set(setting: string, value: ConfigurationSetting) {
    //set the value in the Configuration Map
    balekConfigurationMap.set(setting, value);
    //get the setting BehaviorSubject
    let settingObservable = this.balekConfigurationObservableMap.get(setting);
    if (settingObservable) {
      settingObservable.next(value);
    } else {
      this.balekConfigurationObservableMap.set(
        setting,
        new BehaviorSubject(value)
      );
    }
  }
}

type ConfigurationSetting = string | Object | Array<any>;

const configuration = Configuration.getInstance();
export default configuration;
