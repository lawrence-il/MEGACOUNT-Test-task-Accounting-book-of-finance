import { observer } from 'mobx-react-lite';
import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../..';
import { fetchWallet } from '../../../http/walletApi';
import { EXPENSES_ROUTE, REVENUES_ROUTE } from '../../../utils/consts';
import TableWallet from '../../tableWallet/TableWallet';
import './wallet.sass';

const Wallet = observer(function (): ReactElement {

    const {id} = useParams();

    const {
        revenues: { revenues, setRevenues},
        expenses: { expenses, setExpenses},
    } = useContext(Context);

    useEffect(() => {
        if(id) {
            localStorage.setItem('WalletId', id);
            fetchWallet(+id)
                .then(wallet => {
                    setRevenues(wallet.revenue);
                    return wallet;
                })
                .then(wallet => setExpenses(wallet.expense));
        }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
			<h1 className="wallet__title">Cтраница кошелька</h1>
            <TableWallet
                items={expenses.slice(0,5)}
                titleColumnOne='Название расхода'
                titleColumnTwo='Расход'
                h2='Таблица расходов'
				url= {EXPENSES_ROUTE}
                id = {id}
            />
            <TableWallet 
				items={revenues.slice(0,5)}
                titleColumnOne='Название дохода'
                titleColumnTwo='Доход'
                h2='Таблица доходов'
				url= {REVENUES_ROUTE}
                id = {id}
			/>
        </>
    );
});

export default Wallet;
