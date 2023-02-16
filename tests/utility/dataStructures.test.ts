import { describe, expect, beforeEach, it } from "@jest/globals";
import { FixedSizeArray } from "../../src/Utility/DataStructures";

describe("FixedSizeArray", () => {
  let fixedSizeArray: FixedSizeArray<number>;

  beforeEach(() => {
    fixedSizeArray = new FixedSizeArray<number>(3);
  });

  it("should add items to the array", () => {
    fixedSizeArray.add(1);
    fixedSizeArray.add(2);
    fixedSizeArray.add(3);

    expect(fixedSizeArray.getData()).toEqual([1, 2, 3]);
  });

  it("should remove the oldest item when adding a new item and the size exceeds the maximum", () => {
    fixedSizeArray.add(1);
    fixedSizeArray.add(2);
    fixedSizeArray.add(3);
    fixedSizeArray.add(4);

    expect(fixedSizeArray.getData()).toEqual([2, 3, 4]);
  });

  it("should perform a callback function on each item in the array using forEach", () => {
    fixedSizeArray.add(1);
    fixedSizeArray.add(2);
    fixedSizeArray.add(3);

    const result: number[] = [];
    fixedSizeArray.forEach((item) => {
      result.push(item);
    });

    expect(result).toEqual([1, 2, 3]);
  });
});
