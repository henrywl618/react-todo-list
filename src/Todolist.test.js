import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", ()=>{
    render(<TodoList />);
});

it("matches the snapshot", ()=>{
    const {asFragment} = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("adds a todo to the list", ()=>{
    const {queryByText, getByLabelText} = render(<TodoList />);
    const input = getByLabelText("Enter a reminder:");
    const submitBtn = queryByText("Submit");

    fireEvent.change(input, {target: {value:"This is a reminder!"}});
    fireEvent.click(submitBtn);

    expect(queryByText("This is a reminder!")).toBeInTheDocument();
});

it("removes a todo from the list", ()=>{
    // add a todo to the list
    const {queryByText, getByLabelText} = render(<TodoList />);
    const input = getByLabelText("Enter a reminder:");
    const submitBtn = queryByText("Submit");

    fireEvent.change(input, {target: {value:"This is a reminder!"}});
    fireEvent.click(submitBtn);

    expect(queryByText("This is a reminder!")).toBeInTheDocument();

    //remove the todo we added

    const deleteBtn = queryByText("X");
    fireEvent.click(deleteBtn);
    expect(queryByText("This is a reminder!")).not.toBeInTheDocument();

});

it("edits a todo in the list", ()=>{
    // add two todos to the list
    const {queryByText, getByLabelText, queryAllByText, queryAllByLabelText, queryAllByRole} = render(<TodoList />);
    const input = getByLabelText("Enter a reminder:");
    const submitBtn = queryByText("Submit");

    fireEvent.change(input, {target: {value:"This is a reminder!"}});
    fireEvent.click(submitBtn);
    fireEvent.change(input, {target: {value:"This is a second reminder!"}});
    fireEvent.click(submitBtn);

    expect(queryByText("This is a reminder!")).toBeInTheDocument();
    expect(queryByText("This is a second reminder!")).toBeInTheDocument();

    const editBtns = queryAllByText("Edit");

    fireEvent.click(editBtns[1]);
    //an edit form should appear;
    expect(queryByText("Edit Todo: This is a second reminder!")).toBeInTheDocument();

    const inputs = queryAllByRole("input");
    const submitBtns = queryAllByText("Submit");

    fireEvent.change(inputs[1], {target: {value:"Edited the second reminder!"}});
    fireEvent.click(submitBtns[1]);

    expect(queryByText("Edited the second reminder!")).toBeInTheDocument();
    expect(queryByText("This is a reminder!")).toBeInTheDocument();
    expect(queryAllByText("X").length).toBe(2);

});

