import styles from './TheFooter.module.scss'
import Phone from "@/components/theFooter/icons/phone";
import Location from "@/components/theFooter/icons/location";
import Message from "@/components/theFooter/icons/message";
import Facebook from "@/components/theFooter/icons/facebook";
import Instagram from "@/components/theFooter/icons/instagram";
import Twiter from "@/components/theFooter/icons/twiter";



const TheFooter = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.blockInfo}>
				<ul className={styles.blockText}>
					<li className={styles.nameHead}>Документы</li>
					<li className={styles.text}>Политика конфиденциальности</li>
					<li className={styles.text}>Пользовательское соглашение</li>
					<li className={styles.text}>Лицензионное соглашение</li>
					<li className={styles.text}>Оферта</li>
				</ul>
				<ul className={styles.blockText}>
					<li className={styles.nameHead}>Контакты</li>
					<li className={styles.text}><Phone/>  +7 (495) 260-17-78</li>
					<li className={styles.text}><Location/> Москва, Ленинградский проспект, д. 37, корп. 3</li>
					<li className={styles.text}><Message/> info@gruzi.ru</li>
				</ul>
			</div>
			<div className={styles.infoEnd}>
				<div className={styles.blockEnd}>
					<p className={styles.textEnd}>Все права защищены и принадлежат торговой марке Грузи.ру </p>
					<ul className={styles.icons}>
						<li><Facebook/></li>
						<li><Instagram/></li>
						<li><Twiter/></li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export { TheFooter }
