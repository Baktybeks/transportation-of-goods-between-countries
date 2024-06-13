import React from 'react'
import { Metadata } from 'next'
import { TheHeader } from '@/components/theHeader/TheHeader'
import { TheFooter } from '@/components/theFooter/TheFooter'
import { Providers } from '@/components/providers/Providers'

import styles from './styles/Layout.module.scss'
import './globals.css'
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
	title: 'Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({
																		 children
																	 }: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
		<body>
		<Providers>
			{children}
		</Providers>
		</body>
		</html>
	)
}
