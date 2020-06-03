import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../../../_actions/video_actions";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, List } from "antd";

function VideoDetailPage(props) {
  const Video = useSelector((state) => state.video);
  const videoId = props.match.params.id;
  const dispatch = useDispatch();

  console.log(Video);

  useEffect(() => {
    dispatch(getVideo(videoId));
  }, [dispatch, videoId]);

  if (Video.singleVideo) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4em" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.singleVideo.filePath}`}
              controls
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          {/* <SideVideo /> */}
        </Col>
      </Row>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
        LOADING
      </div>
    );
  }
}

export default VideoDetailPage;
