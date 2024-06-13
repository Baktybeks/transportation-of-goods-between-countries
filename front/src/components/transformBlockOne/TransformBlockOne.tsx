import React from 'react'
import styles from './TransformBlockOne.module.scss'

interface Props {
	onActive: (value: boolean) => void;
	active: boolean;
}

const TransformBlockOne = ({onActive, active}: Props) => {

	const handleChange = () => {
		onActive(!active);
	}

	return (
		<>
			<div className={styles.openWorld}>
				<div className={styles.info}>
					<h1 className={styles.nameHeader}>Цифровая <br/> платформа <br/> для грузоперевозок</h1>
					<p className={styles.text}>
						Экосистема сервисов для транспортной логистики
						Транспортные тендеры | Спот-аукционы | TMS | Трекинг грузов
					</p>
					<button onClick={handleChange} className={styles.btnServices}>Попробовать</button>
				</div>
			</div>
		</>
	)
}

export default TransformBlockOne