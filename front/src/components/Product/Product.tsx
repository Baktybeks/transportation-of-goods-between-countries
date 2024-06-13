'use client'

import React from 'react'

import styles from './Product.module.scss'
import {data} from "@/components/Product/data/data";
import ImgFon from "@/components/Product/icons/imgFon";
import Image from "next/image";
import Fura from './icons/fura.png';

const Product = () => {
	return (
		<>
			<div className={styles.blockSlider}>
				<div className={styles.blockHeader}>
					<h2 className={styles.nameSliders}>Продукты платформы</h2>
				</div>
				<div className={styles.contentProduct}>
					{
						data.map((elem: any) => (
							<div className={styles.blockProduct} key={elem.id}>
								<div>{elem.img}</div>
								<h3 className={styles.title}>{elem.title}</h3>
								<p className={styles.desc}>{elem.desc}</p>
							</div>
						))
					}
				</div>
				<div className={styles.Map}>
					<ImgFon/>
				</div>
				<div className={styles.Fura}>
					<Image src={Fura} alt='fura' width={908} height={496}/>
				</div>
			</div>
		</>
	)
}

export default Product
