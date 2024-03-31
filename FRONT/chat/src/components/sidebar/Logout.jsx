import LogoutIcon from "./LogoutIcon";

const Logout = () => {
  return (
    <div className="mt-auto flex w-full px-2">
      <div>
        <button className="flex w-full transition-colors duration-300 ease-in-out hover:text-black">
          <LogoutIcon></LogoutIcon>
        </button>
      </div>
    </div>
  );
};

export default Logout;
