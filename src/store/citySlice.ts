import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  City,
  fetchCities,
  createCity,
  updateCity,
  deleteCity,
} from "@/api/city";
import toast from "react-hot-toast";

// Tipe state
interface CityState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};

// --- Thunk Actions ---

export const fetchCitiesThunk = createAsyncThunk(
  "cities/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCities();
      return response;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error fetching cities";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const createCityThunk = createAsyncThunk(
  "cities/create",
  async (cityData: Omit<City, "id">, { rejectWithValue }) => {
    try {
      const newCity = await createCity(cityData);
      toast.success("City created successfully");
      return newCity;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error creating city";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateCityThunk = createAsyncThunk(
  "cities/update",
  async (
    { id, data }: { id: number; data: Partial<Omit<City, "id">> },
    { rejectWithValue }
  ) => {
    try {
      const updatedCity = await updateCity(id, data);
      toast.success("City updated successfully");
      return updatedCity;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error updating city";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteCityThunk = createAsyncThunk(
  "cities/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCity(id);
      toast.success("City deleted successfully");
      return id;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error deleting city";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// --- Slice ---
const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCitiesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCitiesThunk.fulfilled,
        (state, action: PayloadAction<City[]>) => {
          state.loading = false;
          state.cities = action.payload;
        }
      )
      .addCase(fetchCitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(
        createCityThunk.fulfilled,
        (state, action: PayloadAction<City>) => {
          state.cities.push(action.payload);
        }
      )

      // Update
      .addCase(
        updateCityThunk.fulfilled,
        (state, action: PayloadAction<City>) => {
          const index = state.cities.findIndex(
            (city) => city.id === action.payload.id
          );
          if (index !== -1) {
            state.cities[index] = action.payload;
          }
        }
      )

      // Delete
      .addCase(
        deleteCityThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.cities = state.cities.filter(
            (city) => city.id !== action.payload
          );
        }
      );
  },
});

export default citySlice.reducer;
