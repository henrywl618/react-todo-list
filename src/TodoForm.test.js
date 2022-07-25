import React from "react";
import {render} from "@testing-library/react";
import TodoForm from "./TodoForm";

it("renders without crashing", ()=>{
    render(<TodoForm />);
});

it("matches the snapshot", ()=>{
    const {asFragment} = render(<TodoForm />);
    expect(asFragment()).toMatchSnapshot();
});