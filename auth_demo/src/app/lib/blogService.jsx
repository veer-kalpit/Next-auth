import axios from "axios";

const API_URL = "http://localhost:1337/api/lists";
const apiKey =
  "4dc25488686549880d90be3a6d86c4aba3fc743cb2176eb9ae8498437725a992e5f09022b608cedd0c0bd0845007313b3f68192700e045ee551c7733387d8db2ffe37e9d78f0a7988faa637e2bac355fb22b75ce71e46433d470ee3034bfda6606cfc478ecdfa9743545c2b1c40ec66e03fcbe95f34fdd58ce623a07723aa450";
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
    console.log("Error creating blog:", error);
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
    console.log("Error fetching blogs:", error);
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
    console.log("Error fetching blogs:", error);
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
    console.log("Error updating blog:", error);
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
    console.log("Error getting blog details:", error);
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
    console.log("Error deleting blog:", error);
    throw error;
  }
}
