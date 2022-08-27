import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { Context } from '../../..';
import TableWallet from '../../tableWallet/TableWallet';
import './wallet.sass';

const Wallet = observer(function (): ReactElement {
    const {
        revenues: { revenues },
        expenses: { expenses },
    } = useContext(Context);

    return (
        <>
			<h1 className="wallet__title">Cтраница кошелька</h1>
            <TableWallet
                items={expenses}
                titleColumnOne='Название расхода'
                titleColumnTwo='Расход'
                h2='Таблица расходов'
				url='/expenses'
            />
            <TableWallet 
				items={revenues}
                titleColumnOne='Название дохода'
                titleColumnTwo='Доход'
                h2='Таблица расходов'
				url='/revenues'
			/>
        </>
    );
});

export default Wallet;
