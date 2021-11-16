export type ActionStatusType = {
  type: "pending" | "rejected" | "idel";
  error?: string;
  success?: string;
};

export const ActionStatus = {
  pending(): ActionStatusType {
    return {
      type: "pending",
    };
  },
  rejected(error: string): ActionStatusType {
    return {
      type: "rejected",
      error,
    };
  },

  idel(success?: string): ActionStatusType {
    return {
      type: "idel",
      success,
    };
  },
};
