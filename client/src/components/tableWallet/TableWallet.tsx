import { Button, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecordType, TableWalletType } from '../../types/types';

const TableWallet = observer(function (props: TableWalletType<RecordType>): ReactElement {


    const navigate = useNavigate();
    const {items, titleColumnOne, titleColumnTwo, h2, url} = props;

    return (
        <div>
            <h2 className="wallet__title">{h2}</h2>
			<Table dataSource={items} pagination={false} scroll={{ x: 320 }}>
                <Column
					width={300}
                    title={titleColumnOne}
                    dataIndex="name"
                    key="name"
                />
                <Column width={300} title={titleColumnTwo} dataIndex="value" key="value" />
			</Table>
            <Button
                type="primary"
                style={{ margin: '20px' }}
                onClick={() => navigate(url)}
                >
                Показать все
            </Button>
        </div>
    );
});

export default TableWallet;
