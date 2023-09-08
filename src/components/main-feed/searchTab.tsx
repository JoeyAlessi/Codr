
type searchBarProps = {
  handleSearchProp: React.Dispatch<React.SetStateAction<boolean>>;
}


export const SearchBarTab = ({handleSearchProp}: searchBarProps) => {
  return (
    <>
    <div
      className={`hidden md:flex min-w-[320px] custom-transition-width-left delay-700 rounded-tr-3xl rounded-br-3xl flex-col justify-start items-start h-screen transition-width  ease-in-out duration-300 border-black-500 border-r`}
    >
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full items-center pt-32">
          <input
            style={{
              fontFamily: "Verdana",
              fontSize: "20px",
              color: "white",
            }}
            className="h-8 w-3/4 rounded-md bg-gray-700"
          ></input> 
        </div>
      </div>
    </div>

    {/* transparent div to change state fluidly */}
    <div className="bg-transparent flex flex-col w-full" onClick={() => handleSearchProp(false)}>

    </div>
    </>
  );
};
