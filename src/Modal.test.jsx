import { Modal } from "./Modal";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { screen } from "@testing-library/dom";

test("scénario d_exemple", () => {
  render(
    <Modal title="Hello world!" onClose={() => null}>
      Bonjorno
    </Modal>
  );
  const title = screen.getByText("Hello world!");
  expect(title).toBeInTheDocument();
});

test("close on x click", function () {
  const mockClose = jest.fn();
  render(
    <Modal title="Hello world!" onClose={mockClose}>
      Bonjorno
    </Modal>
  );

  const close = document.body.querySelector("[aria-label = 'Fermer']")
    fireEvent.click(close)
  expect(mockClose.mock.calls.length).toBe(1)
});


test("close on escape key", function () {
  const mockClose = jest.fn();
  render(
    <Modal title="Hello world!" onClose={mockClose}>
      Bonjorno
    </Modal>
  );

  const close = document.body.querySelector("[aria-label = 'Fermer']")
    fireEvent.keyDown(document, {key: 'Escape'})
  expect(mockClose.mock.calls.length).toBe(1)
});


test("Does nothin on keyDown not being escape key", function () {
  const mockClose = jest.fn();
  render(
    <Modal title="Hello world!" onClose={mockClose}>
      Bonjorno
    </Modal>
  );

  const close = document.body.querySelector("[aria-label = 'Fermer']")
    fireEvent.keyDown(document, {key: 'Enter'})
  expect(mockClose.mock.calls.length).toBe(0)
});
