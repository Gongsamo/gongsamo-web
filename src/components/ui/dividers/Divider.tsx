import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface DividerProps {
  color?: string;
  marginTop?: string;
  marginBottom?: string;
}

const Divider = ({ color, marginTop, marginBottom }: DividerProps) => {
  const theme = useTheme();

  return (
    <DividerElement
      css={{
        marginTop: marginTop ?? 0,
        marginBottom: marginBottom ?? 0,
        background: color ?? theme.colors.gray5,
      }}
    />
  );
};

const DividerElement = styled.div`
  width: 100%;
  height: 1px;
`;

export default Divider;
