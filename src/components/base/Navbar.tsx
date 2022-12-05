import { FunctionComponent, useEffect, useMemo, useState } from "react";
import Link, { PlainLink } from "./Link";
import { VscSearch, VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

import DropdownButton from "./Buttons/DropdownButton";
import IconButton from "./Buttons/IconButton";
import ProductTag from "../../types/ProductTag";
import ProductTagService from "../../libs/services/ProductTagService";
import { RootState } from "../../stores/app.store";
import TextField from "./fields/TextField";
import { changeProductTags } from "../../slices/product-tags.slice";
import navStyles from "../../styles/components/Navbar.module.css";
import useLanguage from "../../hooks/useLanguage";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBarLinkItem = ({
	children,
	to,
	active = false,
}: {
	active?: boolean;
	children: string | JSX.Element;
	to: string;
}) => {
	return (
		<li className="w-full md:w-fit">
			<Link className="w-full" to={to} active={active}>
				{children}
			</Link>
		</li>
	);
};

const NavBar: FunctionComponent<NavBarProps> = ({}) => {
	const { language } = useLanguage("es");
	const productTagsService = useMemo(() => new ProductTagService(), []);
	const router = useRouter();

	const [navOpen, setNavOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const { productTags } = useSelector(
		(state: RootState) => state?.productTags,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!productTags || !productTags?.length) {
			productTagsService
				.find()
				.then((res) => dispatch(changeProductTags(res)))
				.catch((err) => console.error(err.toString()));
		}
	}, []);

	return (
		<nav className="bg-white  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky top-0 z-30">
			<div
				className={`container flex flex-wrap justify-evenly items-center mx-auto h-auto w-fill`}
			>
				<PlainLink to="/" className="flex items-center">
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						{language?.general?.appName}
					</span>
				</PlainLink>

				<IconButton
					size={40}
					className={`ml-auto rounded sm:flex md:hidden`}
					onClick={() => setNavOpen((prev) => !prev)}
				>
					<VscThreeBars size={20} className="text-indigo-700" />
				</IconButton>

				<div
					className={`${navStyles["nav-items-container"]} ${
						navOpen && navStyles["nav-items-container-collapsed"]
					}`}
				>
					<ul 
						className="flex flex-col md:flex-row  p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full items-center justify-center"
					>
						<div className="flex flex-row items-center justify-evenly w-full">
							<input
								className="outline-none bg-white p-2 w-full rounded-sm"
								placeholder={language?.fields["search"]}
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								onKeyDown={e => {
									if(e.key === "Enter") router.push(`/search-view?search=${search}`); 
								}}
							/>
							<PlainLink
								to={`/search-view?search=${search}`}
								className="rounded-sm p-3 bg-indigo-800"
							>
								<VscSearch size={20} color="white" />
							</PlainLink>
						</div>
						
						<DropdownButton
							dropdownItemsContainerClassNames={`whiteScrollbar dark:bg-gray-900 overflow-y-auto max-h-48 rounded ${navStyles.dropdownContainer} rounded-md shadow-lg`}
							buttonLabel="Categorías"
						>
							{productTags?.length > 0 ? (
								productTags?.map(
									(productTag: ProductTag, index: number) => (
										<PlainLink
											to={`/categories/${productTag?.name}`}
											className="text-white text-center duration-500 hover:bg-gray-100 hover:text-gray-400 p-2  rounded-sm"
											key={index}
										>
											{productTag?.name}
										</PlainLink>
									),
								)
							) : (
								<></>
							)}
						</DropdownButton>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
