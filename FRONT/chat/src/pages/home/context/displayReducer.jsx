export const displayReducer = (state, action) => {
  switch (action.type) {
    case "CONTACT":
      return "CONTACT";
    case "CHAT":
      return "CHAT";
    case "BOTH":
      return "BOTH";
    default:
      return state;
  }
};
