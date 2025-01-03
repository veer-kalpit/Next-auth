"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  fetchUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserDetails,
} from "@/app/lib/list";

const TABLE_HEAD = ["Name", "Email", "Phone Number", "Date", "Edit", "Delete"];

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  console.log(user);
  const popoverRef = useRef(null);
  const initialState = { fname: "", email: "", number: "", date: "" };
  const [formData, setFormData] = useState(initialState);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (active && id) {
        await updateUser(id, formData);
      } else {
        await createUser(formData);
      }
      fetchUsers();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    setActive(true);
    setId(id);
    try {
      const userDetails = await getUserDetails(id);
      setFormData({
        fname: userDetails.fname || "",
        email: userDetails.email || "",
        number: userDetails.number || "",
        date: userDetails.date || "",
      });
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        setUser(data);
      } catch (error) {
        console.log("Error fetching users:", error);
        setUser([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedUsers = user?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const downloadSheet = () => {
    const headers = ["Name", "Email", "Phone Number", "Date"];
    const rows = sortedUsers.map((user) => [
      user.fname,
      user.email,
      user.number,
      user.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "UserData.csv";
    link.click();
  };

  return (
    <div className="m-3" ref={popoverRef}>
      <div className="h-full w-full border border-gray-200 rounded-lg ">
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xl font-semibold text-gray-800">
                Members list
              </h5>
              <p className="mt-1 text-sm text-gray-600">
                See information about all members
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add member
              </button>
              <button
                onClick={downloadSheet}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
        {/* Form Modal */}
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-96 bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <h6 className="text-lg font-medium text-gray-800 mb-4">
                {!active ? "Create User" : "Update User"}
              </h6>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Name
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Email
              </label>
              <div className="flex mb-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Number
              </label>
              <div className="flex mb-2">
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Date
              </label>
              <div className="flex mb-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                {!active
                  ? ` ${loading ? "Creating..." : "Create"}  `
                  : ` ${loading ? "Updating..." : "Update"}  `}
              </button>
            </form>
          </div>
        )}
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="px-4 py-2 border-b bg-gray-50 text-left text-sm font-medium text-gray-700"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedUsers?.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 border-b">
                    <span className="text-sm font-medium text-gray-800">
                      {item.fname}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span className="text-sm text-gray-600">{item.email}</span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span>{item.number}</span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span className="text-sm text-gray-600">{item.date}</span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <button onClick={() => handleUpdate(item.documentId)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ color: "red" }}
                      >
                        <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                        <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <button onClick={() => handleDelete(item.documentId)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ color: "gray" }}
                      >
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Main;
