import React from 'react';
import App from './App';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // container *must* be attached to document so events work correctly.  
  document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const clickOnCell = (row: number, col: number) => {
    act(() => {
        let cell = document.querySelector(`[data-testid=cell-${row}-${col}]`)
        cell?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
}

test('Draw', () => {
    render(<App/>, container)
    clickOnCell(0,0)
    clickOnCell(0,1)
    clickOnCell(0,2)
    clickOnCell(1,1)
    clickOnCell(1,0)
    clickOnCell(2,0)
    clickOnCell(1,2)
    clickOnCell(2,2)
    clickOnCell(2,1)
    const feedbackMessage = document.querySelector("[data-testid=feedbackMessage]")
    expect(feedbackMessage?.innerHTML).toContain("Egalité")
})

test('Victory and reset', () => {
    render(<App/>, container)
    clickOnCell(0,0)
    clickOnCell(1,0)
    clickOnCell(0,1)
    clickOnCell(1,1)
    clickOnCell(0,2)
    const feedbackMessage = document.querySelector("[data-testid=feedbackMessage]")
    expect(feedbackMessage?.innerHTML).toContain("Victoire")

    let resetButton = document.querySelector("[data-testid=reset]")
    resetButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    expect(feedbackMessage?.innerHTML).toContain("Au joueur")
})