---
layout: post
title: Two Sum Walkthrough
image: img/two-sum.jpg
author: Zane
date: 2019-09-30T07:03:47.149Z
tags:
  - Walkthrough
draft: false
---

Two Sum is one of the easiet problems on the [leetcode](https://leetcode.com) website. So it probably makes sense to start there.

The object of the two sum algorithm is to pick two numbers in a vector that add up to a target number. Our starter code is as follows

```rust
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {

    }
}
```

You can see that leetcode provides you a good starting point to implement your solution.

There are many ways to implement the two sum algorithm, but probably the most efficient way is with a hash map.

We can use `HashMap::new` from  `std::collections` to create an empty hashmap like so:

```rust
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen = HashMap::new();

    }
}
```

Next, we iterate through the list of numbers:

```rust
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen = HashMap::new();
          for (i, num) in nums.iter().enumerate() {

          }
    }
}
```

and check to see if there is another number that adds up to the `target` number. And the way we do that is a bit sneaky.

In our hash map will be stored all the numbers we've already seen. So, we can tell which number, when added to the current number, would add up to the target number by simply subtracting the current number from the target.

In other words, say the target number is `9`, and our current number is `7`. We can subtract `7` from `9`, to get `2`. So the two-sum complement of `7` would be `2`. We can then simply check our hashmap for the key `2`. If it exists, then we simply return the current index, and the index of two, which we store in the hashmap, like so:

```rust
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen = HashMap::new();
          for (i, num) in nums.iter().enumerate() {
            if seen.contains_key(num) {
                return vec![seen[num] as i32, i as i32];
            } else {
                seen.insert(target - num, i);
            }
          }
    }
}
```

And there you have it, your first leetcode problem in Rust, albeit a simple one.

There are of course other ways to implement this algorithm, but this is the most efficient. We will discuss why hashmaps are efficient later on.