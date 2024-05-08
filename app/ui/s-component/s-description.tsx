import { ReactNode } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';

interface IProps {
  items: Record<string, ReactNode>;
}

export default function SDescription(props: IProps) {
  const items: DescriptionsProps['items'] = Object.entries(props.items).map(
    ([key, value]) => {
      return {
        key: key,
        label: key,
        children: value,
      };
    },
  );

  return <Descriptions items={items} bordered />;
}
