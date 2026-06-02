/**
 * __tests__/apiClient.test.js
 * Unit tests for API client functions
 */

import {
  fetchJSON,
  fetchKPISummary,
  fetchRevenueExpense,
  fetchTransactionsByCategory,
  fetchSalesTrend,
  fetchAlertsBySeverity,
  fetchFinancialOverview,
  fetchTopProducts,
  fetchHealthScores,
  fetchEmployeeStats,
} from "../apiClient.js";

// Mock fetch for testing
global.fetch = jest.fn();

describe("apiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("fetchJSON function", () => {
    it("should fetch and parse JSON successfully", async () => {
      const mockData = { success: true, value: 123 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchJSON("/api/test");

      expect(global.fetch).toHaveBeenCalledWith("/api/test");
      expect(result).toEqual(mockData);
    });

    it("should return null on fetch error", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await fetchJSON("/api/test");

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it("should return null on non-200 status", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await fetchJSON("/api/test");

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it("should return null on invalid JSON response", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      const result = await fetchJSON("/api/test");

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Specific API endpoint functions", () => {
    it("should call fetchJSON with correct endpoints", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await fetchKPISummary();
      expect(global.fetch).toHaveBeenCalledWith("/api/dashboard/summary");

      await fetchRevenueExpense();
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/dashboard/revenue-vs-expense",
      );

      await fetchTransactionsByCategory();
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/dashboard/transactions-by-category",
      );

      await fetchSalesTrend();
      expect(global.fetch).toHaveBeenCalledWith("/api/dashboard/sales-trend");

      await fetchAlertsBySeverity();
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/dashboard/alerts-by-severity",
      );

      await fetchFinancialOverview();
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/dashboard/financial-overview",
      );

      await fetchTopProducts();
      expect(global.fetch).toHaveBeenCalledWith("/api/dashboard/top-products");

      await fetchHealthScores();
      expect(global.fetch).toHaveBeenCalledWith("/api/dashboard/health-scores");

      await fetchEmployeeStats();
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/dashboard/employee-stats",
      );
    });

    it("should return null when endpoints fail", async () => {
      global.fetch.mockRejectedValue(new Error("Network error"));

      const results = await Promise.all([
        fetchKPISummary(),
        fetchRevenueExpense(),
        fetchTransactionsByCategory(),
        fetchSalesTrend(),
        fetchAlertsBySeverity(),
        fetchFinancialOverview(),
        fetchTopProducts(),
        fetchHealthScores(),
        fetchEmployeeStats(),
      ]);

      results.forEach((result) => {
        expect(result).toBeNull();
      });
    });
  });
});
