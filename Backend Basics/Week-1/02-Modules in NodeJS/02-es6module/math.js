export function sum(nums) {
  return nums.reduce((total, num) => total + num, 0);
}

export function mean(nums) {
  return sum(nums) / nums.length;
}
