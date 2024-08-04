import { get } from "lodash-es";
import { useFetchProjectDt } from "./useFetchProjectDt";

import {
  AutoScrollWrap,
  FitCoverImg,
  ProjectDescImgWrap,
  TextBgWrap,
} from "./style";
import { useAutoScroll } from "@/schema-component/hooks";
import type { SchemComponentWithDataSourceProps } from "@/types";
import { EmptyKit } from "@/dashboard-themes/style-components";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

function ProjectDescMain({ queryParams }: SchemComponentWithDataSourceProps) {
  const projectId = queryParams?.projectId;

  const { data: projectDt, isLoading } = useFetchProjectDt(projectId);

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

export const ProjectDesc = injectApiInfo(ProjectDescMain);
