<div align="center">
  <img height="60" src="https://edurev.gumlet.io/AllImages/original/ApplicationImages/CourseImages/944e5d47-8c55-4a89-91e5-22ab5f2798fc_CI.png">
  <h1>MCQ TEST</h1>
</div>

###### 1. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
let greeting;
greetign = {};
console.log(greetign);
```

- A: `{}`
- B: `ReferenceError: greetign is not defined`
- C: `undefined`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: B: ReferenceError: greetign is not defined.

<i>There's a type error. Declared Variable as <b>greeting</b> and assigned as <b>greetign</b> = {};,
Which (greetign) is not defined.
</i>

</p>
</details>

###### 2. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, "2");
```

- A: `NaN`
- B: `TypeError`
- C: `"12"`
- D: `3`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: Answer:C: "12".

<i>Here <b>a</b> is number and <b>b</b> is string. Javascript cant calculate if value is string.
Thats why javaScript will convert <b>1</b> to a string and concatenate it with <b>"2"</b>, resulting in the string <b>"12"</b>
</i>

</p>
</details>

###### 3. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
const food = ["🍕", "🍫", "🥑", "🍔"];
const info = { favoriteFood: food[0] };

info.favoriteFood = "🍝";

console.log(food);
```

- A: `['🍕', '🍫', '🥑', '🍔']`
- B: `['🍝', '🍫', '🥑', '🍔']`
- C: `['🍝', '🍕', '🍫', '🥑', '🍔']`
- D: `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A: ['🍕', '🍫', '🥑', '🍔'].

<i>By assigning <b>info.favoriteFood</b> <b> food[0]</b> and changed the value of <b> info.favoriteFood</b> is to "🍝" will not change the original Array <b> food</b> because it'll assign to <b> info.favoriteFood</b> not the original Array <b> food</b> .Therefore consoling the food will output the original array ['🍕', '🍫', '🥑', '🍔']. </i>

</p>
</details>

###### 4. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
function sayHi(name) {
  return `Hi there, ${name}`;
}

console.log(sayHi());
```

- A: `Hi there,`
- B: `Hi there, undefined`
- C: `Hi there, null`
- D: `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: B: Hi there, undefined.

<i> <b> sayHi</b> functions need parameter when calling it. But in this line <b>console.log(sayHi())</b> not pass any parameters.In Javascript when a function is called with fewer arguments than expected, the missing parameters are assigned the value undefined. Therefore, the output will be <b>Hi there, undefined.</b></i>

</p>
</details>

###### 5. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach((num) => {
  if (num) count += 1;
});

console.log(count);
```

- A: 1
- B: 2
- C: 3
- D: 4

<details><summary><b>Answer</b></summary>
<p>

#### Answer: C: 3.

<i>In Javascript take <b> 0 </b> as falsy value. So in foreach <b> if (num)</b> will check num value. In nums array first element is <b> 0 </b> . As result it'll not pass the <b> if (num)</b> condition . For rest there are three truthy values <b> (1, 2, and 3) </b>, so the final value of count is <b> 3 </b>.</i>

</p>
</details>
