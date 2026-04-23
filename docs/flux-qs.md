- return the largest number of unique characters in any 
  subsequence of length k
- return the length of the largest subsequence with at 
  most x number of some letter
    - diff from 3rd problem: k distinct symbols vs k of 
      a specific letter
    - the k of a specific letter one is a tiny bit more 
      complicated bc you have to make a while loop to 
      shrink from the left side every time the freq 
      count of the target letter goes over 
- Leetcode 1456 Maximum Number of Vowels in a Substring of Given Length

# Minimum Size Subarray in Infinite Array
- https://leetcode.com/problems/minimum-size-subarray-in-infinite-array/description/
```
class Solution:
  def minSizeSubarray(self, nums: List[int], target: int) -> int:
      n = len(nums)
      total = sum(nums)
      full, rem = divmod(target, total)

      if rem == 0:
          return full * n

      ans = float('inf')
      curr, left = 0, 0

      for right in range(2 * n):
          curr += nums[right % n]
          while curr > rem:
              curr -= nums[left % n]
              left += 1

          if curr == rem:
              ans = min(ans, right - left + 1)

      return -1 if ans == float('inf') else full * n + ans
```
its basically a normal sliding window problem but
the solution comes basically when u realize that u can 
eliminate copies of the array by using modulo
since its "infinite" u think its long runtime, but in 
reality u only ever have to iterate over 2n because all 
you have to check is a subset starting from each number 
in the original array and wrapping one time
since you can always just add sum(array) at any point 
to represent adding copies of the whole array
think of it like this
if u have array [1, 2, 3]
if you append infinitely it obv becomes [1, 2, 3, 1, 2, 
3, 1, 2, 3....]
but if you wanted to check the subarray start from 
nums[2], you don't need to calculate everything from 
[3, 1, 2, 3, 1, 2, 3...]
you can just do [3] + sum(nums) + [1, 2, 3]
you can just do [3] + sum(nums) + [1, 2, 3...] so if 
the array expands more to something like [1, 2, 3, 1, 
2, 3, 1, 2, 3, 1, 2, 3...]
again if we start from index 2, you can just do [3] + 2 
* sum(nums) + [1, 2, 3...]
because 2 * sum(nums) is [1, 2, 3, 1, 2, 3] which we're 
just eliminating from the sliding window calculations 
to save runtime
