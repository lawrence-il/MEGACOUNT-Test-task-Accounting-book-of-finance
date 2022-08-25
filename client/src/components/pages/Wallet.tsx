import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'

function Wallet(): ReactElement {
  return (
    <div>Wallet</div>
  )
}

export default observer(Wallet)