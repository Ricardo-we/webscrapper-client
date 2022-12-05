import { IconLink, PlainLink } from "./Link";

import { AiFillFacebook } from "react-icons/ai";
import { FC } from "react";
import FlexBox from "./containers/FlexBox";
import { IoLogoInstagram } from "react-icons/io";
import contactInfoJson from "../../settings/data/contact.json";
import useLanguage from "../../hooks/useLanguage";

interface FooterProps {}
const ICON_SIZE = 30;

const FooterIconLink = ({ children, to }: { children?: any; to: string }) => {
	return (
		<IconLink
			size={ICON_SIZE}
			className="hover:text-indigo-200 text-white p-2"
			to={to}
		>
			{children}
		</IconLink>
	);
};

const FooterHeading = ({ children, underlined = true }: any) => {
	const footerClassName =
		"text-white text-lg font-bold " +
		(underlined ? "border-b-2 border-white" : "text-base");
	return <h3 className={footerClassName}>{children}</h3>;
};

const Footer: FC<FooterProps> = () => {
	const { language } = useLanguage("es");

	return (
		<footer className="w-full items-center justify-center bg-slate-900 p-5 mt-28">
			<FlexBox className="w-full" direction="row">
				<FlexBox direction="column" className="w-1/2">
					<FooterHeading>Algún problema o sugerencia?</FooterHeading>
					<PlainLink
						to={"mailto:" + contactInfoJson["email"]}
						mode="httplink"
						className="text-blue-500 text-base p-2 text-center"
					>
						{language.module?.footer?.emailHeading}
					</PlainLink>
					<FooterHeading underlined={false}>
						{contactInfoJson["email"]}
					</FooterHeading>
				</FlexBox>

				<FlexBox
					className="w-1/2"
					direction="column"
					justify="space-evenly"
				>
					<FooterHeading>Nuestras redes sociales</FooterHeading>
					<FlexBox
						className="w-1/4"
						align="center"
						justify="space-around"
					>
						<FooterIconLink to={contactInfoJson["instagram"]}>
							<IoLogoInstagram size={ICON_SIZE} />
						</FooterIconLink>
						<FooterIconLink to={contactInfoJson["facebook"]}>
							<AiFillFacebook size={ICON_SIZE} />
						</FooterIconLink>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</footer>
	);
};

export default Footer;
