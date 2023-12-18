import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getIcon = createAsyncThunk("/post/getdata", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/scrape`);

    return response.data;
  } catch (e) {
    console.log(e);
  }
});
