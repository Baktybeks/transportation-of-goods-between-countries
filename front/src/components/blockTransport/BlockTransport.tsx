import React from 'react'
import {data} from "@/components/blockTransport/data/data";

import styles from './BlockTransport.module.scss'
import Map from "@/components/blockTransport/icons/map";

const BlockTransport = () => {

	return (
		<>
			<div className={styles.blockContent}>
				{data.map((elem: any) => (
					<div key={elem.id} className={styles.blocks}>
						<div>
							<h2 className={styles.title}>{elem.title}</h2>
							<p className={styles.desc}>{elem.desc}</p>
						</div>
						<div className={styles.imgs}>{elem.img}</div>
					</div>
				))}
				<div className={styles.mapImag}><Map/></div>
			</div>
		</>
	)
}

export default BlockTransport
