import { nextCokeClient } from "next-coke-api";
import { AppRoutes } from "./pages/api/[...route]";

export const { coke } = nextCokeClient<AppRoutes>()
