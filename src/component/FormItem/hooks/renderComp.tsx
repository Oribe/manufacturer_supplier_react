import { AutoComplete, Input, Select } from "antd";
import Complex from "component/Complex";
import ImgSelect from "component/ImgSelect";
import React from "react";
import {
  Component,
  FormItem as FormItemConfig,
  isImageOptions,
  isOptions,
  SelectProps,
} from "store/modules/Form";
import initialOptions from "./initialOptions";

const renderComponent = (
  comp?: Component,
  { complexConfig, associatedValues }: Options = {}
) => {
  const { type, props: componentProps, func } = comp || {};
  const { options } = componentProps || {};
  let opts: SelectProps | undefined = options;
  if (associatedValues && associatedValues.length > 0) {
    opts = initialOptions(options, associatedValues, true);
  }

  const switchComponent = () => {
    switch (type?.toUpperCase()) {
      /**
       * 输入框
       */
      case "input".toUpperCase():
        return <Input {...componentProps} {...func} />;
      /**
       * 下拉框
       */
      case "select".toUpperCase():
        if (opts && isOptions(opts)) {
          return (
            <Select
              {...componentProps}
              options={opts}
              dropdownMatchSelectWidth={false}
              {...func}
            />
          );
        }
        return (
          <Select
            {...componentProps}
            options={[]}
            dropdownMatchSelectWidth={false}
            {...func}
          />
        );
      /**
       * 图片选择
       */
      case "imgSelect".toUpperCase():
        if (options && isImageOptions(options)) {
          return <ImgSelect options={options} />;
        }
        return null;
      /**
       * 复合组件
       */
      case "complex".toLocaleUpperCase():
        return <Complex config={complexConfig} />;
      /**
       * 自动完成
       */
      case "autoComplete".toLocaleUpperCase():
        if (opts && isOptions(opts)) {
          return <AutoComplete {...componentProps} options={opts} {...func} />;
        }
        return <AutoComplete {...componentProps} options={[]} {...func} />;
      /**
       * 默认
       */
      default:
        return <Input {...componentProps} {...func} />;
    }
  };

  return switchComponent();
};

export default renderComponent;

interface Options {
  complexConfig?: FormItemConfig[];
  associatedValues?: (string | number)[];
  // onSearch?: (query?: string) => void;
}
