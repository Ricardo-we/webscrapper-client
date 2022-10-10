import { FC, useState } from "react";

interface DropdownButtonProps {
	buttonLabel?: string;
	children?: JSX.Element | JSX.Element[] | string[] | string;
	dropdownItemsContainerClassNames?: string;
	className?: string;
}

const DropdownButton: FC<DropdownButtonProps> = ({
	buttonLabel,
	children,
	dropdownItemsContainerClassNames,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	return (
		<div className="relative text-left w-full md:w-auto">
			<button
				type="button"
				className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium shadow-sm duration-500 hover:bg-gray-100 z-50 text-gray-400 text-left md:text-center"
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
				onClick={() => setDropdownOpen((prev) => !prev)}
			>
				{buttonLabel}
			</button>

			{dropdownOpen && (
				<>
					<div
						onClick={() => setDropdownOpen(false)}
						className="fixed top-0 left-0 w-screen h-screen bg-transparent z-10"
					></div>

					<div
						onBlur={() => setDropdownOpen(false)}
						className={
							"absolute right-0 h-auto origin-top-right z-20 " +
							dropdownItemsContainerClassNames
						}
						onClick={(e) => e.stopPropagation()}
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
					>
						{children}
					</div>
				</>
			)}
		</div>
	);
};

export default DropdownButton;
