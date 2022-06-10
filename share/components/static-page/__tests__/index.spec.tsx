import { shallow } from "enzyme";
import * as React from "react";

import StaticPage from "..";

describe("Component: StaticPage", () => {
  let component;

  beforeEach(() => {
    component = shallow(<StaticPage />);
  });

  it("should render component", () => {
    expect(component).toMatchSnapshot();
  });
});
