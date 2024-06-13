'use client'

import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import styles from './TheAddAplication.module.scss';


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

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewDirection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeActive = () => {
        onActive(!active);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newDirection.name);
            formData.append('name', newDirection.email);
            formData.append('phone', newDirection.phone);
            formData.append('phone', newDirection.title);
            formData.append('phone', newDirection.image);
            formData.append('phone', newDirection.description);
            formData.append('processed', newDirection.processed.toString());
            formData.append('processed', newDirection.toCountryId);
            formData.append('processed', newDirection.fromCountryId);

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
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Куда *</label>
                            <input type='number' name='toCountryId' value={newDirection.toCountryId} className={styles.inputs}
                                   placeholder='Страна' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Откуда *</label>
                            <input type='number' name='fromCountryId' value={newDirection.fromCountryId} className={styles.inputs}
                                   placeholder='Страна' onChange={handleChange}/>
                        </div>
                    </div>
                    {
                        session?.data ? <button onClick={handleChangeActive} className={styles.submit}>Отправить</button> :
                            <div className={styles.warning}>Для того что бы купить книгу вы должны
                                авторизоваться</div>
                    }
                </form>
            </div>
    )
};

export default TheAddAplication;