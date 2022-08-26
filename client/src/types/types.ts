import { FC, ReactNode } from "react";

export type ErrorBoundaryProps = {
    children: ReactNode 
}

export type Routes = {
    path: string
    Component: FC
}


// export type Wallet = {
//     key: number;
//     nameWallet: string;
//     currentBalance: number;
// }

export type ModalProps = {
    isModalVisible: boolean
    isAdd?: boolean
    setIsModalVisible(isModalVisible: boolean): void
  }

export type RecordType = {
    key: number;
    name: string;
    value: number;
} 