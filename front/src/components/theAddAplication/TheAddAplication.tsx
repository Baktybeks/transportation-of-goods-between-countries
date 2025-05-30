'use client'

import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import styles from './TheAddAplication.module.scss';
import Link from 'next/link';

interface Props {
    name: string;
    email: string;
    phone: string;
    title: string;
    image: string;
    description: string;
    toCountryId: string;
    fromCountryId: string;
    processed: boolean;
}

interface PropsActive {
    onActive: (value: boolean) => void;
    active: boolean;
}

const TheAddAplication = ({onActive, active}: PropsActive) => {
    const session = useSession();
    const [country, setCountry] = useState<any>([]);
    const [newDirection, setNewDirection] = useState<Props>({
        name: '',
        email: '',
        phone: '',
        title: '',
        image: '',
        description: '',
        toCountryId: '',
        fromCountryId: '',
        processed: false,
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
        const {name, value} = e.target;
        if (name === 'image') {
            setNewDirection(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewDirection(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleChangeActive = () => {
        onActive(!active);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newDirection.name);
            formData.append('email', newDirection.email);
            formData.append('phone', newDirection.phone);
            formData.append('title', newDirection.title);
            formData.append('image', newDirection.image);
            formData.append('description', newDirection.description);
            formData.append('processed', newDirection.processed.toString());
            formData.append('toCountryId', newDirection.toCountryId);
            formData.append('fromCountryId', newDirection.fromCountryId);

            const response = await fetch('http://localhost:5000/api/application/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={styles.componentApplication}>
                <form className={styles.headerInput} onSubmit={handleSubmit}>
                    <h2 className={styles.nameApplication}>Оформите заявку</h2>
                    <div className={styles.inputsAdds}>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Имя *</label>
                            <input type='text' name='name' value={newDirection.name} className={styles.inputs}
                                   placeholder='Полное имя * ' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Адрес электронной почты *</label>
                            <input type='email' name='email' value={newDirection.email} className={styles.inputs}
                                   placeholder='example@gmail.com  ' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Телефон *</label>
                            <input type='tel' name='phone' value={newDirection.phone} className={styles.inputs}
                                   placeholder='8(999)-000-00-00' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Компания *</label>
                            <input type='text' name='title' value={newDirection.title} className={styles.inputs}
                                   placeholder='Компания' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Картинка *</label>
                            <input className={styles.imagesInput} type="file" name="image"
                                   accept='/image/*, .png, .jpg, .web'
                                   onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Текст *</label>
                            <input type='text' name='description' value={newDirection.description} className={styles.inputs}
                                   placeholder='Текст' onChange={handleChange}/>
                        </div>
                        <select className={styles.inputForm} onChange={handleChange} name='toCountryId' value={newDirection.toCountryId}>
                            <option className={styles.textInput}>Куда *</option>
                            {country.map((elem: any) => (
                                <option value={elem.id} key={elem.id}
                                        className={styles.textGendr}>{elem.country} - {elem.id}
                                </option>
                            ))}
                        </select>
                        <select className={styles.inputForm} onChange={handleChange} name='fromCountryId' value={newDirection.fromCountryId}>
                            <option className={styles.textInput}>Откуда *</option>
                            {country.map((elem: any) => (
                                <option value={elem.id} key={elem.id}
                                        className={styles.textGendr}>{elem.country} - {elem.id}
                                </option>
                            ))}
                        </select>
                    </div>
                    {
                        session?.data ? <button onClick={handleChangeActive} className={styles.submit}>Отправить</button> :
                            <div className={styles.warning}>Для того что бы отправить заявку вы должны
                                <Link href='/signin'> авторизоваться</Link>
                            </div>
                    }
                </form>
            </div>
    )
};

export default TheAddAplication;
