/**
 * __tests__/formatters.test.js
 * Unit tests for data formatting utilities
 */

import { currency, formatNumber, formatPercent } from "../formatters.js";

describe("formatters", () => {
  describe("currency function", () => {
    it("should format numbers as USD currency", () => {
      expect(currency(1234567)).toBe("$1,234,567");
      expect(currency(0)).toBe("$0");
      expect(currency(99)).toBe("$99");
    });

    it("should handle negative numbers", () => {
      expect(currency(-1000)).toBe("$-1,000");
      expect(currency(-99999)).toBe("$-99,999");
    });

    it("should handle decimal numbers (truncate decimals)", () => {
      expect(currency(1234.56)).toBe("$1,235");
      expect(currency(999.99)).toBe("$1,000");
    });

    it("should handle string numbers", () => {
      expect(currency("5000")).toBe("$5,000");
      expect(currency("1000000")).toBe("$1,000,000");
    });

    it("should handle very large numbers", () => {
      expect(currency(1000000000)).toBe("$1,000,000,000");
    });
  });

  describe("formatNumber function", () => {
    it("should format numbers with comma separators", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(99)).toBe("99");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-1000)).toBe("-1,000");
      expect(formatNumber(-5000000)).toBe("-5,000,000");
    });

    it("should handle string numbers", () => {
      expect(formatNumber("2000")).toBe("2,000");
      expect(formatNumber("500000")).toBe("500,000");
    });

    it("should handle decimal numbers", () => {
      expect(formatNumber(1000.5)).toBe("1,000.5");
      expect(formatNumber(5000.99)).toBe("5,000.99");
    });
  });

  describe("formatPercent function", () => {
    it("should format numbers as percentages with default 2 decimals", () => {
      expect(formatPercent(50)).toBe("50.00%");
      expect(formatPercent(75.5)).toBe("75.50%");
      expect(formatPercent(0)).toBe("0.00%");
    });

    it("should respect custom decimal places", () => {
      expect(formatPercent(33.333, 0)).toBe("33%");
      expect(formatPercent(33.333, 1)).toBe("33.3%");
      expect(formatPercent(33.333, 3)).toBe("33.333%");
    });

    it("should handle large percentages", () => {
      expect(formatPercent(100)).toBe("100.00%");
      expect(formatPercent(999.99)).toBe("999.99%");
    });

    it("should handle negative percentages", () => {
      expect(formatPercent(-50)).toBe("-50.00%");
      expect(formatPercent(-25.5)).toBe("-25.50%");
    });

    it("should handle very small numbers", () => {
      expect(formatPercent(0.001)).toBe("0.00%");
      expect(formatPercent(0.1, 3)).toBe("0.100%");
    });
  });
});
