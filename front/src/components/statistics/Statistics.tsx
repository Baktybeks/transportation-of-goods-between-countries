'use client'

import React from 'react'
import {data} from "@/components/statistics/data/data";

import styles from './Statistics.module.scss'


const Statistics = () => {
	return (
		<div className={styles.blockStatistic}>
			{data.map((elem: any) => (
				<div key={elem.id} className={styles.blockInfo}>
					<div className={styles.blockImage}>
						{elem.img}
					</div>
					<div className={styles.blockText}>{elem.title}</div>
				</div>
			))}
		</div>
	)
}

export default Statistics
