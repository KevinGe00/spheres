import { useGlobalState } from './state';

export default function Menu() {
  const [currentAccount] = useGlobalState('currentAccount');

  return (
    <div>
     {currentAccount}
    </div>
  )
}
