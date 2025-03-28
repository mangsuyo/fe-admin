import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Gender = "male" | "female" | "unknown" | null;

export type Role = "STUDENT" | "ADMIN";

export const removeNullValues = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeNullValues).filter((item) => item !== null);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = removeNullValues(value); // 재귀 호출
      if (cleanedValue !== null) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {} as Record<string, any>);
  }
  return obj;
};

export type UserState = {
  id: number;
  name: string;
  country: string;
  university: string;
  gender: string | null;
  profileImageUrl: string;
  phoneNumber?: string;
  majors: string[];
  languages: string[];
  interests: string[];
  status?: string;
  isCertificated: boolean;
  isStudentIdCardRequested: boolean;
  isDefaultProfileImage: boolean;
  isKorean: boolean;
  isAuthenticated: boolean;
  isBanned?: boolean;
  point: number;
  role: Role;
  accessToken?: string;
  refreshToken?: string;
};

type UserAction = {
  init: () => void;
  update: (user: Partial<UserState>) => void; // Partial로 특정 필드만 업데이트 가능
};

const INITIAL_STATE: UserState = {
  id: -1,
  name: "",
  university: "",
  country: "ko",
  gender: null,
  profileImageUrl: "",
  majors: [],
  languages: [],
  interests: [],
  isCertificated: false,
  isStudentIdCardRequested: false,
  isDefaultProfileImage: false,
  isKorean: false,
  point: 0,
  role: "STUDENT",
  isAuthenticated: false,
};

export const useUserStore = create(
  immer<UserState & UserAction>((set) => ({
    ...INITIAL_STATE,
    update: (user) =>
      set((state) => {
        Object.assign(state, user);
      }),
    init: () => {
      set((state) => {
        Object.assign(state, INITIAL_STATE);
      });
    },
  }))
);
