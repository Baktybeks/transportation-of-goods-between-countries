import React from "react";
import GoogleButton from '@/components/googleButton/GoogleButton'
import SighInForm from '@/components/sighInForm/SighInForm'
import Layout from "@/components/layout/Layout";
import Box from '../../common/icons/bocks.png'

import styles from '../styles/sighnIn/SighIn.module.scss'
import Image from "next/image";

export default function SighIn() {
	return (
		<Layout isHeaderHidden isFooterHidden>
		<div className={styles.wrapperSignIn}>
			<div className={styles.imges}>
				<div className={styles.imge}>
					<Image src={Box} alt='box'/>
				</div>
			</div>
			<div>
				<div className={styles.infoSignIn}>
					<h1 className={styles.textHeader}>Войти</h1>
					<p className={styles.text}>Введите свои учетные данные чтобы войти в систему</p>
				</div>
				<SighInForm/>
				<GoogleButton/>
			</div>
		</div>
		</Layout>
	)
}
