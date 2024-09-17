export const handleKeyBoardMovement = (
  currIdx: number,
  listRef: React.RefObject<HTMLUListElement>,
  direction: "UP" | "DOWN",
) => {
  let nextSelectedIdx = currIdx;
  if (listRef.current) {
    if (direction === "DOWN") {
      nextSelectedIdx =
        currIdx + 1 >= listRef.current.children.length ? 0 : currIdx + 1;
    } else {
      nextSelectedIdx =
        currIdx - 1 < 0 ? listRef.current.children.length - 1 : currIdx - 1;
    }

    (listRef.current?.childNodes[nextSelectedIdx] as HTMLLIElement).focus();
  }
  return nextSelectedIdx;
};
