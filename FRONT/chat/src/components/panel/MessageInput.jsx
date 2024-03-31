const MessageInput = () => {
  return (
    <div className="max-x-auto justify-center w-full">
      <form className="flex flex-row items-center justify-between gap-2 px-4 my-3 w-full">
        <input disabled type="text" className="w-full bg-gray-200 rounded-md outline-none p-1 text-black focus:ring-2 focus:ring-rose-500" required placeholder="Send a message"></input>
        <button disabled className="bg-rose-500 rounded-md px-2 py-1 hover:bg-gray-200 hover:text-black transition-all duration-200">Send</button>
      </form>
    </div>
  );
};

export default MessageInput;
