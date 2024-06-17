'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/admin/Admin.module.scss";
import Layout from "@/components/layout/Layout";

const PageApplications = () => {
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:5000/api/application/');
            if (!res.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const applicationsData = await res.json();
            setApplications(applicationsData);
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setApplications((prevApplications: any) => prevApplications.filter((app: any) => app.id !== id));
                console.log('Объект удален');
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleCheckboxChange = async (id: string) => {
        try {
            const updatedApplications = applications.map((app: any) => {
                if (app.id === id) {
                    return { ...app, processed: !app.processed };
                }
                return app;
            });
            setApplications(updatedApplications);

            const updatedApp = updatedApplications.find((app: any) => app.id === id);

            const response = await fetch(`http://localhost:5000/api/application/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ processed: updatedApp.processed }),
            });

            if (!response.ok) {
                console.error('Ошибка при обновлении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    function formatDate(isoString:string) {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <Layout isFooterHidden>
            <div className={styles.wrapperAdmin}>
                <h1 className={styles.nameAdmin}>Заявки пользователей</h1>
                <ul className={styles.blockList}>
                    {applications.map((elem: any) => (
                        <li key={elem.id} className={styles.infoList}>
                            <div className={styles.blockInfo}>
                                <div className={styles.blockImg}>
                                    <img src={`http://localhost:5000/${elem.image}`} alt='img'
                                         className={styles.img}/>
                                </div>
                                <h2 className={styles.name}>{elem.name}</h2>
                                <p className={styles.email}>{elem.email}</p>
                                <p className={styles.email}>{elem.phone}</p>
                                <p className={styles.email}>{elem.title}</p>
                                <p className={styles.email}>{elem.description}</p>
                                <p className={styles.email}>{formatDate(elem.createdAt)}</p>
                                <div className={styles.countresBlock}>
                                    <div>{elem.toCountry.country}</div>
                                    <div className={styles.line}></div>
                                    <div>{elem.fromCountry.country}</div>
                                </div>
                                <div className={styles.checboxInfo}>
                                    <div className={styles.checboxBlock}>
                                        <input type='checkbox' name='processed' checked={elem.processed} id={`processed-${elem.id}`}
                                               onChange={() => handleCheckboxChange(elem.id)}
                                               className={styles.checkbox}/>
                                        <label className={styles.textInput} htmlFor={`processed-${elem.id}`}> Подтверждение заявки</label>
                                    </div>
                                </div>
                                <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default PageApplications;
