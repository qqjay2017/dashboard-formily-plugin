import { Radio } from 'antd'

interface IsDarkThemeSelectProps {
  value?: boolean
  onChange?: (flag?: boolean) => void
}

export function IsDarkThemeSelect({
  value,
  onChange,
}: IsDarkThemeSelectProps) {
  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      options={[
        {
          label: '暗色',
          value: 1,
        },
        {
          label: '亮色',
          value: 2,
        },
      ]}
      onChange={(e) => {
        onChange && onChange(e.target.value === 1)
      }}
      value={value ? 1 : 2}
    />
  )
}
