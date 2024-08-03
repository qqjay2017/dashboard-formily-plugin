import { Button, Col, Modal, Row, message } from "antd";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { css } from "@emotion/css";
import type { IFormDialog } from "@formily/antd-v5";
import type { IApiType } from "./types";
import { typeConfig } from "./consts";
import { useTypeParam } from "@/client-pages/hooks";

import { cx } from "@/utils";

function ApiTypeItem({
  type,
  isActive,
  onClickType,
}: {
  type: IApiType;
  isActive?: boolean;
  onClickType: (url: IApiType) => void;
}) {
  const config = typeConfig[type];
  if (!config) {
    return null;
  }
  return (
    <Col span={12}>
      <div
        onClick={() => {
          onClickType && onClickType(type);
        }}
        className={cx(
          css`
            margin: 24px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            border-radius: 8px;
            cursor: pointer;
            &:hover {
              border-color: var(--dn-brand-color);
            }
          `,
          isActive &&
            css`
              border-color: var(--dn-brand-color);
            `
        )}
      >
        <div
          className={css`
            font-size: 16px;
          `}
        >
          {config.title}
        </div>
        <div
          className={css`
            margin-top: 10px;
            font-size: 14px;
          `}
        >
          {config.subTitle}
        </div>
      </div>
    </Col>
  );
}

function ApiTypeSelect({
  type,
  setType,
  onTypeClick,
}: {
  type: string;
  setType: (t: IApiType) => void;
  onTypeClick: (t: IApiType) => void;
}) {
  return (
    <Row>
      <ApiTypeItem
        onClickType={onTypeClick}
        isActive={type === "json"}
        type="json"
      />
      <ApiTypeItem
        onClickType={onTypeClick}
        isActive={type === "js"}
        type="js"
      />
      <ApiTypeItem
        onClickType={onTypeClick}
        isActive={type === "http"}
        type="http"
      />
      <ApiTypeItem
        onClickType={onTypeClick}
        isActive={type === "magic"}
        type="magic"
      />
    </Row>
  );
}

export function CreateApiBtn() {
  const [open, setOpen] = useState(false);
  const { typeParam } = useTypeParam();
  const navigate = useNavigate();
  const [type, setType] = useState<string>(typeParam);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (typeParam && typeParam !== "all") {
            setType(typeParam);
          } else {
            setType("");
          }
          setOpen(true);
        }}
      >
        新增API
      </Button>
      <Modal
        open={open}
        title="选择新建接口类型"
        width="70%"
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          if (!type) {
            message.warning("请选择类型");
            return false;
          }

          navigate(`/dapi-edit?type=${type}`);
          setOpen(false);
        }}
      >
        <ApiTypeSelect
          type={type}
          setType={setType}
          onTypeClick={(type) => {
            navigate(`/dapi-edit?type=${type}`);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
