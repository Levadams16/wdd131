const name = ["Levi Adams"]
console.log(name);
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;//the html string made from step
}
const stepsHtml = steps.map(listTemplate);// use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join();// set the innerHTML

const grades = ["A", "B", "A"];
function convertGradeToPoints(grade) {
    let points = 0;
    if (grade === "A") {
        points = 4;
    } else if (grade === "B") {
        points = 3;
    }
    return points;
}
const gpaPoints = grades.map(convertGradeToPoints);
const avgGpaPoints = gpaPoints.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / gpaPoints.length;
console.log(gpaPoints);
console.log(avgGpaPoints);

const fruits = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortFruit = fruits.filter(function (word) {
    return word.length < 6;
});
console.log(shortFruit);

const numbers = [12, 34, 21, 54];
let luckyNumber = numbers.indexOf(21);
console.log(luckyNumber);