import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../..';

function ExpensesAll() {

  const {user} = useContext(Context);
  

  return (
    <div>ExpensesAll</div>
  )
}

export default observer(ExpensesAll)