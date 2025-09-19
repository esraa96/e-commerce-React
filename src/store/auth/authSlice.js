import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, thunkAPI) => {
    try {
      const users = getStoredUsers();
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        return thunkAPI.rejectWithValue("User already exists with this email");
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password
      };
      
      users.push(newUser);
      saveUsers(users);
      
      return { email: newUser.email, name: newUser.name, id: newUser.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const users = getStoredUsers();
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      
      if (user) {
        return { email: user.email, name: user.name, id: user.id };
      } else {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Check if user is logged in from localStorage
const getInitialAuthState = () => {
  const savedUser = localStorage.getItem('currentUser');
  return {
    isAuthenticated: !!savedUser,
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null,
  };
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to sign up";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
