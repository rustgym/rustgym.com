---
title: Reverse Integer
author: Zane
image: img/demo1.jpg
date: "2019-09-28T10:00:00.000Z"
tags:
  - Walkthrough
---

The goal of this exercise is to take a number and output it backwards.

For example `123` -> `321`.

This should be fairly simple. As usually, leet code gives us some starter code:

```rust
impl Solution {
    pub fn reverse(x: i32) -> i32 {
    }
}
```

Let's create two variables, one to store our result, and another to store the current state of our input number:

```rust
impl Solution {
    pub fn reverse(x: i32) -> i32 {
        let mut res: i32 = 0;
        let mut cur: i32 = x;
    }
}
```

Our approach is simple. Take the remainder of `cur` divided by 10, and that gives us the least significant digit of cur.

That is, `321 % 10 = 1`

Then, we add that number to `res`. We keep doing that until cur is set to zero. The decimal places are truncated, because `cur` is an integer of type `i32`, and we return the result.

```rust
impl Solution {
    pub fn reverse(x: i32) -> i32 {
        let mut res: i32 = 0;
        let mut cur: i32 = x;

        while cur != 0 {
            match res.checked_mul(10) {
                None => return 0,
                Some(tmp) => match tmp.checked_add(cur % 10) {
                    None => return 0,
                    Some(fine) => {
                        res = fine;
                    }
                }
            }
            cur /= 10;
        }

        res
    }
}
```

You may have noticed that we don't just multiply and add, but instead we use `checked_mul` and `checked_add`. These ensure that even if there is an overflow of the `i32` type, it will just return 0 instead of panicking.