import { observer } from 'mobx-react-lite';
import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../..';
import { fetchWallet } from '../../../http/walletApi';
import TableWallet from '../../tableWallet/TableWallet';
import './wallet.sass';

const Wallet = observer(function (): ReactElement {

    const {id} = useParams();

    const {
        listWallets: {setWalletId},
        revenues: { revenues, setRevenues},
        expenses: { expenses, setExpenses},
    } = useContext(Context);

    useEffect(() => {
        if(id) {
            setWalletId(+id);
            fetchWallet(+id)
                .then(wallet => {
                    setRevenues(wallet.revenue);
                    return wallet;
                })
                .then(wallet => setExpenses(wallet.expense));
        }
   
    }, []);

    return (
        <>
			<h1 className="wallet__title">Cтраница кошелька</h1>
            <TableWallet
                items={expenses.slice(0,5)}
                titleColumnOne='Название расхода'
                titleColumnTwo='Расход'
                h2='Таблица расходов'
				url='/expenses'
                id = {id}
            />
            <TableWallet 
				items={revenues.slice(0,5)}
                titleColumnOne='Название дохода'
                titleColumnTwo='Доход'
                h2='Таблица доходов'
				url='/revenues'
                id = {id}
			/>
        </>
    );
});

export default Wallet;
