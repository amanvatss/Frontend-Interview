// src/App.tsx

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { Home } from "@/pages/Home";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;