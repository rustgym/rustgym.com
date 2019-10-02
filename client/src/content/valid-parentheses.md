---
title: Valid Parentheses
author: Larry
image: img/marvin-meyer-794521-unsplash.jpg
date: "1922-12-12T10:00:00.000Z"
tags:
  - Walkthrough
---

This exercise is easy enough, we simply verify is a set of nested parentheses/brackets/braces is valid, and by valid I mean no unclosed or mismatched braces. For example, `{()}` and `{[]([])}` would be valid, but `[)` and `[(}` would not.

To start us off, let's make a convenience function that takes two brackets and returns whether or not they're a pair:

```rust
impl Solution {
    fn is_pair(br1: char, br2: char) -> bool {
        match br1 {
            '{' => br2 == '}',
            '[' => br2 == ']',
            '(' => br2 == ')',
            _ => false,
        }
    }
    pub fn is_valid(s: String) -> bool {

    }
}
```

Our algorithm to implement this solution is quite elegant and concise. We're going to be utilizing a data structure called the `stack`. You can think of the stack like a stack of trays. Every time we add a tray, that tray is going to be the first one to come off.

To be precise, whenever we add a `(`, `[`, or `{`, we are going to make sure the next character is a closing character. If not, we add it to the stack. Then, when we do get to that closing character, we take it back off the stack until there are no characters left on the stack.

If we get to the end of the string, and there are still characters in the stack, we know some bracket somewhere went unclosed, so we have an `Invalid input`.

Let's take a look at that in action.

```rust
impl Solution {
    fn is_pair(br1: char, br2: char) -> bool {
        match br1 {
            '{' => br2 == '}',
            '[' => br2 == ']',
            '(' => br2 == ')',
            _ => false,
        }
    }
    pub fn is_valid(s: String) -> bool {
        let mut stack = Vec::new();
        for c in s.chars() {
            if let Some(&b) = stack.last() {
                if Self::is_pair(b as char, c as char) {
                    stack.pop();
                    continue;
                }
            }
            stack.push(c)
        }
        stack.is_empty()
    }
}
```