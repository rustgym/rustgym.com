---
title: Roman to Integer
image: img/callum-shaw-555357-unsplash.jpg
author: Zane
date: 2019-03-10T10:00:00.000Z
tags:
  - Walkthrough
---

The purpose of this exercise is to convert a [Roman numeral](http://mathworld.wolfram.com/RomanNumerals.html) to an integer.

As always leetcode provides with some starter code, and we just have to implement the solution:

```rust
impl Solution {
  pub fn roman_to_int(s: String) -> i32 {

  }
}
```

Each letter in a roman numeral can be mapped to an integer value, so let's create a convenient function to do this conversion for us:

```rust
pub fn letter_to_int(c: char) -> i32 {
  match c {
    'I' => 1,
    'V' => 5,
    'X' => 10,
    'L' => 50,
    'C' => 100,
    'D' => 500,
    'M' => 1000,
    _ => 0,
  }
}

impl Solution {
  pub fn roman_to_int(s: String) -> i32 {

  }
}
```

We need to keep track of the state that we're in. If an `I` is followed by a `V`, the `I` is subtracted from the `V`, making it `IV` `5 - 1 = 4`.

But there cannot be two `I`'s before the `V`, so we need to make sure that we keep track if there has already been an `I`.

Note: This can be expanded to other numbers to, like `X` before `C` is `100 - 10 = 90`.

Let's create a `State` enum, and we'll say `S0` is the state where we're not on a `I` before `V`, and `S1` means we are on an `I` before `V`.

Thus, if we have to `S1` states in a row (where the preceding number is greater than the next), we can panic with an `Invalid input.` error.

```rust
pub enum State {
  Default,
  S0,
  S1
}

pub fn letter_to_int(c: char) -> i32 {
  match c {
    'I' => 1,
    'V' => 5,
    'X' => 10,
    'L' => 50,
    'C' => 100,
    'D' => 500,
    'M' => 1000,
    _ => 0,
  }
}

impl Solution {
  pub fn roman_to_int(s: String) -> i32 {

  }
}
```


Now, we just need to loop through each character in reverse order, add the current number to our `sum` if the current number is greater than the previous number, and subtract if it is less, e.g. `IV`. Then we just panic preceding number is greater, and we're already in `State::S1`:

```rust
pub enum State {
  Default,
  S0,
  S1
}

pub fn letter_to_int(c: char) -> i32 {
  match c {
    'I' => 1,
    'V' => 5,
    'X' => 10,
    'L' => 50,
    'C' => 100,
    'D' => 500,
    'M' => 1000,
    _ => 0,
  }
}

impl Solution {
  pub fn roman_to_int(s: String) -> i32 {
    let mut last_value: Option<i32> = None;
    let mut state = State::Default;
    let mut sum: i32 = 0;
    for s in s.chars().rev() {
      let value = letter_to_int(s);
      match state {
        State::Default => {
          state = State::S0;
          sum += value;
        },
        State::S0 => {
          if value >= last_value.unwrap() {
            sum += value;
          } else {
            sum -= value;
            state = State::S1;
          }
        },
        State::S1 => {
          if value >= last_value.unwrap() {
            sum += value;
            state = State::S0;
          } else {
            panic!("Invalid input.");
          }
        }
      }
      last_value.replace(value);
    }
    sum
  }
}
```