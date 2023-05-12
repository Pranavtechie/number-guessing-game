import { useState } from "react";
import { createCards } from "./utils";
import { v4 as uuidv4 } from "uuid";
import ShowModal from "./ShowModal";

function App() {
	const [cardsData, setCardsData] = useState(createCards());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [answer, setAnswer] = useState(0);

	function updateCheckedCards(cardNumber, isChecked) {
		let arr = [...cardsData];
		arr[cardNumber]["isChecked"] = !isChecked;
		setCardsData(arr);
		console.log(arr);
	}

	function resetCardSelection() {
		let newCardsData = cardsData.map((card) => {
			return { ...card, isChecked: false };
		});

		setCardsData(newCardsData);
	}

	console.log(
		"diable button",
		cardsData.map(({ isChecked }) => isChecked).includes(true)
			? false
			: true
	);

	function guessNumber() {
		let str = "";
		let binaryNumbers = cardsData.map(({ isChecked }) =>
			isChecked ? "1" : "0"
		);

		str = binaryNumbers.join("");
		console.log(str);
		let answer = parseInt(str, 2);
		console.log(answer);
		setAnswer(answer);
		setIsModalOpen((value) => !value);
	}

	return (
		<>
			<div className="sm:h-full md:h-screen bg-gray-700">
				<nav className="bg-gray-800">
					<h1 className="text-4xl font-bold text-indigo-500 text-center py-2">
						Guess the Number
					</h1>
				</nav>
				<div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mt-3">
					<p className="font-bold">
						Choose a number between 1 and 31 (both 1 and 31
						inclusive) and{" "}
						<span className="underline">select all the cards</span>{" "}
						that have the number.
					</p>
					<p className="text-sm">
						Our algorithm would attempt to guess the number
						correctly every time!
					</p>
				</div>
				<main className="flex gap-2 justify-center  mt-10">
					<form
						onSubmit={(e) => e.preventDefault()}
						className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 px-10 grid-cols-1"
					>
						{cardsData.map(
							({ numbers, cardNumber, id, isChecked }) => {
								return (
									<label
										className={`rounded-md  text-gray-100 
										max-w-[200px] flex flex-wrap gap-6 font-bold text-lg px-4 py-8 cursor-pointer text-center ${
											isChecked === true
												? "bg-green-700 hover:bg-green-800"
												: "bg-gray-900 hover:bg-gray-800"
										}`}
										key={id}
										htmlFor={id}
									>
										{numbers.map((number) => {
											return (
												<span key={uuidv4()}>
													{number}
												</span>
											);
										})}
										<input
											type="checkbox"
											className="hidden"
											id={id}
											checked={isChecked === true}
											onChange={() => {
												updateCheckedCards(
													cardNumber,
													isChecked
												);
											}}
										/>
									</label>
								);
							}
						)}
					</form>
				</main>
				<section className="text-center mt-10">
					<button
						className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 disabled:cursor-not-allowed"
						onClick={guessNumber}
						disabled={
							cardsData
								.map(({ isChecked }) => isChecked)
								.includes(true)
								? false
								: true
						}
					>
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
							Submit Guess
						</span>
					</button>
					<ShowModal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						number={answer}
						reset={resetCardSelection}
					/>
				</section>
			</div>
		</>
	);
}

export default App;
