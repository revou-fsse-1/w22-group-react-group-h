type GameSearchProps = {
  setFilterValue: (value: string) => void;
};

export const GameSearchBar = (props: GameSearchProps) => {
  const { setFilterValue } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };
  return (
    <div className="items-center justify-center">
      <input
        className="w-[800px] px-4 py-2 mb-7 border-transparent rounded-xl text-black placeholder-slate-500 focus:outline-none shadow-2xl shadow-black"
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  );
};
