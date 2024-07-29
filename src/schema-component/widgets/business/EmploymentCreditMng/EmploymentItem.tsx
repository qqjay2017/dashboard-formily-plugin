import type { EmploymentType } from './types'
import { CodeLine, EmploymentItemWrap, UserNameLine } from './style'

export function EmploymentItem({
  username,
  code,
  validity,
  instructions,
  status,
}: EmploymentType) {
  return (
    <EmploymentItemWrap>
      <UserNameLine>
        人员姓名：
        {username}
      </UserNameLine>
      <CodeLine>
        诚信记录主体及编号：
        {code}
      </CodeLine>
      <CodeLine>
        有效期：
        {validity}
      </CodeLine>
      <CodeLine>
        事由：
        {instructions}
      </CodeLine>
    </EmploymentItemWrap>
  )
}
