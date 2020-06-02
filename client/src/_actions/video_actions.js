import axios from "axios";
import { TEST_VIDEO, UPLOAD_VIDEO, ADD_KEYWORD_VIDEO } from "./types";
import { VIDEO_SERVER } from "../components/Config.js";

export function test() {
  const request = axios
    .get(`${VIDEO_SERVER}/test`)
    .then((response) => response.data);

  return {
    type: TEST_VIDEO,
    payload: request,
  };
}

export function uploadVideo(dataToSubmit) {
  const request = axios
    .post(`${VIDEO_SERVER}/upload`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: UPLOAD_VIDEO,
    payload: request,
  };
}

export function addSearchKeyword(keyword) {
  return {
    type: ADD_KEYWORD_VIDEO,
    payload: keyword,
  };
}
