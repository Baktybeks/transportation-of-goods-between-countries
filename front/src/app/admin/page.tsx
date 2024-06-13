'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'
import Layout from "@/components/layout/Layout";

interface Direction {
    country: string;
}


const PageAdmin = () => {
    const [country, setCountry] = useState<any>([]);
    const [newСountry, setNewСountry] = useState<Direction>({
        country: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/country/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setCountry(jsonData.rows);
        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewСountry(prevState => ({
                ...prevState,
                [name]: value
            }));
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/country/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCountry((country: any) => country.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', country.country);

            const response = await fetch('http://localhost:5000/api/country/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/country/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setCountry(jsonData.rows);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <Layout isFooterHidden>
            <div className={styles.wrapperAdmin}>
                <div className={styles.addBooks}>
                    <div>
                        <h2 className={styles.nameAdmin}>Добавить новую страну</h2>
                        <form className={styles.formAdmin} onSubmit={handleSubmit}>
                            <div className={styles.inputForm}>
                                <label>Страна:</label>
                                <input className={styles.input} placeholder='Название' type="text" name="country"
                                       value={country.country} onChange={handleChange}/>
                            </div>
                            <button className={styles.summit} type="submit">Отправить</button>
                        </form>
                    </div>
                </div>

                <h2 className={styles.nameBooksList}>Добавленные Страны</h2>
                <ul className={styles.blockList}>
                    {country.map((elem: any) => (
                        <li key={elem.id} className={styles.infoList}>

                        <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default PageAdmin;
