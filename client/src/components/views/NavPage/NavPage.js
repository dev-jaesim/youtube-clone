import React, { useState } from "react";
import { Drawer, Button, Input } from "antd";
import { MenuOutlined, YoutubeFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import LoggedInMenu from "./Sections/LoggedInMenu";
import { useDispatch } from "react-redux";
import { ADD_KEYWORD_VIDEO, RESET_SKIP_VIDEO } from "../../../_actions/types";
import { Link } from "react-router-dom";

function NavPage() {
  const dispatch = useDispatch();
  const { Search } = Input;
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{
        position: "fixed",
        width: "100%",
        top: "0",
        padding: ".5rem",
        backgroundColor: "white",
        zIndex: "999999",
      }}
    >
      <Row type="flex" align="middle">
        <Col lg={2} xs={3}>
          <Button
            type="primary"
            onClick={showDrawer}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgba(0,0,0,0.9)",
              fontSize: "1.5rem",
            }}
          >
            <MenuOutlined />
          </Button>
        </Col>
        <Col lg={5} xs={0} onClick={() => dispatch({ type: RESET_SKIP_VIDEO })}>
          <Link to="/">
            <YoutubeFilled
              style={{
                color: "#f5222d",
                fontSize: "2rem",
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                verticalAlign: "middle",
                color: "rgba(0,0,0,0.9)",
              }}
            >
              &nbsp;YouTube
            </span>
          </Link>
        </Col>
        <Col lg={10}>
          <Search
            placeholder="input search text"
            onSearch={(value) =>
              dispatch({ type: ADD_KEYWORD_VIDEO, payload: value })
            }
            style={{ width: "100%" }}
          />
        </Col>

        <Col lg={7} xs={3}>
          <LoggedInMenu />
        </Col>

        <Drawer
          title="Basic Drawer"
          placement="left"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        ></Drawer>
      </Row>
    </nav>
  );
}

export default NavPage;
