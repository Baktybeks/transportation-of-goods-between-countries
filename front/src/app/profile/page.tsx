import {authConfig} from '@/configs/auth';
import {getServerSession} from 'next-auth';
import styles from '../styles/profile/Profile.module.scss'
import Layout from "@/components/layout/Layout";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
      <Layout>
      <div className={styles.wrapperProfile}>
          {session?.user?.image &&
              <img className={styles.imgProfile} src={session.user.image} alt="image"/>
          }
          <h1 className={styles.nameProfile}>{session?.user?.name}</h1>
      </div>
      </Layout>
  )
}
