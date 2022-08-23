import { Optional } from "sequelize";

export type UserAttr  = {
    id: number
    login: string
    password: string
    role: string
}

export type UserCreationAttr= Optional<UserAttr, 'id' | "role">;

export type WalletAttr  = {
    id: number
    name: string
    currentBalance: number
}

export type WalletCreationAttr = Optional<WalletAttr, 'id'>;

export type RevenueAndExpenseAttr  = {
    id: number
    name: string
    value: number
    WalletId: number
}

export type RevenueAndExpenseCreationAttr = Optional<RevenueAndExpenseAttr, 'id'>;

export type ListWalletsAttr = {
    id: number
    UserId: number
}

export type ListWalletsCreationAttr = Optional<ListWalletsAttr, 'id'>;

export interface RequestUser {
    user: string
}