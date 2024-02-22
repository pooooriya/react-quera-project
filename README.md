```js
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  ${(p) => p.isActive && "border-radius: 20px;"}
`;
```
