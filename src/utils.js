import { v4 as uuidv4 } from "uuid";

export function createCards(maxGuessNumber = 31) {
	let cardsArray = [];
	let totalCardsRequired = maxGuessNumber.toString(2).length; // finding the number of binary digits the max number takes

	for (let i = 0; i < totalCardsRequired; i++) {
		let singleCardNumberArray = [];
		for (let j = maxGuessNumber; j >= 0; j--) {
			let binaryNumber = makeBinaryString(
				j.toString(2),
				totalCardsRequired
			);
			// console.log(
			// 	"I value is ",
			// 	i,
			// 	"- binary number is ",
			// 	binaryNumber,
			// 	" - decimal : ",
			// 	j,
			// 	"number falls under card category",
			// 	binaryNumber[i] === "1"
			// );
			if (binaryNumber[i] === "1") {
				singleCardNumberArray.push(j);
			}
		}
		cardsArray.push({
			cardNumber: i,
			numbers: singleCardNumberArray,
			id: uuidv4(),
			isChecked: false,
		});
	}

	return cardsArray;
}

function makeBinaryString(currentBinaryString, requiredLength) {
	let currentStringLength = currentBinaryString.length;
	let newString = "";
	let differenceInLength = requiredLength - currentStringLength;
	for (let i = 0; i < differenceInLength; i++) {
		newString += "0";
	}
	newString += currentBinaryString;

	return newString;
}

console.log(createCards());
