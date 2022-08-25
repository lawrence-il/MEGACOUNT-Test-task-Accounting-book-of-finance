import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'


function Expense(): ReactElement {
  
  return (
    <div>Expense</div>
  )
}

export default observer(Expense)