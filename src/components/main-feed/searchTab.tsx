export const SearchBarTab = () => {
  return (
    <div
      className={`flex w-96 custom-transition-width-left delay-700 rounded-tr-3xl rounded-br-3xl flex-col justify-start items-start h-screen transition-width  ease-in-out duration-300 border-black-500 border-r`}
    >
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full items-center pt-32">
          <input
            style={{
              fontFamily: "Verdana",
              fontSize: "20px",
              color: "white",
            }}
            className="h-8 w-3/4 rounded-md bg-zinc-400"
          ></input>
        </div>
      </div>
    </div>
  );
};
