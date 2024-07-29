import { get } from "lodash-es";
import { useFetchProjectDt } from "./useFetchProjectDt";

import {
  AutoScrollWrap,
  FitCoverImg,
  ProjectDescImgWrap,
  TextBgWrap,
} from "./style";
import { useAutoScroll, useQueryToBusParams } from "@/schema-component/hooks";
import type { SchemComponentWithDataSourceProps } from "@/types";
import { EmptyKit } from "@/themes/style-components";

export function ProjectDesc({ query }: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(query);

  const projectId = busParams?.projectId;

  const { data, isLoading } = useFetchProjectDt(projectId);
  const projectDt = get(data, "data.data");

  const projectPicSrc = get(projectDt, "projectPics[0].fileSrcUrl");
  const remark = get(projectDt, "remark");
  const scrollRef = useAutoScroll(1, 80, !!remark);

  return (
    <EmptyKit loading={isLoading} empty={!projectId || !projectDt}>
      <ProjectDescImgWrap>
        {!!projectPicSrc && <FitCoverImg src={projectPicSrc} />}
        <TextBgWrap>
          <AutoScrollWrap ref={scrollRef}>{remark}</AutoScrollWrap>
        </TextBgWrap>
      </ProjectDescImgWrap>
    </EmptyKit>
  );
}
