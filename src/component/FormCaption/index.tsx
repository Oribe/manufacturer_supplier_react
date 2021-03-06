/**
 * 表单头
 * 固定参数
 */

import { Button, Col, Row } from "antd";
import FormCol from "component/FormCol";
import ImageHint from "component/ImageHint";
import React, { FC, useCallback } from "react";
import {
  ComponentFunc,
  ComponentFuncConfig,
  FormItem as FormItemConfig,
  isComponentFuncConfig,
} from "store/modules/form";
import { reCreateFunc } from "utils/index";
import FormItem from "../FormItem";
import styles from "./index.module.scss";

const Caption: FC<Props> = (props) => {
  const { config, decodeHintImgUrl, onFormReset, ...funcProps } = props;

  /**
   * 绑定方法
   */
  const handleReCreateFunc = useCallback(
    (funcObj?: ComponentFuncConfig) => {
      if (funcObj) {
        return reCreateFunc(funcObj, funcProps, false);
      }
      return {};
    },
    [funcProps]
  );

  return (
    <>
      {config?.map((item) => {
        const {
          label,
          dataIndex,
          associatedDataIndex,
          hintImgUrl,
          formItemProps,
          component,
          formItemColProps,
          complexConfig,
        } = item;
        const { func } = component;
        let newFuncObj: ComponentFunc = {};
        if (isComponentFuncConfig(func)) {
          newFuncObj = handleReCreateFunc(func);
        }
        return (
          <FormCol key={item.label} {...formItemColProps}>
            <FormItem
              label={label}
              dataIndex={dataIndex}
              associatedDataIndex={associatedDataIndex}
              component={{ ...component, func: newFuncObj }}
              complexConfig={complexConfig}
              hintImgUrl={hintImgUrl}
              {...formItemProps}
            />
          </FormCol>
        );
      })}
      <Col span={24} className={styles.btnGroupWrapper}>
        <Row justify="center">
          <Col>
            <Button
              className={styles.formResetBtn}
              size="middle"
              onClick={onFormReset}
            >
              自动解码输入
            </Button>
            {decodeHintImgUrl ? (
              <ImageHint
                className={styles.hintImageClassName}
                url={decodeHintImgUrl}
              />
            ) : null}
          </Col>
          <Col offset={1}>
            <Button
              className={styles.formResetBtn}
              size="middle"
              onClick={onFormReset}
            >
              一键清空
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Caption;

interface Props {
  config?: FormItemConfig[];
  decodeHintImgUrl?: string;
  onFormReset?: () => void;
  onSearchOrderNumber?: (orderNumber: string) => void | Promise<unknown>;
  onSelectOneOfOrderNumber?: (value: string) => void;
}
