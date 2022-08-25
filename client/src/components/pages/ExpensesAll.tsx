import { observer } from 'mobx-react-lite'
import { ReactElement, useContext } from 'react'
import { Context } from '../..';

function ExpensesAll(): ReactElement {

  const {user} = useContext(Context);
  

  return (
    <div>ExpensesAll</div>
  )
}

export default observer(ExpensesAll)