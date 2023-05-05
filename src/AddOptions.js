import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import {
  DeleteOutlined,
  HolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const AddOptions = () => {
  const [optionName, setOptionName] = useState([]);
  const [allCombinations, setAllCombinations] = useState([]);

  const onFinish = (values) => {
    const newOption = {
      OptionName: values.OptionName,
      Variant: values.Variant.map((variant) => variant.Name),
    };
    setOptionName([...optionName, newOption]);
  };

  const generateCombinations = (options) => {
    const variants = options.map((option) => option.Variant).flat();
    const result = [];

    const combine = (subset, start) => {
      result.push(subset.join(" / "));
      for (let i = start; i < variants?.length; i++) {
        combine([...subset, variants[i]], i + 1);
      }
    };

    combine([], 0);

    setAllCombinations(result);
  };

  useEffect(() => {
    generateCombinations(optionName);
  }, [optionName]);

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name={"OptionName"} label="Option name">
          <Input placeholder="Option name" />
        </Form.Item>

        <Form.List name={"Variant"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Form.Item
                    key={index}
                    name={[field.name, "Name"]}
                    label={<HolderOutlined />}
                    colon={false}
                  >
                    <Row>
                      <Col>
                        <Input placeholder="variant name" />
                      </Col>
                      <Col>
                        <DeleteOutlined onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                  </Form.Item>
                );
              })}
              <Form.Item>
                <Button
                  icon={<PlusOutlined />}
                  type="dashed"
                  block
                  onClick={() => {
                    add();
                  }}
                >
                  Add a Variant
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Button htmlType="submit" type="primary">
          Done
        </Button>
      </Form>
      {/* <Button
        htmlType="button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {}}
      >
        Add Option like size or color
      </Button> */}

      {optionName?.map((OptionNames, index) => {
        return (
          <div key={index}>
            <h1>{OptionNames.OptionName}</h1>
            {OptionNames.Variant.map((varItem) => {
              return <h3 key={varItem}>{varItem}</h3>;
            })}
          </div>
        );
      })}

      <div>
        {allCombinations.map((combination, index) => (
          <div key={index}>{combination} </div>
        ))}
      </div>
    </div>
  );
};

export default AddOptions;
