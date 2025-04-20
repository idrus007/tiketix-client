import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

export interface City {
  id: number;
  name: string;
}

// GET /cities
export const fetchCities = async (): Promise<City[]> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: City[];
    }>("/cities");

    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error fetching cities:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// POST /cities
export const createCity = async (cityData: Omit<City, "id">): Promise<City> => {
  try {
    const response = await axiosInstance.post<{
      success: boolean;
      message: string;
      data: City;
    }>("/cities", cityData);

    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error creating city:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// PUT /cities/:id
export const updateCity = async (
  id: number,
  cityData: Partial<Omit<City, "id">>
): Promise<City> => {
  try {
    const response = await axiosInstance.put<{
      success: boolean;
      message: string;
      data: City;
    }>(`/cities/${id}`, cityData);

    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error updating city:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// DELETE /cities/:id
export const deleteCity = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
      data: null;
    }>(`/cities/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete city");
    }
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error deleting city:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
