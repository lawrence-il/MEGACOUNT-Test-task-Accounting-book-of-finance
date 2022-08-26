import { Routes } from "./types/types";
import Auth from "./components/pages/auth/Auth"; 
import Lists from "./components/pages/Lists";
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
       path:'/wallets',
       Component: Lists
    },
    {
        path:'/wallets/:id',
        Component: Wallet
    },
    {
        path:'/revenues',
        Component: Lists
    },
    {
        path:'/revenues/:id',
        Component: Revenue
    },
    {
        path:'/expenses',
        Component: Lists
    },
    {
        path:'/expenses/:id',
        Component: Expense
    }
]

export {publicRoutes, userRoutes}