import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listVideo } from "../../../_actions/video_actions";
import { LoadingOutlined } from "@ant-design/icons";
import ListVideoPage from "./ListVideoPage";

function LandingPage() {
  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);
  const searchKeyword = videoState.searchKeyword;
  const keyword = { title: searchKeyword };

  useEffect(() => {
    dispatch(listVideo(keyword));
  }, [dispatch, searchKeyword]);

  return (
    <div>
      {videoState.isLoading ? (
        <div style={{ textAlign: "center" }}>
          <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
          LOADING
        </div>
      ) : (
        <ListVideoPage />
      )}
    </div>
  );
}

export default LandingPage;
