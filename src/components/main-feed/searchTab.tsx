


  // Function to handle clicks on the transparent div
  export const SearchBarTab = () => {
  return (
    <>
      <div
        className={`hidden md:flex min-w-[320px] custom-transition-width-left delay-700 rounded-tr-3xl rounded-br-3xl flex-col justify-start items-start h-screen transition-width ease-in-out duration-300 border-black-500 border-r`}

      >
        <div className="flex flex-col w-full items-center pt-32">
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            style={{
              fontFamily: "Verdana",
              fontSize: "16px",
              color: "white",
            }}
            className="pl-3 h-8 w-3/4 rounded-md bg-gray-700"
            maxLength={25}
          ></input>
          <ul className="w-3/4 bg-white" id="search-results"></ul>
        </div>
      </div>

    </>
  );
};
