import { render } from "enzyme";
import * as React from "react";

import createMockingComponent from "../createMockingComponent";

test("createMockingComponent", () => {
  const Component = createMockingComponent("MockingComponent", ["prop1"]);

  expect(render(<Component prop1="value1" prop2="value2" />)).toMatchSnapshot();
});
