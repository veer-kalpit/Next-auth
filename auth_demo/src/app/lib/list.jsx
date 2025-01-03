import axios from "axios";

const API_URL = "http://localhost:1337/api/lists";
const apiKey =
  "6787e92532f788ce2043452918e15cd1ca223b49db19aed35c97064985350531a830157ffc1b0ccc03bdf9e804f6e304ff36905c5075cd560eb31ae3122578f1530086fe5135d0663660f2941de29a9571197be56e409107e8e4f76219c9814931f32e0cf805f872182a668f49771c794451eb4b60f166722e56b786be042d52";
export async function createUser(data) {
  try {
    const response = await axios.post(
      API_URL,
      { data },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    window.location.reload();
    return response.data;
  } catch (error) {
    console.log("Error creating List", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error fetching list:", error);
    throw error;
  }
}
export async function fetchUserById() {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error fetching list:", error);
    throw error;
  }
}

export async function updateUser(id, updatedData) {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { data: updatedData },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating list:", error);
    throw error;
  }
}
export async function getUserDetails(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error getting list details:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.log("Error deleting list:", error);
    throw error;
  }
}
