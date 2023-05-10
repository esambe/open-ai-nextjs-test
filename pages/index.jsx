import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { isEmpty } from "lodash";

export default function Home() {
	const [animalInput, setAnimalInput] = useState("");
	const [result, setResult] = useState();

	async function onSubmit(event) {
		event.preventDefault();
		setResult("Processing request...");
		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: animalInput }),
			});

			if (response) {
				const data = await response.json();
				if (response.status !== 200) {
					throw (
						data.error ||
						new Error(`Request failed with status ${response.status}`)
					);
				}
				setResult(data.result);
				// setAnimalInput("");
			}
		} catch (error) {
			setResult("");
			console.error(error);
			alert(error.message);
		}
	}

	return (
		<div>
			<Head>
				<title>OpenAI Quickstart</title>
				<link rel="icon" href="/ckp.png" />
			</Head>

			<main className={styles.main}>
				<h3>OPEN AI PROVE OF CONCEPT</h3>
				<form onSubmit={onSubmit}>
					<textarea
						type="text"
						name="question"
						placeholder="Ask a question?"
						value={animalInput}
						onChange={(e) => setAnimalInput(e.target.value)}
					/>
					<input type="submit" value="Get answer" />
				</form>
				<div className={styles.container}>
					<p>
						<strong>Question: {animalInput}</strong>
					</p>
					<hr />
					<h3 style={{ margin: 0 }}>Result</h3>
					<hr />
					{!isEmpty(result) && (
						<div
							style={{
								backgroundColor: "#eee",
								color: "#333",
								padding: 10,
								borderRadius: 4,
								maxHeight: "300px",
								overflowY: "scroll",
							}}
							dangerouslySetInnerHTML={{ __html: result }}
						/>
					)}
				</div>
			</main>
		</div>
	);
}
