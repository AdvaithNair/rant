import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1-rant-dd853.cloudfunctions.net/api",
  headers: {
    default: {
      Authorization: ""
    }
  }
});
