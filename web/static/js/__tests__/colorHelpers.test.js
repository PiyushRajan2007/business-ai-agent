/**
 * __tests__/colorHelpers.test.js
 * Unit tests for color utilities
 */

import {
  COLORS,
  PALETTE,
  rgba,
  SEVERITY_COLORS,
  STATUS_COLORS,
  getSeverityColor,
  getStatusColor,
} from "../colorHelpers.js";

describe("colorHelpers", () => {
  describe("COLORS constant", () => {
    it("should contain all color definitions", () => {
      expect(COLORS).toBeDefined();
      expect(COLORS.blue).toBe("#5b8af5");
      expect(COLORS.green).toBe("#4ecb71");
      expect(COLORS.red).toBe("#f55b6a");
      expect(COLORS.orange).toBe("#f5a623");
      expect(COLORS.purple).toBe("#a855f7");
      expect(COLORS.cyan).toBe("#22d3ee");
      expect(COLORS.pink).toBe("#ec4899");
      expect(COLORS.lime).toBe("#84cc16");
    });
  });

  describe("PALETTE constant", () => {
    it("should contain all colors in order", () => {
      expect(PALETTE.length).toBe(8);
      expect(PALETTE[0]).toBe("#5b8af5");
      expect(PALETTE[1]).toBe("#4ecb71");
    });
  });

  describe("rgba function", () => {
    it("should convert hex to RGBA format correctly", () => {
      const result = rgba("#5b8af5", 0.7);
      expect(result).toBe("rgba(91,138,245,0.7)");
    });

    it("should handle different alpha values", () => {
      const result1 = rgba("#4ecb71", 0.5);
      expect(result1).toBe("rgba(78,203,113,0.5)");

      const result2 = rgba("#f55b6a", 0.1);
      expect(result2).toBe("rgba(245,91,106,0.1)");
    });

    it("should handle alpha value of 0 and 1", () => {
      expect(rgba("#5b8af5", 0)).toBe("rgba(91,138,245,0)");
      expect(rgba("#5b8af5", 1)).toBe("rgba(91,138,245,1)");
    });
  });

  describe("SEVERITY_COLORS mapping", () => {
    it("should map severity levels to colors", () => {
      expect(SEVERITY_COLORS.Low).toBe(COLORS.green);
      expect(SEVERITY_COLORS.Medium).toBe(COLORS.orange);
      expect(SEVERITY_COLORS.High).toBe(COLORS.red);
    });
  });

  describe("STATUS_COLORS mapping", () => {
    it("should map status to colors", () => {
      expect(STATUS_COLORS.Active).toBe(COLORS.green);
      expect(STATUS_COLORS.Left).toBe(COLORS.red);
    });
  });

  describe("getSeverityColor function", () => {
    it("should return correct color for known severity levels", () => {
      expect(getSeverityColor("Low")).toBe(COLORS.green);
      expect(getSeverityColor("Medium")).toBe(COLORS.orange);
      expect(getSeverityColor("High")).toBe(COLORS.red);
    });

    it("should return purple for unknown severity levels", () => {
      expect(getSeverityColor("Unknown")).toBe(COLORS.purple);
      expect(getSeverityColor("Critical")).toBe(COLORS.purple);
    });
  });

  describe("getStatusColor function", () => {
    it("should return correct color for known statuses", () => {
      expect(getStatusColor("Active")).toBe(COLORS.green);
      expect(getStatusColor("Left")).toBe(COLORS.red);
    });

    it("should return purple for unknown statuses", () => {
      expect(getStatusColor("Unknown")).toBe(COLORS.purple);
      expect(getStatusColor("Pending")).toBe(COLORS.purple);
    });
  });
});
