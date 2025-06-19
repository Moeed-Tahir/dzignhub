import { create } from 'zustand'

export const useUserStore = create((set) => ({
  IsLogin: false,
  Email: "",
  UserId: "",
  SetUserId: (newState) => set({ UserId:newState}),
  SetIsLogin: (newState) => set({ IsLogin:newState}),
  SetEmail: (newState) => set({ Email:newState}),
}))