---
title: Longest Common Prefix
author: Zane
image: img/demo1.jpg
date: "1863-11-19T10:00:00.000Z"
tags:
  - Walkthrough
---

The purpose of this exercise is to find the longest common prefix of a vector of strings.

In other words, the longest common prefix of `["hello", "hi", "hey"]` (although these are string slices) would be `"h"`, because `"h"` is present at the beginning of all three words. The longest common prefix of `["hello", "hey"]` would be `"he"`.

As always, leetcode gives us starter code:

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {

    }
}
```

We create a variable `prefix` to store the longest common prefix:

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        let mut prefix = String::new();
    }
}
```

Next, let's convert those strings to string slices, so we can iterate through the characters and store them in a variable called `iters`.

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        let mut prefix = String::new();
        let mut iters: Vec<Chars> = strs.iter().map(|s| {s.chars()}).collect();
    }
}
```

And we'll create a variable called `curr_char` that will hold the character we are processing in the loop.

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        let mut prefix = String::new();
        let mut iters: Vec<Chars> = strs.iter().map(|s| {s.chars()}).collect();
        let mut curr_char: Option<char> = None;
    }
}
```

Let's add a check for if there are no strings in the vector. If so, we'll just return the empty string `prefix`.

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        let mut prefix = String::new();
        let mut iters: Vec<Chars> = strs.iter().map(|s| {s.chars()}).collect();
        let mut curr_char: Option<char> = None;
        if strs.len() < 1 { return prefix }
    }
}
```

Enough prep work; now for the nitty gritty. We first take character and add it to the `prefix` string (the result). Initially, that will be empty, but since we use the `map` function, it's won't be added to the string, simply because there is nothing to add.

Next we loop through the iterators, which is just a vector of of our string slices. Each call to `iter.next()` processes the next character in each string slice. If there are no more characters in one of the string slices, we go ahead and return the prefixes, because we need to truncate to the shortest string.

We also need to assign the character to `curr_char` if we're on the first string slice in the current loop, so that we can compare it to the characters at the same position in the other string slices.

Finally, we check to see if the current character is the same as the `curr_char` in the rest of the string slices. Then we go back to the beginning of the loop and add that character to the prefix.

This algorithm is a bit harder to understand, especially if you're not totally familiar with the syntax in Rust, so take your time and make sure you understand it.

```rust
use std::str::Chars;
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        let mut prefix = String::new();
        let mut iters: Vec<Chars> = strs.iter().map(|s| {s.chars()}).collect();
        let mut curr_char: Option<char> = None;
        if strs.len() < 1 { return prefix }
        loop {
            curr_char.take().map(|ch| prefix.push(ch));
            for iter in iters.iter_mut() {
                let mut ch = iter.next();
                if ch.is_none() { return prefix }
                match curr_char {
                    None => curr_char = ch.take(),
                    Some(curr) => {
                        if curr != ch.unwrap() {
                            return prefix
                        }

                    },
                }
            }
        }

    }
}
```