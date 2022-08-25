import { Routes } from "./types/types";
import Auth from "./components/pages/Auth";
import ListWallets from "./components/pages/ListWallets";
import Wallet from "./components/pages/Wallet";
import Revenue from "./components/pages/Revenue";
import Expense from "./components/pages/ExpensesAll";

const publicRoutes: Routes[] = [
    {
       path:'/',
       Component: Auth
    },
    {
        path:'/registration',
        Component: Auth
    }
]

const userRoutes: Routes[] = [
    {
       path:'/list-wallets',
       Component: ListWallets
    },
    {
        path:'/wallet/:id',
        Component: Wallet
    },
    {
        path:'/revenue',
        Component: Revenue
    },
    {
        path:'/revenue/:id',
        Component: Revenue
    },
    {
        path:'/expense',
        Component: Expense
    },
    {
        path:'/expense/:id',
        Component: Expense
    }
]

export {publicRoutes, userRoutes}