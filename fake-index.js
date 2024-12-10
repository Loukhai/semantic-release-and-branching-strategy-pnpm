function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number")
    throw new Error(
      "Should type a number in both args, add function accept two params typeof 'number'."
    );
  return console.log(a + b);
}
