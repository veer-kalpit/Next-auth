import axios from "axios";
export const API = axios.create({ baseURL: "http://localhost:1337" });
const API_TOKEN =
  "4dc25488686549880d90be3a6d86c4aba3fc743cb2176eb9ae8498437725a992e5f09022b608cedd0c0bd0845007313b3f68192700e045ee551c7733387d8db2ffe37e9d78f0a7988faa637e2bac355fb22b75ce71e46433d470ee3034bfda6606cfc478ecdfa9743545c2b1c40ec66e03fcbe95f34fdd58ce623a07723aa450";
API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${API_TOKEN}`;
  return req;
});
