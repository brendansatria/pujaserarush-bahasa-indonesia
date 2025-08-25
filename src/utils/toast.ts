import { toast } from "sonner";

// Success: green card with white text
// Using accent color for green
export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
      borderColor: "hsl(var(--accent))",
    },
  });
};

// Error/Failure: red card with white text
// Using destructive color for red
export const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
      borderColor: "hsl(var(--destructive))",
    },
  });
};

// Missed Opportunity: yellow card with black text
// Using primary color for yellow/orange
export const showWarning = (message: string) => {
  toast.warning(message, {
    style: {
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      borderColor: "hsl(var(--primary))",
    },
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};