import React from "react";
import { shallow, mount, render } from "enzyme";
import { expect } from "chai";

import { Pokedex } from "./pokedex";

describe("Pokedex", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Pokedex />);
    expect(wrapper.find("div")).to.have.lengthOf(5);
  });
});
