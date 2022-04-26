import React from "react";

export const CheckField = (props) => {
	return (
		<>
			{props.prefectures.map((prefecture) => (
				<li key={prefecture.prefName}>
					<input
						onChange={(event) =>
							props.onChange(prefecture.prefName, prefecture.prefCode, event.target.checked)
						}
						type="checkbox"
						name="pref_name"
						id={"checkbox" + prefecture.prefCode}
					/>
					<label htmlFor={"checkbox" + prefecture.prefCode}>{prefecture.prefName}</label>
				</li>
			))}
			;
		</>
	);
};
