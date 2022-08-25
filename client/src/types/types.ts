import { FC, ReactNode } from "react";

export interface ErrorBoundaryProps {
    children: ReactNode 
}

export type Routes = {
    path: string
    Component: FC
}

