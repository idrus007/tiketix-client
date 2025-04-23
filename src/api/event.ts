import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

interface EventFormData {
  name: string;
  image: File | null;
  description: string;
  date: Date;
  location: string;
}

// GET /events
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: Event[];
    }>("/events");

    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error(
      "Error fetching events:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

export const createEvent = async (
  formData: FormData
): Promise<{ data: EventFormData; message: string }> => {
  try {
    const response = await axiosInstance.post<{
      success: boolean;
      message: string;
      data: EventFormData;
    }>("/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      data: response.data.data,
      message: response.data.message, // ambil message sukses
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const errorMessage = err.response?.data?.message || err.message;
    console.error("Error creating event:", errorMessage);
    throw new Error(errorMessage); // lempar error ke komponen
  }
};
