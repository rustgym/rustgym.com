---
title: Palindrome Number
author: Zane
image: img/palindrome.jpg
date: "2019-09-27T10:00:00.000Z"
tags:
  - Walkthrough
---

The purpose of this exercise is to determine whether or not a number is a palindrome, that is the same backward and forward.

For example, `121`, `12321`, and `286531135682` are palindromes, because they are the same backward and forward.

We do this in similar way to how we [reversed integers](/reverse-integer) in that we mod (take the remainder of) the input by 10 and divide by 10 until the input number is 0. This reverses the number, and then we just check to see if the reverse is the same as the input:

```rust
impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        if (x < 0) {
            return false;
        }
        let mut y = 0;
        let mut z = x;
        while z > 0 {
            y *= 10;
            y += z % 10;
            z /= 10;
        }
        y == x
    }
}
```
