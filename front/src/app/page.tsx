'use client'

import React, {useState} from 'react'
import TransformBlockOne from '@/components/transformBlockOne/TransformBlockOne'
import Product from '@/components/Product/Product'
import BlockTransport from '@/components/blockTransport/BlockTransport'
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";
import Statistics from "@/components/statistics/Statistics";


import styles from './styles/Home/Home.module.scss'
import classNames from "classnames";
import BlockFotmAplication from "@/components/blockFotmAplication/BlockFotmAplication";
import Layout from "@/components/layout/Layout";


const Home = () => {
	const [active, setActive] = useState(false);

	return (
		<Layout>
			<div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
			<div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
				<TheAddAplication onActive={setActive} active={active}/>
			</div>
			<section className={styles.ransformBlockOne}>
				<div className={styles.shodow}></div>
				<TransformBlockOne onActive={setActive} active={active}/>
			</section>
			<section className={styles.Statistics}>
				<Statistics />
			</section>
			<section className={styles.Product}>
				<Product />
			</section>
			<section className={styles.wrapperCollection}>
				<BlockTransport />
			</section>
			<section className={styles.wrapperForm}>
				<BlockFotmAplication/>
			</section>
		</Layout>
	)
}

export default Home