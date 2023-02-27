import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import authService from "./authService";

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//---admin functions--------//
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (userData, thunkAPI) => {
    try {
      return await authService.adminLogin(userData);
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "auth/adminLogout",
  async (_, thunkAPI) => {
    try {
      return await authService.adminLogout();
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminLoginStatus = createAsyncThunk(
  "auth/adminLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.adminLoginStatus();
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAdmin = createAsyncThunk(
  "auth/getAdmin",
  async (_, thunkAPI) => {
    try {
      return await authService.getAdmin();
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData);
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getUsers
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update admin
export const updateAdmin = createAsyncThunk(
  "auth/updateAdmin",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      //admin functions----------------------//
      //admin login*****
      .addCase(adminLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success("Login Successful");
        // console.log(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      //logout admin
      .addCase(adminLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        // console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // admin login status
      .addCase(adminLoginStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adminLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
      })
      .addCase(adminLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //get admin
      .addCase(getAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //register user
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.message = action.payload;
        toast.success("User Registration Successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //getUsers
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //update admin
      .addCase(updateAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User Updated!");
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
