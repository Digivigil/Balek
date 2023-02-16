/**
 * ## DataStructures Utility
 * @exports
 *  - FixedSizeArray<T>
 *  - MapObject
 * @module DataStructures
 * @category Utility
 */

/**
 * Recursive function to map an object and its properties to a string key Map.
 *
 * @param objectToMap - Object to be mapped.
 * @param map - Map to store the object and its properties.
 * @param parentKey - Key of the parent object. Optional.
 */
export const MapObject = (
  objectToMap: Record<string, any>,
  map: Map<string, object | Array<any> | string | boolean>,
  parentKey?: string
) => {
  for (const key in objectToMap) {
    if (objectToMap.hasOwnProperty(key)) {
      const value = objectToMap[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "object" && !(value instanceof Array)) {
        MapObject(value, map, newKey);
      } else if (
        value instanceof Array ||
        typeof value === "string" ||
        typeof value === "boolean"
      ) {
        map.set(newKey, value);
      } else {
        console.error("MapObject Not expecting this value!", key, value);
      }
    }
  }
};

/**
 * A class that represents a fixed-size array that removes the oldest item
 * when a new item is added and the size exceeds the maximum.
 */
export class FixedSizeArray<T> {
  /**
   * The data stored in the array
   */
  private readonly data: T[];
  /**
   * The maximum size of the array
   */
  private readonly maxSize: number;

  /**
   * Creates a new instance of the FixedSizeArray
   *
   * @param maxSize The maximum size of the array
   */
  constructor(maxSize: number) {
    this.data = [];
    this.maxSize = maxSize;
  }

  /**
   * Adds a new item to the array
   *
   * @param item The item to be added
   */
  add(item: T) {
    if (this.data.length === this.maxSize) {
      this.data.shift();
    }
    this.data.push(item);
  }

  /**
   * Returns the data stored in the array
   *
   * @returns The data stored in the array
   */
  getData(): T[] {
    return this.data;
  }

  /**
   * Iterates over the items in the array and performs a callback function on each item
   *
   * @param callback A callback function to be performed on each item in the array
   */
  forEach(callback: (item: T, index: number, array: T[]) => void) {
    this.data.forEach(callback);
  }
}
