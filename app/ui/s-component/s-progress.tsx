import { Progress, ProgressProps } from 'antd';

interface IProps {
  percent: number;
  className?: string;
  type?: ProgressProps['type'];
  size?: ProgressProps['size'];
}

export default function SProgress(props: IProps) {
  const percent = props.percent > 100 ? 100 : props.percent;
  return (
    <Progress
      className={props.className}
      percent={Number(percent.toFixed(2))}
      type={props.type}
      size={props.size}
    />
  );
}
