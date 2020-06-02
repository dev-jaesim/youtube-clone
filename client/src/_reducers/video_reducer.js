import { TEST_VIDEO, UPLOAD_VIDEO, ADD_KEYWORD_VIDEO } from "../_actions/types";

export default function (state = { searchKeyword: "" }, action) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { ...state, upload: action.payload };
    case ADD_KEYWORD_VIDEO:
      return { ...state, searchKeyword: action.payload };
    case TEST_VIDEO:
      return { test: action.payload };
    default:
      return state;
  }
}
