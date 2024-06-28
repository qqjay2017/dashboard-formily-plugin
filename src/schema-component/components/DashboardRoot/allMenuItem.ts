
import { Header1MenuItem } from '../../banner'
import { ClassicFrameMenuItem, ProjectBudgetMenuItem, ProjectTypePercentMenuItem, StatisticMenuItem } from '../../widgets'

export const allMenuItem = {


    Header1: Header1MenuItem,
    ClassicFrame: ClassicFrameMenuItem,
    Statistic: StatisticMenuItem,
    ProjectBudget: ProjectBudgetMenuItem,
    ProjectTypePercent: ProjectTypePercentMenuItem
}

const subMenuItems0 = [ClassicFrameMenuItem];

const subMenuItems2 = [StatisticMenuItem];

const subMenuItems3 = [Header1MenuItem];

const subMenuItems4 = [ProjectBudgetMenuItem, ProjectTypePercentMenuItem];
export type SubMenuItems = (typeof subMenuItems0)[0];

export const allSubMenuItems = {
    0: subMenuItems0,
    2: subMenuItems2,
    3: subMenuItems3,
    4: subMenuItems4,
};