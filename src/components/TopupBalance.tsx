import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

type TopupBalanceProps = {
  userId: string;
  username: string;
};

export function TopupBalance(props: TopupBalanceProps) {
  const [balance, setBalance] = useLocalStorageNew(
    `${props.userId}|balance`,
    0,
  );
  return (
    <div className="hero backdrop-blur-md backdrop-brightness-90 divide-y px-3 py-3">
      <h1 className="text-xl font-bold text-white pb-2">
        Hello, {props.username} !
      </h1>
      <h1 className="text-mds font-medium text-white py-2">
        {' '}
        Your Balance: ${balance}
      </h1>
      <div>
        <h1 className="pt-2 pb-3 text-white">Top Up Here!</h1>
        <div className="flex flex-row gap-5">
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 15);
            }}
          >
            $15
          </button>
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 50);
            }}
          >
            $50
          </button>
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 100);
            }}
          >
            $100
          </button>
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 200);
            }}
          >
            $200
          </button>
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 500);
            }}
          >
            $500
          </button>
          <button
            className="border border-white py-3 px-5 text-white bg-gradient-to-r from-stone-500 to-stone-800"
            onClick={() => {
              setBalance(parseInt(balance) + 1000);
            }}
          >
            $1000
          </button>
        </div>
      </div>
    </div>
  );
}
