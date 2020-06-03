import axios from "axios";
import { TEST_VIDEO, UPLOAD_VIDEO, LIST_VIDEO, SINGLE_VIDEO } from "./types";
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

export function listVideo(variables) {
  const request = axios
    .post(`${VIDEO_SERVER}/list`, variables)
    .then((response) => response.data);

  return {
    type: LIST_VIDEO,
    payload: request,
  };
}

export function getVideo(videoId) {
  const variable = { id: videoId };
  const request = axios
    .post(`${VIDEO_SERVER}/single-video`, variable)
    .then((response) => response.data);

  return {
    type: SINGLE_VIDEO,
    payload: request,
  };
}
