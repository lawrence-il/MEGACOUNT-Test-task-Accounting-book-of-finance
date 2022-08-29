import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '..';
import { EXPENSES_ROUTE, REVENUES_ROUTE, WALLETS_ROUTE } from '../utils/consts';

export default function useConsts() {
    const { pathname } = useLocation();

    const {
        listWallets: { wallets },
        revenues: { revenues },
        expenses: { expenses },
    } = useContext(Context);

    const varConfirm =
        pathname === WALLETS_ROUTE
            ? 'кошелёк'
            : pathname === REVENUES_ROUTE
            ? 'доход'
            : EXPENSES_ROUTE
            ? 'расход'
            : 'расход';

    const varAdd =
        pathname === WALLETS_ROUTE
            ? 'кошелька'
            : pathname === REVENUES_ROUTE
            ? 'доходa'
            : EXPENSES_ROUTE
            ? 'расходa'
            : 'расходa';

    const varH1 =
        pathname === WALLETS_ROUTE
            ? 'кошельков'
            : pathname === REVENUES_ROUTE
            ? 'доходов'
            : EXPENSES_ROUTE
            ? 'расходов'
            : 'расходов';

    const varValue =
        pathname === WALLETS_ROUTE
            ? 'Текущий баланс'
            : pathname === REVENUES_ROUTE
            ? 'Доход'
            : EXPENSES_ROUTE
            ? 'Расход'
            : 'Расход';

    const varPage =
        pathname === WALLETS_ROUTE
            ? wallets
            : pathname === REVENUES_ROUTE
            ? revenues
            : pathname === EXPENSES_ROUTE
            ? expenses
            : expenses;

    const varLabel =
        pathname === WALLETS_ROUTE
            ? 'баланс'
            : pathname === REVENUES_ROUTE
            ? 'доход'
            : pathname === EXPENSES_ROUTE
            ? 'расход'
            : 'расход';

    return { varConfirm, varAdd, varH1, varValue, varPage, varLabel };
}
