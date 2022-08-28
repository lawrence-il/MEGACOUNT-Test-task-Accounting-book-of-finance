import { FC, ReactNode } from "react";

export type ErrorBoundaryProps = {
    children: ReactNode 
}

export type Routes = {
    path: string
    Component: FC
}

export type ModalProps = {
    isModalVisible: boolean
    isAdd?: boolean
    setIsModalVisible(isModalVisible: boolean): void
    id: number
  }

export type RecordType = {
    id: number;
    name: string;
    value: number;
} 

export type TableWalletType<T> = {
    items: T[];
    titleColumnOne: string;
    titleColumnTwo: string;
    h2: string;
    url: string;
    id?: string
} 

export type LocationState = {
    id: string
}

export type User = {
    id: number
    role: string
    exp: number
    iat: number
}
