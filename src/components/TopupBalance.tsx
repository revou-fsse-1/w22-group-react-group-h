import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

type TopupBalanceProps = {
  userId: string;
};

export function TopupBalance(props: TopupBalanceProps) {
  const [balance, setBalance] = useLocalStorageNew(
    `${props.userId}|ballance`,
    0,
  );
  return (
    <>
      <h1>{props.userId}</h1>
      <h1> Your Balance: ${balance}</h1>
      <div>
        <h1>Top Up!</h1>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 15);
          }}
        >
          $15
        </button>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 50);
          }}
        >
          $50
        </button>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 100);
          }}
        >
          $100
        </button>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 200);
          }}
        >
          $200
        </button>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 500);
          }}
        >
          $500
        </button>
        <button
          className="border-2"
          onClick={() => {
            setBalance(parseInt(balance) + 1000);
          }}
        >
          $1000
        </button>
      </div>
    </>
  );
}
