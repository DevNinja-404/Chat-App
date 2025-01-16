import { createAuthSlice } from "@/slices/authSlice";
import { createChatSlice } from "@/slices/chatSlice";
import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export const useAuthStore = create(
//   persist(
//     (...a) => ({
//       ...createAuthSlice(...a),
//     }),
//     {
//       partialize: (state) => ({
//         isLoggedIn: state.isLoggedIn,
//         isProfileComplete: state.isProfileComplete,
//       }),
//       name: "auth-status",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
