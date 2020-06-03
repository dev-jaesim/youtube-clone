import {
  TEST_VIDEO,
  UPLOAD_VIDEO,
  ADD_KEYWORD_VIDEO,
  LIST_VIDEO,
} from "../_actions/types";

export default function (state = { isLoading: true }, action) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { ...state, upload: action.payload };
    case ADD_KEYWORD_VIDEO:
      return { ...state, searchKeyword: action.payload };
    case LIST_VIDEO:
      return {
        ...state,
        list: action.payload.videos,
        isLoading: false,
      };
    case TEST_VIDEO:
      return { test: action.payload };
    default:
      return state;
  }
}
