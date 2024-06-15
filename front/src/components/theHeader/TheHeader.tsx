'use client'

import React from 'react'
import Link from 'next/link'
import Logo from '../icons/Logo'
import {signOut, useSession} from 'next-auth/react'

import styles from './TheHeader.module.scss'

const TheHeader = () => {
	const session = useSession()
	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<Link href={'/'} className={styles.logo}><Logo /></Link>
			</div>
			<div className={styles.linck}>
				{session?.data && (
					session.data?.user?.email === 'admin@mail.ru' ? (
						<>
							<Link className={styles.textLink} href='/admin'>Профиль</Link>
							<Link className={styles.textLink} href='/applications'>Заявки</Link>
						</>
					) : <Link className={styles.textLink} href='/profile'>Профиль</Link>
				)
				}
				{
					session?.data ?
						<Link className={styles.textLink} href='#'
									onClick={() => signOut({ callbackUrl: '/' })}>Выход</Link>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Вход</Link>
						</>
				}
			</div>
		</header>
	)
}

export { TheHeader }
