import { nextCokeClient } from "next-coke-api";
import { AppRoutes } from "./pages/api/[...route]";

// here we export useCoke instead of coke, because it allows an authorization token to be used
export const { useCoke } = nextCokeClient<AppRoutes>()
