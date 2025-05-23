"use client"

import { create } from 'zustand'

interface UploadResponse {
  message: string;
  image_id: string;
}

interface UploadState {
  isLoading: boolean;
  error: string | null;
  uploadResponse: UploadResponse | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setUploadResponse: (response: UploadResponse | null) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  isLoading: false,
  error: null,
  uploadResponse: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setUploadResponse: (response) => set({ uploadResponse: response }),
  reset: () => set({ isLoading: false, error: null, uploadResponse: null }),
}));
