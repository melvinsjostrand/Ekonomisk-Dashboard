import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "",
});

export { CanceledError };
