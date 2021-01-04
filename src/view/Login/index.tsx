import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import style from "./index.module.scss";
import {
  loginAction,
  UserInfo,
  UserState,
  LoginBody,
} from "/@store/modules/user";
import { RootReducer } from "/@store/store";

const { Item } = Form;

const Login: FC = () => {
  const dispatch = useDispatch();

  const onFinish = (values: LoginBody) => {
    console.log("Received values of form: ", values);
    dispatch(loginAction(values));
  };

  return (
    <Row justify="center" align="middle">
      <Col className={style.formWrapper}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Item>
            <h2 className={style.formTitle}>登录</h2>
          </Item>
          <Item
            name="username"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="手机号"
            />
          </Item>
          <Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className={style.loginFormButton}
            >
              登录
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
