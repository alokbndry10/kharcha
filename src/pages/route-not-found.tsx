import { ScrollableDiv } from '@components/scrollable-div';
import { Button, Result } from 'antd';

export default function RouteNotFound() {
  return (
    <ScrollableDiv className="flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="You seem to be lost in the void."
        extra={
          <Button type="primary" onClick={() => (window.location.href = '/')}>
            Visit Application
          </Button>
        }
      />
    </ScrollableDiv>
  );
}
