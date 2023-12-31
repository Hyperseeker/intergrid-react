"use client";
import View from "@/app/components/View";
import { FooterComponent as Footer } from "@/app/components/Footer";
import { useContext } from "react";
import { BackdropComponent as Backdrop } from "./components/Backdrop";
import { ViewContext } from "./contexts/ViewContext";
import styled from "styled-components";

const Controller = styled.main`
	width: 100%;
	min-height: 100vh;

	display: flex;
	flex-direction: column;

	overflow-x: hidden;
`;

export function ControllerComponent() {
	const {
		state: { columns },
	} = useContext(ViewContext);

	return (
		<Controller>
			<Backdrop />
			<View columns={columns} />
			<Footer />
		</Controller>
	);
}
