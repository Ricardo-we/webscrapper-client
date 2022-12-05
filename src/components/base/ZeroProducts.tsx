import Link, { PlainLink } from "./Link";

import { FC } from "react";
import { FaRegSadCry } from "react-icons/fa";
import FlexBox from "./containers/FlexBox";

interface ZeroProductsProps {}

const ZeroProducts: FC<ZeroProductsProps> = ({ }) => {
	return (
		<FlexBox direction="column">
			<FlexBox
				justify="center"
				align="center"
				style={{ width: "100%", padding: 10 }}
			>
				<h3
					className="text-5xl text-center h-full font-bold"
					style={{ color: "var(--bg-dark" }}
				>
					No se encontraron productos
				</h3>
				<FaRegSadCry
					style={{ marginLeft: 30, color: "var(--bg-dark)" }}
					size={60}
				/>
			</FlexBox>

			<PlainLink className="hover:text-gray-700 text-black p-2" to="/">Regresar al inicio</PlainLink>
		</FlexBox>
	);
};

export default ZeroProducts;
