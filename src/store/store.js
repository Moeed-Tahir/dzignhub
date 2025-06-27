import { create } from 'zustand'

export const useUserStore = create((set) => ({
  IsLogin: false,
  Email: "",
  UserId: "",
  GenerateImages: [],
  GenerateVideo: "",
  Avatar: "",
  Name: "",
  SetName: (newState) => set({ Name:newState}),
  SetAvatar: (newState) => set({ Avatar:newState}),
  SetGenerateVideo: (newState) => set({ GenerateVideo:newState}),
  SetGenerateImages: (newState) => set({ GenerateImages:newState}),
  SetUserId: (newState) => set({ UserId:newState}),
  SetIsLogin: (newState) => set({ IsLogin:newState}),
  SetEmail: (newState) => set({ Email:newState}),
}))