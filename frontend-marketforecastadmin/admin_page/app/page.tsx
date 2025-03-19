"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Constants for API and crop types
const API_BASE_URL = "http://127.0.0.1:8000/admin_dashboard";
const CROP_TYPES = [
  "Long Beans",
  "Bitter Gourd",
  "Snake Gourd",
  "Lady Finger Okra",
  "Brinjals",
  "Pineapple",
  "Papaya",
] as const;

const formatCropName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

interface PriceEntry {
  date: string;
  retail_price: number | null;
  predicted_price: number | null;
  ncpi_food: number | null;
  ncpi_non_food: number | null;
  ncpi_all_items: number | null;
}

const defaultEntry: PriceEntry = {
  date: new Date().toISOString().slice(0, 7),
  retail_price: 0,
  predicted_price: 0,
  ncpi_food: 0,
  ncpi_non_food: 0,
  ncpi_all_items: 0,
};

const generateDummyData = (): PriceEntry[] => {
  const months = 12;
  const currentDate = new Date();
  const data: PriceEntry[] = [];

  for (let i = 0; i < months; i++) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);

    data.push({
      date: date.toISOString().slice(0, 7),
      retail_price: 150 + Math.random() * 50,
      predicted_price: 160 + Math.random() * 40,
      ncpi_food: 80 + Math.random() * 20,
      ncpi_non_food: 70 + Math.random() * 15,
      ncpi_all_items: 75 + Math.random() * 25,
    });
  }

  return data.sort((a, b) => a.date.localeCompare(b.date));
};

interface ActionModalProps {
  entry: PriceEntry;
  onClose: () => void;
  onEdit: (entry: PriceEntry) => void;
  onDelete: (entry: PriceEntry) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  entry,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl w-64 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900">Entry Actions</h3>
          <p className="text-sm text-gray-500 mt-1">Date: {entry.date}</p>
        </div>

        {/* Action Buttons */}
        <div className="p-2">
          <button
            onClick={() => {
              onEdit(entry);
              onClose();
            }}
            className="w-full flex items-center px-4 py-3 text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Entry
          </button>
          <button
            onClick={() => {
              onDelete(entry);
              onClose();
            }}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50/80 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete Entry
          </button>
        </div>

        {/* Cancel Button */}
        <div className="px-4 py-3 border-t border-gray-200/50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100/80 text-gray-700 rounded-lg hover:bg-gray-200/80 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0.00";
  return value.toFixed(2);
};

const getInputValue = (value: number | null | undefined): string => {
  return value === null || value === undefined ? "" : value.toString();
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [cropType, setCropType] = useState<string>(CROP_TYPES[0]);
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirmEntry, setDeleteConfirmEntry] =
    useState<PriceEntry | null>(null);
  const [actionEntry, setActionEntry] = useState<PriceEntry | null>(null);
  const [editingEntry, setEditingEntry] = useState<PriceEntry | null>(null);
  const [isNewEntry, setIsNewEntry] = useState(false);

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchPrices = async () => {
    if (!cropType) return;

    setLoading(true);
    setError(null);
    const formattedCropName = formatCropName(cropType);
    const apiUrl = `${API_BASE_URL}/${encodeURIComponent(formattedCropName)}`;

    try {
      const response = await axios.get<{ prices: PriceEntry[] }>(apiUrl);
      setPrices(
        response.data.prices?.length > 0
          ? response.data.prices
          : generateDummyData()
      );
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching data"
      );
      setPrices(generateDummyData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchPrices();
    }
  }, [cropType, mounted]);

  // Only render content after component is mounted
  if (!mounted) {
    return null;
  }

  const handleCropClick = (crop: string) => {
    setCropType(crop);
    setIsMenuOpen(false);
    console.log("Selected crop:", crop);
  };

  const handleEditClick = (entry: PriceEntry) => {
    setEditingEntry({ ...entry });
    setIsNewEntry(false);
    setShowEditModal(true);
  };

  const handleAddNew = () => {
    setEditingEntry({ ...defaultEntry });
    setIsNewEntry(true);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!editingEntry) return;

    if (isNewEntry) {
      setPrices((prev) =>
        [...prev, editingEntry].sort((a, b) => a.date.localeCompare(b.date))
      );
    } else {
      setPrices((prev) =>
        prev.map((entry) =>
          entry.date === editingEntry.date ? editingEntry : entry
        )
      );
    }

    setShowEditModal(false);
    setEditingEntry(null);
  };

  const handleDeleteClick = (entry: PriceEntry) => {
    setDeleteConfirmEntry(entry);
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmEntry) return;

    setPrices((prev) =>
      prev.filter((entry) => entry.date !== deleteConfirmEntry.date)
    );
    setDeleteConfirmEntry(null);
  };

  const handleActionsClick = (entry: PriceEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setActionEntry(entry);
  };

  return (
    <>
      <div className="relative">
        {/* Hamburger Menu Button */}
        <button
          className="fixed top-4 left-4 z-50 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-current transform transition duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transform transition duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 mt-16 mb-10">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div>
            <ul className="list-none">
              {CROP_TYPES.map((crop) => (
                <li
                  key={crop}
                  className={`p-4 hover:bg-gray-800 cursor-pointer ${
                    cropType === crop ? "bg-gray-800" : ""
                  }`}
                  onClick={() => handleCropClick(crop)}
                >
                  {crop}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      <div className="flex flex-col p-6 ml-4">
        <div className="flex justify-between items-center mt-10 mb-6">
          <h1 className="text-2xl font-bold">{cropType} Dashboard</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add New Entry
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white max-w-screen-xl mx-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    NCPI Food
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    NCPI Non-Food
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    NCPI All Items
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Predicted
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prices.map((entry, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(entry.retail_price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(entry.ncpi_food)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(entry.ncpi_non_food)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(entry.ncpi_all_items)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(entry.predicted_price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={(e) => handleActionsClick(entry, e)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Modal */}
        {actionEntry && (
          <ActionModal
            entry={actionEntry}
            onClose={() => setActionEntry(null)}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Edit/Add Modal */}
        {showEditModal && editingEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isNewEntry ? "Add New Entry" : "Edit Entry"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="month"
                    value={editingEntry.date}
                    onChange={(e) =>
                      setEditingEntry({ ...editingEntry, date: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Retail Price
                  </label>
                  <input
                    type="number"
                    value={getInputValue(editingEntry.retail_price)}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        retail_price:
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NCPI Food
                  </label>
                  <input
                    type="number"
                    value={getInputValue(editingEntry.ncpi_food)}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        ncpi_food:
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NCPI Non-Food
                  </label>
                  <input
                    type="number"
                    value={getInputValue(editingEntry.ncpi_non_food)}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        ncpi_non_food:
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NCPI All Items
                  </label>
                  <input
                    type="number"
                    value={getInputValue(editingEntry.ncpi_all_items)}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        ncpi_all_items:
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Predicted Price
                  </label>
                  <input
                    type="number"
                    value={getInputValue(editingEntry.predicted_price)}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Predicted price cannot be modified
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white hover:bg-indigo-700"
                >
                  {isNewEntry ? "Add" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the entry for{" "}
                {deleteConfirmEntry.date}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirmEntry(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
