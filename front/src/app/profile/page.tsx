'use client';

import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from '../styles/profile/Profile.module.scss';
import { useSession } from "next-auth/react";

const Profile = () => {
    const [applications, setApplications] = useState<any>([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/application/');
                if (!res.ok) {
                    throw new Error('Unable to fetch posts!');
                }
                const applicationsData = await res.json();
                setApplications(applicationsData);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setApplications((prevApplications: any) => prevApplications.filter((app: any) => app.id !== index));
                console.log('Application deleted');
            } else {
                console.error('Error deleting application:', response.statusText);
            }
        } catch (error) {
            console.error('Error during request:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.wrapperProfile}>
                {session?.user?.image && (
                    <img className={styles.imgProfile} src={session.user.image} alt="Profile" />
                )}
                <h1 className={styles.nameProfile}>{session?.user?.name}</h1>
            </div>
            <div className={styles.wrapperAdmin}>
                <h1 className={styles.nameAdmin}>Мои заявки</h1>
                <div className={styles.blockList}>
                    {session?.user && applications.map((elem: any) => (
                        session?.user?.name === elem.name && (
                            <div key={elem.id} className={styles.infoList}>
                                <ul key={elem.id} className={styles.list}>
                                    {session?.user?.name === elem.name && (
                                        elem.processed === true && (
                                            <li className={styles.ok}>Ваша заявка принята</li>
                                        )
                                    )}
                                </ul>
                                <div className={styles.blockInfo}>
                                    <div className={styles.blockImg}>
                                        <img src={`http://localhost:5000/${elem.image}`} alt="Application" className={styles.img}/>
                                    </div>
                                    <h2 className={styles.name}>{elem.name}</h2>
                                    <p className={styles.email}>{elem.email}</p>
                                    <p className={styles.email}>{elem.phone}</p>
                                    <p className={styles.email}>{elem.title}</p>
                                    <p className={styles.email}>{elem.description}</p>
                                    <div className={styles.countresBlock}>
                                        <div>{elem.toCountry.country}</div>
                                        <div className={styles.line}></div>
                                        <div>{elem.fromCountry.country}</div>
                                    </div>
                                    <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
